# project/server/config.py

import os
basedir = os.path.abspath(os.path.dirname(__file__))


class BaseConfig(object):
    """Base configuration."""
    SECRET_KEY = ''
    DEBUG = False
    BCRYPT_LOG_ROUNDS = 13
    WTF_CSRF_ENABLED = True
    DEBUG_TB_ENABLED = False
    DEBUG_TB_INTERCEPT_REDIRECTS = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevelopmentConfig(BaseConfig):

    """Development configuration."""
    SECRET_KEY = '14qn8s0plxg)k!!f!b=p%rc9t2xca^(5mu+aaly86blqa2rfkr'
    DEBUG = True
    BCRYPT_LOG_ROUNDS = 4
    WTF_CSRF_ENABLED = False
    SQLALCHEMY_DATABASE_URI = 'mysql://root:rabindra_bls@localhost/Orion'
    DEBUG_TB_ENABLED = True
    UPLOAD_DIR = "/Users/diamondmohanty/Desktop/uploads"


class TestingConfig(BaseConfig):
    """Testing configuration."""
    DEBUG = True
    TESTING = True
    BCRYPT_LOG_ROUNDS = 4
    WTF_CSRF_ENABLED = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///'
    DEBUG_TB_ENABLED = False
    PRESERVE_CONTEXT_ON_EXCEPTION = False


class ProductionConfig(BaseConfig):
    """Production configuration."""
    SECRET_KEY = '14qn8s0plxg)k!!f!b=p%rc9t2xca^(5mu+aaly86blqa2rfkr'
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://{username}:{password}@{hostname}/{databasename}'.format(
        username="ELEMONEATERS",
        password="Lotus@2019",
        hostname="ELEMONEATERS.mysql.pythonanywhere-services.com",
        databasename="ELEMONEATERS$Orion",
    )
    DEBUG_TB_ENABLED = False
