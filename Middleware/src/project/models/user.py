from project.db_models.userdb import UserDBModel
class User:


    def __init__(self, user_id, user_password=None, user_name=None, user_team_id=None, user_role=None):
        self.user_id = user_id
        self.user_name = user_name
        self.user_team_id = user_team_id
        self.user_role = user_role
        self.user_password = user_password

    def get_details(self):
        matching_user = UserDBModel.query.filter(UserDBModel.user_id == self.user_id).first()
        return User(user_id=self.user_id,
                    user_name=matching_user.user_fname + matching_user.user_lname,
                    user_team_id=matching_user.user_team_id,
                    user_role=matching_user.user_role
                    )

    def is_valid_using_cred(self):
        matching_users = UserDBModel.query.\
            filter(UserDBModel.user_id == self.user_id).\
            filter(UserDBModel.user_password == self.user_password).\
            first()
        if matching_users:
            return matching_users.user_id
        else:
            return None




