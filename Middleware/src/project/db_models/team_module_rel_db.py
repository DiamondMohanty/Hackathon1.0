from project.server import db
from flask import Blueprint, jsonify, request
from project.common.response import Response
from project.common.request_validator import RequestValidator

team_module_rel_blueprint = Blueprint('__team_module_rel__', __name__)

class TeamModuleRel(db.Model):

    __tablename__ = 'team_module_rel'
    team_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    module_id = db.Column(db.Integer, nullable=False)


