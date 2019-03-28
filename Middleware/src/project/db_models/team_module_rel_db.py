from project.server import db
from flask import Blueprint, jsonify, request
from project.common.response import Response
from project.common.request_validator import RequestValidator

team_module_rel_blueprint = Blueprint('__team_module_rel__', __name__)

class TeamModuleRel(db.Model):

    __tablename__ = 'team_module_rel'
    team_uniqe_iden = db.Column(db.Integer, primary_key=True, autoincrement=True)
    team_id = db.Column(db.Integer, autoincrement=True)
    module_id = db.Column(db.Integer, nullable=False)


@team_module_rel_blueprint.route('/api/1.0/team_module/modify', methods=['POST'])
def add_module_to_team():
    from project.db_models.team_module_rel_db import TeamModuleRel

    a_response = Response()
    in_data = request.get_json()
    a_validator = RequestValidator(in_data, ['module_id', 'team_id', 'add_remove'])
    if a_validator.has_valid_keys():
        new_rel = TeamModuleRel()
        new_rel.team_id = in_data['team_id']
        new_rel.module_id = in_data['module_id']

        if in_data['add_remove'] == 'A':
            db.session.add(new_rel)
            db.session.commit()
        elif in_data['add_remove'] == 'D':
            fetched_rels = TeamModuleRel.query.filter(TeamModuleRel.module_id==in_data['module_id']).filter(TeamModuleRel.team_id==in_data['team_id']).all()
            for rel in fetched_rels:
                db.session.delete(rel)
            db.session.commit()
    else:
        a_response.error = 'API KEYS MISSING'

    return jsonify(a_response.__repr__())
