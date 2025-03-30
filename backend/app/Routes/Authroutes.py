from flask import Blueprint, request, jsonify, make_response
from app.Models import User, ResetPasswordSession
from app import app, db
from sqlalchemy import or_
from google.oauth2 import id_token
from google.auth.transport import requests
from google.auth import exceptions
from app.utils.decorators import validate_json, ensure_fields
from app.utils.create_jwt import create_jwt, is_valid_email, create_random_token, send_email, forgot_password_email, password_changed
import datetime

auth = Blueprint('auth', __name__)

@auth.route('/google', methods=['POST'])
@validate_json
@ensure_fields(required_fields=['token'])
def google_auth(data):
    try:
        print(data)
        token = data.get("token")
        print(token)
        user_info = verify_google_token(token)
        print(user_info)
        user_id = user_info["sub"]  # Unique Google ID
        email = user_info["email"]
        name = user_info.get("name")

        print(user_id)
        print(email)
        print(name)
        # Check if user exists in your DB, otherwise create one
        p = User.query.filter(User.email == email).first()
        resp = dict()
        if(p):
            jwt_resp = dict()
            jwt_resp["access_token"] = create_jwt(p.id)
            jwt_resp["token_type"] = app.config["JWT_HEADER_TYPE"]
            jwt_resp["expires_in"] = app.config["JWT_ACCESS_TOKEN_EXPIRES"]
            resp["Status code"] = 200
            resp["Response"] = "Login Success"
            resp["token"] = jwt_resp
            return jsonify(resp), 200
        else:
            new_user = User(user_name = name, email = email)
            status = new_user.insert()
            if(status == -1):
                resp["Status code"] = 500
                resp["Response"] = "Internal Server error"
                return jsonify(resp), 500
            jwt_resp = dict()
            jwt_resp["access_token"] = create_jwt(new_user.id)
            jwt_resp["token_type"] = app.config["JWT_HEADER_TYPE"]
            jwt_resp["expires_in"] = app.config["JWT_ACCESS_TOKEN_EXPIRES"]
            resp["User ID"] = status
            resp['token'] = jwt_resp
            resp["Status code"] = 200
            resp["Response"] = "Success"
            return jsonify(resp), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "Failed to verify Google token"}), 400
 
@auth.route('/login', methods=['POST'])
@validate_json
@ensure_fields(required_fields=['email', 'password'])
def login_user(data):
    email = data["email"].strip()
    password = data["password"].strip()
    print(email)
    print(password)
    
    p = User.query.filter(or_(User.email == email, User.user_name==email)).first()
    print(p)
    # print(p.check_password(password))
    resp = dict()
    if(p):
        if(p.password_hash is None):
            resp["Status code"] = 400
            resp["Response"] = "No password was registered"
            return jsonify(resp), 400
        elif(p.check_password(password)):
            jwt_resp = dict()
            jwt_resp["access_token"] = create_jwt(p.id)
            jwt_resp["token_type"] = app.config["JWT_HEADER_TYPE"]
            jwt_resp["expires_in"] = app.config["JWT_ACCESS_TOKEN_EXPIRES"]
            resp["status code"] = 200
            resp["response"] = "Login Success"
            resp["token"] = jwt_resp
            return jsonify(resp), 200
        else:
            resp["Status code"] = 400
            resp["Response"] = "Wrong email or password"
            return jsonify(resp), 400
    else:
        resp["Status code"] = 401
        resp["Response"] = "No such email or username"
        return jsonify(resp), 401

@auth.route('/signup', methods=['POST'])
@validate_json
@ensure_fields(required_fields=['email', 'password', 'username'])
def signup_user(data):
    email = data["email"].strip()
    password = data["password"].strip()
    username = data["username"].strip()
    print(email)
    print(password)
    print(username)
    ###TODO: check if email,password and username is valid

    resp = dict()
    p = User.query.filter(or_(User.email == email, User.user_name==username)).first()
    if(p is None):
        new_user = User(user_name = username, email = email)
        new_user.set_password(password)
        status = new_user.insert()
        if(status == -1):
            resp["Status code"] = 500
            resp["Response"] = "Internal Server error"
            return jsonify(resp), 500
        resp["User ID"] = status
        resp["Status code"] = 200
        resp["Response"] = "Success"
        
        ###TODO: include JWT token
        jwt_resp = dict()
        jwt_resp["access_token"] = create_jwt(status)
        jwt_resp["token_type"] = app.config["JWT_HEADER_TYPE"]
        jwt_resp["expires_in"] = app.config["JWT_ACCESS_TOKEN_EXPIRES"]
        resp["token"] = jwt_resp

        return jsonify(resp), 200
    else:
        resp["Status code"] = 401
        resp["Response"] = "User already exists"
        return jsonify(resp), 401

