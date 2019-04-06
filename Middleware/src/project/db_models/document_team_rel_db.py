from project.server import db
from flask import Blueprint, jsonify, request, current_app
from project.common.response import Response
from project.common.request_validator import RequestValidator
from werkzeug.utils import secure_filename
import os

document_team_rel_db_blueprint = Blueprint('__document_team_rel__', __name__)

class DocumentDBModule(db.Model):

    __tablename__ = 'document_team_rel'
    rel_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    document_id = db.Column(db.Integer, nullable=False)
    team_id = db.Column(db.Integer, nullable=False)


@document_team_rel_db_blueprint.route('/api/mapfile', methods=['POST'])
def upload_file():

    aResponse = Response()
    try:
        file = request.files['file']
        filename = secure_filename(file.filename)
        file.save(os.path.join(current_app.config['UPLOAD_DIR'], filename))
    except Exception as e:
        aResponse.error = 'FILE UPLOAD FAIL'
        print(e)

    return jsonify(aResponse.__repr__())

