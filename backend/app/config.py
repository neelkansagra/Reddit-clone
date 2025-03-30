import os
basedir = os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir))

class Config(object):
    # ...
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        os.getenv('SQLALCHEMY_DATABASE_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = os.getenv('SQLALCHEMY_TRACK_MODIFICATIONS', False)
    SECRET_KEY = os.getenv('SECRET_KEY')

    # JWT Configuration
    JWT_HEADER_TYPE = os.getenv('JWT_HEADER_TYPE', 'Bearer')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    JWT_ACCESS_TOKEN_EXPIRES = os.getenv('JWT_ACCESS_TOKEN_EXPIRES', 3600)

    #ForgotPassword token
    FORGOTPASSWORD_TOKEN_EXPIRES = os.getenv('FORGOTPASSWORD_TOKEN_EXPIRES',600)
    TOKEN_LENGTH = os.getenv("TOKEN_LENGTH",25)

    #email
    MAIL_SERVER = os.getenv('MAIL_SERVER')
    MAIL_PORT = os.getenv('MAIL_PORT')
    MAIL_USE_SSL = os.getenv('MAIL_USE_SSL')
    MAIL_USE_TLS = os.getenv('MAIL_USE_TLS')
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')

    #Google
    GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')