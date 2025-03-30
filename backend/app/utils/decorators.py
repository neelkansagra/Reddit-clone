from functools import wraps
from flask import request, jsonify
import jwt
import os

def validate_json(func):
    @wraps(func)
    def f1(*args, **kwargs):
        if request.content_type != 'application/json':
            return jsonify({"error": "Content-Type must be application/json"}), 400
        try:
            data = request.get_json()
        except Exception:
            return jsonify({"error": "Invalid JSON format"}), 400
        return func(data, *args, **kwargs)
    return f1

def ensure_fields(required_fields):
    def decorator(func):
        @wraps(func)
        def d2(data, *args, **kwargs):
            set_data = set(data.keys())
            if len(required_fields) != len(set_data):
                return jsonify({"error": "Extra data in JSON"}), 400
            missing_fields = [field for field in required_fields if field not in set_data]
            if missing_fields:
                return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400
            return func(data, *args, **kwargs)
        return d2
    return decorator

def token_required(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = request.headers["Authorization"].split(" ")[1]
            #print(token + " this is token")

            if not token:
                return jsonify({'message': 'Token is missing!'}), 401

            try:
                data = jwt.decode(token, os.getenv('JWT_SECRET_KEY'), algorithms=['HS256'])
            except jwt.ExpiredSignatureError:
                return jsonify({'message': 'Token has expired!'}), 401
            except jwt.InvalidTokenError:
                return jsonify({'message': 'Invalid token!'}), 401

            return f(data, *args, **kwargs)

        return decorated