@auth.route('/forgot-password', methods=['POST'])
@validate_json
@ensure_fields(required_fields=['email'])
def forgot_password(data):
    email = data["email"].strip()
    
    ## validate email ##
    if (not is_valid_email(email)):
        return jsonify({"error": "Invalid email format"}), 400

    ## search for the user ##
    user = User.query.filter(User.email == email).first()
    if(user is None):
        return jsonify({"error": "No such email exists!"}), 400

    ## search for an active session if found then edit ##
    active_session = ResetPasswordSession.query.filter(ResetPasswordSession.user_id == user.id).first()
    random_token = create_random_token(int(app.config["TOKEN_LENGTH"]))
    print(random_token)
    if active_session:
        body = forgot_password_email(active_session.id,random_token)
        send_email("Password Reset Link",app.config['MAIL_SERVER'],email,body)
        db.session.add(active_session)
        db.session.flush()
        status = active_session.update_token(token = random_token,time_limit=int(app.config["FORGOTPASSWORD_TOKEN_EXPIRES"]))
        print(status)
    ## if not then create a new session user_id, email, expire_time, expired, reset_token ##
    else:
        expire_time = datetime.datetime.now() + datetime.timedelta(seconds = int(app.config["FORGOTPASSWORD_TOKEN_EXPIRES"]))
        new_session = ResetPasswordSession(token=random_token, expiry_time = int(expire_time.timestamp()), user_id = int(user.id))

        db.session.add(new_session)
        db.session.flush()
    ## mail link to given email include reset_token, session_id##
        body = forgot_password_email(new_session.id, random_token)
        send_email("Password Reset Link",app.config['MAIL_SERVER'],email,body)
        status = new_session.insert()
        print(status)
    ## send response ##
    resp=dict()
    resp["Status code"] = 200
    resp["Response"] = "Reset password link sent!"
    return jsonify(resp), 200

@auth.route('/change-password', methods=['POST'])
@validate_json
@ensure_fields(required_fields=['session_id','token','password', 'verify_password'])
def change_password(data):
    session_id = data['session_id']
    token = data['token']
    password = data['password']
    verify_password = data['verify_password']

    ## find the session in db check token, expiry time and expired or not ##
    session = ResetPasswordSession.query.filter(ResetPasswordSession.id == int(session_id)).first()
    resp=dict()
    if (session):
        if(session.token == token and session.expiry_time >= int(datetime.datetime.now().timestamp()) and not session.is_expired):
            if(password == verify_password):
                session.expire()
                if(session.user.set_password(password) == 1):
                    send_email("Password changed", app.config['MAIL_SERVER'], session.user.email, password_changed())
                else:
                    resp["Status code"] = 500
                    resp["Response"] = "Some problem occured"
                    return jsonify(resp), 500
            else:
                resp["Status code"] = 400
                resp["Response"] = "Password and verify password doesn't match"
                return jsonify(resp),400
        else:
            resp["Status code"] = 400
            resp["Response"] = "The token is wrong, the session expired or your password was already changed"
            return jsonify(resp), 400
    else:
        resp["Status code"] = 400
        resp["Response"] = "No active session found"
        return jsonify(resp), 400
    ## if everythings hold then change the password and email it to the user ##

    resp["Response"] = "Password changed sucessfully!"
    resp["Status code"] = 200
    return jsonify(resp), 200
    ## send response ##

def verify_google_token(token):
    try:
        id_info = id_token.verify_oauth2_token(token, requests.Request(), app.config["GOOGLE_CLIENT_ID"])
        print(id_info)
        return id_info
    except Exception as e:
        print(e)
        raise




