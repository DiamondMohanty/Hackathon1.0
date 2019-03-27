from project.server import db
from flask import Blueprint, jsonify, request
from project.common.response import Response
from project.common.request_validator import RequestValidator

team_blueprint = Blueprint('__team__', __name__)

class ModuleDBModel(db.Model):

    __tablename__ = 'team_master'
    team_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    team_name = db.Column(db.String(255), nullable=False)
    team_description = db.Column(db.String(255), nullable=False)

