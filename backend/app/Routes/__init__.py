from app.Routes.Authroutes import auth

def register_bluepints(app):
    app.register_blueprint(auth)