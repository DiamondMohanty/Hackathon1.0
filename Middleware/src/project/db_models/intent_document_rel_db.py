from project.server import db
from flask import Blueprint, jsonify, request, current_app
from project.common.response import Response
from project.common.request_validator import RequestValidator


intents_blueprint = Blueprint('__intents__', __name__)

class IntentDB(db.Model):

    __tablename__ = 'intent_master'
    intent_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    intent_title = db.Column(db.TEXT, nullable=False)

    def __repr__(self):
        return {
            'intent_id': self.intent_id,
            'intent_title': self.intent_title,
        }


class IntentDocumentRelDB(db.Model):
    __tablename__ = 'intent_document_rel'
    map_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    intent_id = db.Column(db.Integer, nullable=False)
    document_id = db.Column(db.Integer, nullable=False)
    def __repr__(self):
        return {
            'map_id': self.map_id,
            'intent_id': self.intent_id,
            'intent_title': self.document_id,
        }

@intents_blueprint.route('/api/1.0/search', methods=['POST'])
def search_documents():
    from .document_sections_db import DocumentSectionsDB

    a_response = Response()
    in_data = request.get_json()
    a_validator = RequestValidator(in_data, ['intent'])

    if a_validator.has_valid_keys():
        intent = in_data['intent']
        fetched_intent = IntentDB.query.filter(IntentDB.intent_title == intent).first()
        fetched_documents_rel = IntentDocumentRelDB.query.filter(IntentDocumentRelDB.intent_id == fetched_intent.intent_id)
        documents = []
        if fetched_documents_rel is not None:
            for d in fetched_documents_rel:
                fetched_document = DocumentSectionsDB.query.filter(DocumentSectionsDB.document_id == d.document_id).first()
                documents.append(fetched_document.__repr__())

        a_response.data = documents

    else:
        a_response.error = 'API KEYS MISSING'

    return jsonify(a_response.__repr__()), 200