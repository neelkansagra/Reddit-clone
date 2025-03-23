from flask import Blueprint, request, jsonify, make_response
from app.Models import User
from app import db
from sqlalchemy import or_

auth = Blueprint('auth', __name__) 

@auth.route('/login', methods=['POST'])
def login_user():
    if request.content_type != 'application/json':
        return jsonify({"error": "Content-Type must be application/json"}), 400
    
    try:
        data = request.get_json()
    except Exception:
        return jsonify({"error": "Invalid JSON format"}), 400
    
    if 'email' not in data or 'password' not in data:
        return jsonify({"error": "Missing username or password"}), 400


    email = data["email"].strip()
    password = data["password"].strip()
    print(email)
    print(password)
    
    p = User.query.filter(or_(User.email == email, User.user_name==email)).first()
    print(p)
    # print(p.check_password(password))
    resp = dict()
    if(p):
        if(p.check_password(password)):

            token = jwt.encode({'user_id': str(p.id)}, app.config['SECRET_KEY'], algorithm='HS256')
            resp["Status code"] = 200
            resp["Response"] = "Login Success"
            response = make_response(jsonify(resp))
            response.headers["Authorization"] = "Bearer "+ str(token)
            return response, 200
        else:
            resp["Status code"] = 401
            resp["Response"] = "Login Failure Wrong Password"
            response = make_response(jsonify(resp))
            return response, 401
    else:
        resp["Status code"] = 401
        resp["Response"] = "No such email or username"
        return jsonify(resp), 401

@auth.route('/signup', methods=['POST'])
def signup_user():
    if request.content_type != 'application/json':
        return jsonify({"error": "Content-Type must be application/json"}), 400
    try:
        data = request.get_json()
    except Exception:
        return jsonify({"error": "Invalid JSON format"}), 400
    
    if 'email' not in data or 'password' not in data or 'username' not in data:
        return jsonify({"error": "Missing username or password"}), 400
    
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


        return jsonify(resp), 200
    else:
        resp["Status code"] = 401
        resp["Response"] = "User already exists"
        return jsonify(resp), 401