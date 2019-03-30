from project.server import db
from flask import Blueprint, jsonify, request
from project.common.response import Response
from project.common.request_validator import RequestValidator

module_blueprint = Blueprint('__module__', __name__)

class ModuleDBModel(db.Model):

    __tablename__ = 'module_master'
    module_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    path = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    moduleName = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    modulePrettyName = db.Column(db.String(255), nullable=False)

    @staticmethod
    def get_module_by_id(id):
        from project.models.module import Module
        fetched_module = ModuleDBModel.query.filter(ModuleDBModel.module_id==id).first()
        return Module(id=fetched_module.module_id, path=fetched_module.path, location=fetched_module.location, moduleName=fetched_module.moduleName,
                          description=fetched_module.description, modulePrettyName=fetched_module.modulePrettyName)

@module_blueprint.route('/api/1.0/modules/registered', methods=['POST'])
def fetch_all_modules():
    from project.db_models.team_module_rel_db import TeamModuleRel
    from project.models.user import User

    a_response = Response()
    in_data = request.get_json()
    a_validator = RequestValidator(in_data, ['user_id'])
    if a_validator.has_valid_keys():
        a_user = User(user_id=in_data['user_id']).get_details()
        team_id = a_user.user_team_id
        modules_for_team = TeamModuleRel.query.filter(TeamModuleRel.team_id == team_id).all()
        all_modules = []

        for module in modules_for_team:

            module_obj = ModuleDBModel.get_module_by_id(module.module_id)
            module_obj.registered = True
            all_modules.append(module_obj.__repr__())

        a_response.data = all_modules


    else:
        a_response.error = 'API KEYS MISSING'

    return jsonify(a_response.__repr__()), 200

@module_blueprint.route('/api/1.0/modules/all', methods=['GET'])
def get_all_modules():
    from project.models.module import Module
    a_response = Response()
    fetched_modules = ModuleDBModel.query.all()
    all_modules = []
    for module in fetched_modules:
        a_module = Module(id=module.module_id,path=module.path, location= module.location, moduleName = module.moduleName, description = module.description, modulePrettyName=module.modulePrettyName)
        all_modules.append(a_module.__repr__())

    a_response.data = all_modules
    return jsonify(a_response.__repr__()), 200


@module_blueprint.route('/api/1.0/modules/manage', methods=['POST'])
def get_modules_for_manage():

    from project.models.module import Module
    from project.models.user import User
    from project.db_models.team_module_rel_db import TeamModuleRel

    a_response = Response()
    in_data = request.get_json()
    a_validator = RequestValidator(in_data, ['user_id'])

    fetched_modules = ModuleDBModel.query.all()

    all_modules = []
    team_modules = []

    for module in fetched_modules:
        a_module = Module(id=module.module_id,path=module.path, location=module.location, moduleName=module.moduleName,
                          description=module.description, modulePrettyName=module.modulePrettyName)
        all_modules.append(a_module)

    if a_validator.has_valid_keys():
        a_user = User(user_id=in_data['user_id']).get_details()
        team_id = a_user.user_team_id
        modules_for_team = TeamModuleRel.query.filter(TeamModuleRel.team_id == team_id).all()

        for module in modules_for_team:
            module_obj = ModuleDBModel.get_module_by_id(module.module_id)
            module_obj.registered = True
            team_modules.append(module_obj)

    # Sending merged modules
        out_modules = []
    for t_module in team_modules:
        out_modules.append(t_module)

    for f_module in all_modules:
        local_filtered_list = list(filter(lambda ele: ele.moduleName == f_module.moduleName, out_modules))
        if len(local_filtered_list) == 0:
            out_modules.append(f_module)


    out_modules = list(map(lambda ele: ele.__repr__(), out_modules))

    a_response.data = out_modules
    return jsonify(a_response.__repr__()), 200