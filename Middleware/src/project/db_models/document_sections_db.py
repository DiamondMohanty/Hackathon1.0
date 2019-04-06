from project.server import db
from flask import Blueprint, jsonify, request, current_app
from project.common.response import Response
from project.common.request_validator import RequestValidator


documentsectiondb_blueprint = Blueprint('__documentsection__', __name__)

class DocumentSectionsDB(db.Model):

    __tablename__ = 'document_sections'
    map_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    document_id = db.Column(db.Integer, nullable=False)
    section_title = db.Column(db.String(255), nullable=False)
    section_contents = db.Column(db.TEXT, nullable=False)


    def __repr__(self):
        return {
            'map_id': self.map_id,
            'document_id': self.document_id,
            'section_title': self.section_title,
            'section_contents': self.section_contents
        }