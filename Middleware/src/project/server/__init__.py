# project/server/__init__.py


import os

from flask import Flask
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from flask_debugtoolbar import DebugToolbarExtension
from flask_bootstrap import Bootstrap
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import datetime

# instantiate the extensions
login_manager = LoginManager()
bcrypt = Bcrypt()
toolbar = DebugToolbarExtension()
bootstrap = Bootstrap()
db = SQLAlchemy()
migrate = Migrate()


# Importing the models
from project.db_models.userdb import user_blueprint
from project.db_models.moduledb import module_blueprint
from project.db_models.team_module_rel_db import team_module_rel_blueprint
from project.db_models.teamdb import team_blueprint


def create_app():

    # instantiate the app
    app = Flask(__name__)
    # set config
    app_settings = os.getenv(
        'APP_SETTINGS', 'project.server.config.ProductionConfig')
    app.config.from_object(app_settings)


    # Register the blueprint
    app.register_blueprint(user_blueprint)
    app.register_blueprint(module_blueprint)
    app.register_blueprint(team_module_rel_blueprint)
    app.register_blueprint(team_blueprint)


    # set up extensions

    login_manager.init_app(app)
    bcrypt.init_app(app)
    toolbar.init_app(app)
    bootstrap.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)



    return app
