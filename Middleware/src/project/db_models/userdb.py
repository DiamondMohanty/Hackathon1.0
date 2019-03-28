from project.server import db
from flask import Blueprint, jsonify, request
from project.common.response import Response
from project.common.request_validator import RequestValidator

user_blueprint = Blueprint('__user__', __name__)

class UserDBModel(db.Model):

    __tablename__ = 'user_master'
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_fname = db.Column(db.String(255), nullable=False)
    user_lname = db.Column(db.String(255), nullable=False)
    user_password = db.Column(db.String(255), nullable=False)
    user_team_id = db.Column(db.Integer, nullable=False)
    user_role = db.Column(db.String(255), nullable=False, default="MEMBER")


@user_blueprint.route('/api/1.0/login', methods=['POST'])
def perform_login():
    from project.models.user import User
    a_response = Response()
    in_data = request.get_json()
    a_validator = RequestValidator(in_data, ['user_id', 'user_password'])
    if a_validator.has_valid_keys():
        a_user = User(in_data['user_id'], in_data['user_password'])
        valid_user = a_user.is_valid_using_cred()
        if valid_user is not None:
            a_response.data = valid_user.__repr__()
        else:
            a_response.error = 'Invalid Login'
    else:
        a_response.error = 'API KEYS MISSING'

    return jsonify(a_response.__repr__()), 200