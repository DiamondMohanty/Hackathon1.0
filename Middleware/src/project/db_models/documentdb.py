from project.server import db
from flask import Blueprint, jsonify, request, current_app
from project.common.response import Response
from project.common.request_validator import RequestValidator
from werkzeug.utils import secure_filename
import os

from docx import Document

documentdb_blueprint = Blueprint('__document__', __name__)

class DocumentDBModule(db.Model):

    __tablename__ = 'document_master'
    document_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    document_title = db.Column(db.String(255), nullable=False)
    document_description = db.Column(db.String(255), nullable=False)
    document_author = db.Column(db.Integer, nullable=False)


    def __repr__(self):
        return {
            'id': self.document_id,
            'title': self.document_title,
            'description': self.document_description,
            'author': self.document_author
        }

@documentdb_blueprint.route('/api/1.0/get/docx-contents', methods=['POST'])
def upload_file():

    aResponse = Response()

    try:
        file = request.files['file']
        filename = secure_filename(file.filename)
        file.save(os.path.join(current_app.config['UPLOAD_DIR'], filename))

        file = open(os.path.join(current_app.config['UPLOAD_DIR'] + '/' + filename), 'rb')
        document = Document(file)
        sections = []
        new_section = {}
        new_section['content'] = []
        for para in document.paragraphs:
            if para.style.name.startswith('Heading'):
                if 'title' in new_section and len(new_section['content']) > 0:
                    sections.append(new_section)
                    new_section = {}
                    new_section['content'] = []
                new_section['title'] = para.text
            else:
                new_section['content'].append(para.text)

        sections.append(new_section)

        aResponse.data = sections


    except Exception as e:
        aResponse.error = 'FILE UPLOAD FAIL'
        print(e.__cause__)

    return jsonify(aResponse.__repr__())

@documentdb_blueprint.route('/api/1.0/save/document', methods=['POST'])
def save_document_details():


    from .document_sections_db import DocumentSectionsDB
    from .questions_db import QuestionsDB

    aResponse = Response()
    in_data = request.get_json()
    valid_keys = ['documentTitle', 'documentDescription', 'userId', 'sectionData']
    a_validator = RequestValidator(in_data, valid_keys)
    if a_validator.has_valid_keys():
        aDocument = DocumentDBModule()
        aDocument.document_author = in_data['userId']
        aDocument.document_title = in_data['documentTitle']
        aDocument.document_description = in_data['documentDescription']
        db.session.add(aDocument)
        db.session.commit()

        for section in in_data['sectionData']:
            aSection = DocumentSectionsDB()
            aSection.section_title = section['sectionTitle']
            aSection.section_contents = section['sectionContents']
            aSection.document_id = aDocument.document_id
            db.session.add(aSection)
            db.session.commit()

            for question in section['questions']:
                aQuestion = QuestionsDB()
                aQuestion.question_text = question['text']
                aQuestion.questions_opt1 = question['opt1']
                aQuestion.questions_opt2 = question['opt2']
                aQuestion.questions_opt3 = question['opt3']
                aQuestion.questions_opt4 = question['opt4']
                aQuestion.questions_ans = question['ans']
                aQuestion.section_id = aSection.map_id

                db.session.add(aQuestion)
                db.session.commit()
    else:
        aResponse.error = 'API KEYS NOT FOUND'

    return jsonify(aResponse.__repr__())


@documentdb_blueprint.route('/api/1.0/view/document', methods=['POST'])
def get_document():
    from .document_sections_db import DocumentSectionsDB
    from .questions_db import QuestionsDB

    aResponse = Response()
    in_data = request.get_json()
    valid_keys = ['documentId']
    a_validator = RequestValidator(in_data, valid_keys)

    response_data = {'document': None}
    if a_validator.has_valid_keys():
        fetched_document = DocumentDBModule.query.filter(DocumentDBModule.document_id == int(in_data['documentId'])).first()
        if fetched_document is not None:
            response_data['document'] = fetched_document.__repr__()
            fetched_sections = DocumentSectionsDB.query.filter(DocumentSectionsDB.document_id == fetched_document.document_id).all()

            sections = []

            for section in fetched_sections:
                fetched_questions = QuestionsDB.query.filter(QuestionsDB.section_id == section.map_id).all()
                questions = []
                for q in fetched_questions:
                    questions.append(q.__repr__())
                section_repr = section.__repr__()
                section_repr['questions'] = questions
                sections.append(section_repr)


            response_data['document']['sections'] = sections

            aResponse.data = response_data


        else:
            aResponse.data = []

    else:
        aResponse.error = 'API KEYS NOT FOUND'

    return jsonify(aResponse.__repr__())


@documentdb_blueprint.route('/api/1.0/get/all-documents', methods=['POST'])
def get_all_documents():

    from .userdb import UserDBModel

    in_data = request.get_json()
    valid_keys = ['teamId']
    a_validator = RequestValidator(in_data, valid_keys)

    a_response = Response()
    if a_validator.has_valid_keys():
        team_id = int(in_data['teamId'])
        author_users = UserDBModel.query.filter(UserDBModel.user_team_id == team_id).all()
        all_documents = []
        if author_users is not None:
            for user in author_users:
                fetched_documents = DocumentDBModule.query.filter(DocumentDBModule.document_author == user.user_id).all()
                for document in fetched_documents:
                    all_documents.append(document.__repr__())

            a_response.data = all_documents

        else:
            a_response.data = []
    else:
        a_response.error = 'API KEYS MISSING'

    return jsonify(a_response.__repr__())