from app import app
from functools import wraps
from app.models import User, Post, Subreddit, Comment, UserSubs
from flask import jsonify, request, make_response
from sqlalchemy import or_
import jwt

@app.route('/', methods=['GET'])
def hello():
    resp = dict()
    resp["msg"] = "hello world"
    return jsonify(resp)

@app.route('/user', methods=['GET'])
def get_all_users():
    list_of_users = []
    u = User.query.all()
    for i in u:
        list_of_users.append(i.jsonify())
    
    return jsonify(list_of_users)

@app.route('/subreddit', methods=['GET'])
def get_all_subreddits():
    list_of_subreddits = []
    u = Subreddit.query.all()
    for i in u:
        list_of_subreddits.append(i.jsonify())

    return jsonify(list_of_subreddits)

@app.route('/post', methods=['GET'])
def get_all_posts():
    list_of_posts = []
    u = Post.query.all()
    for i in u:
        list_of_posts.append(i.jsonify())

    return jsonify(list_of_posts)

@app.route('/comment', methods=['GET'])
def get_all_comments():
    list_of_comments = []
    u = Comment.query.all()
    for i in u:
        list_of_comments.append(i.jsonify())

    return jsonify(list_of_comments)


@app.route('/adduser', methods=['POST'])
def create_user():
    data = request.get_json()
    name = data["name"]
    email = data["email"]
    password = data["password"]
    # print(name)
    # print(email)
    # print(password)
    resp = dict()
    if(email is not None and name is not None and password is not None):
        U = User(user_name = name, email = email)
        p = User.query.filter_by(user_name = name).first()
        q = User.query.filter_by(email = email).first()
        if(p is None and q is None):
            U.set_password(password)
            status = U.insert()
            if(status == -1):
                resp["Status code"] = 500
                resp["Response"] = "Internal Server error"
                return jsonify(resp), 500

            resp["Status code"] = 200
            resp["Response"] = "Success"
            return jsonify(resp), 200
        elif(p is None):
            resp["Status code"] = 401
            resp["Response"] = "Email exists"
            return jsonify(resp), 401
        else:
            resp["Status code"] = 401
            resp["Response"] = "User exists"
            return jsonify(resp), 401
    else:
        resp["Status code"] = 400
        resp["Response"] = "Bad Request"
        return jsonify(resp), 400

@app.route('/addsubreddit', methods=['POST'])
def create_subreddit():
    data = request.get_json()
    user_id = data["user_id"]
    name = data["name"]
    print(user_id)
    print(name)

    resp = dict()
    if(user_id is not None and name is not None):
        user = User.query.get(int(user_id))

        if(user is None):
            resp["Status code"] = 401
            resp["Response"] = "User does not exist!"
            return jsonify(resp), 401
        sub = Subreddit.query.filter_by(name=name).first()
        if(sub is not None):
            resp["Status code"] = 401
            resp["Response"] = "Subreddit exists!"
            return jsonify(resp), 401
        else:
            subreddit_id = user.create_subreddit(name)
            
            if(subreddit_id == -1):
                resp["Status code"] = 500
                resp["Response"] = "Internal Server Eroor!" 
                return jsonify(resp), 500

            resp["Status code"] = 200
            resp["Response"] = subreddit_id
            return jsonify(resp), 200
        
    else:
        resp["Status code"] = 400
        resp["Response"] = "Bad Request"
        return jsonify(resp), 400

@app.route('/addpost', methods=['POST'])
def create_post():
    data = request.get_json()
    user_id = data["user_id"]
    sub_id = data["sub_id"]
    title = data["title"]
    body = data["body"]

    print(user_id)
    print(sub_id)
    print(title)
    print(body)


    resp = dict()
    if(user_id is not None and sub_id is not None and title is not None and body is not None):
        user_id_check = User.query.get(int(user_id))
        if(user_id_check is None):
            resp["Status code"] = 401
            resp["Response"] = "User does not exist"
            return jsonify(resp)
        sub_id_check = Subreddit.query.get(int(sub_id))
        if(sub_id_check is None):
            resp["Status code"] = 401
            resp["Response"] = "Subreddit does not exist"
            return jsonify(resp)
        post_id = user_id_check.create_post(title, body, sub_id)
        if(post_id == -1):
            resp["Status code"] = 500
            resp["Response"] = "Interval server error!"
            return jsonify(resp)
        else:
            resp["Status code"] = 200
            resp["Response"] = str(post_id)
            return jsonify(resp)

    else:
        resp["Status code"] = 400
        resp["Response"] = "Bad Request"
        return jsonify(resp)

@app.route('/addcomment', methods=['POST'])
def create_comment():
    data = request.get_json()
    user_id = data["user_id"]
    post_id = data["post_id"]
    body = data["body"]

    print(user_id)
    print(post_id)
    print(body)

    resp = dict()
    if(user_id is not None and body is not None and post_id is not None):
        user_id_check = User.query.get(int(user_id))
        if(user_id_check is None):
            resp["Status code"] = 401
            resp["Response"] = "User does not exist"
            return jsonify(resp)
        post_id_check = Post.query.get(int(post_id))
        if(post_id_check is None):
            resp["Status code"] = 401
            resp["Response"] = "Subreddit does not exist"
            return jsonify(resp)
        cmt_id = user_id_check.create_comment(body,int(post_id))
        if(cmt_id == -1):
            resp["Status code"] = 500
            resp["Response"] = "Interval server error!"
            return jsonify(resp)
        else:
            resp["Status code"] = 200
            resp["Response"] = str(cmt_id)
            return jsonify(resp)

    else:
        resp["Status code"] = 400
        resp["Response"] = "Bad Request"
        return jsonify(resp)

def token_required(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = request.headers["Authorization"].split(" ")[1]
            #print(token + " this is token")

            if not token:
                return jsonify({'message': 'Token is missing!'}), 401

            try:
                data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
                current_user = User.query.filter_by(id = int(data['user_id'])).first()
                if current_user is None:
                    return jsonify({'message': "Invalid user"}), 401
            except jwt.ExpiredSignatureError:
                return jsonify({'message': 'Token has expired!'}), 401
            except jwt.InvalidTokenError:
                return jsonify({'message': 'Invalid token!'}), 401

            return f(current_user, *args, **kwargs)

        return decorated
    
@app.route('/login', methods=['POST'])
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

@app.route('/signup', methods=['POST'])
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
        resp["Status code"] = 200
        resp["Response"] = "Success"
        return jsonify(resp), 200
    else:
        resp["Status code"] = 401
        resp["Response"] = "User already exists"
        return jsonify(resp), 401

@app.route('/delete', methods=['DELETE'])
def delete():
    if request.content_type != 'application/json':
        return jsonify({"error": "Content-Type must be application/json"}), 400
    try:
        data = request.get_json()
    except Exception:
        return jsonify({"error": "Invalid JSON format"}), 400
    
    if 'username' not in data:
        return jsonify({"error": "Missing username or password"}), 400
    
    username = data["username"].strip()
    print(username)
    resp = dict()
    p = User.query.filter(User.user_name == username).first()
    if(p):
        p.delete()
        resp["Status code"] = 200
        resp["Response"] = "User deleted"
        return jsonify(resp), 200
    else:
        resp["Status code"] = 401
        resp["Response"] = "No such email"
        return jsonify(resp), 401

@app.route('/feed', methods=['GET'])
@token_required
def get_feed(current_user):
    
    feed = current_user.feedify()

    print(feed)

    resp = dict()
    resp["Response"] = "Success"
    resp["posts"] = feed
    response = make_response(jsonify(resp))
    #response.headers["Authorization"] = "Bearer "+ str(token)
    return response, 200

@app.route('/search', methods=['GET'])
def search():
    pass


#use this for both get and put
@app.route('/user/<int:id2>', methods=['GET', 'PUT'])
def get_user(id2):
    if(request.method == 'GET'):
        user = User.query.get(int(id2))
        return user.jsonify()
    
    # if(request.method == 'PUT'):


    return "Hello, World!"

@app.route('/subreddit/<int:id>', methods=['GET','PUT'])
def get_subreddit(id):
    return "Hello, World!"

@app.route('/comment/<int:id>', methods=['GET','PUT'])
def get_comment(id):
    return "Hello, World!"

@app.route('/post/<int:id>', methods=['GET', 'PUT'])
def get_post(id):
    return "Hello, World!"

@app.route('/user/<int:id>', methods=['DELETE'])
def delete_user(id):
    return "Hello, World!"

@app.route('/subreddit/<int:id>', methods=['DELETE'])
def delete_subreddit(id):
    return "Hello, World!"

@app.route('/comment/<int:id>', methods=['DELETE'])
def delete_comment(id):
    return "Hello, World!"

@app.route('/post/<int:id>', methods=['DELETE'])
def delete_post(id):
    return "Hello, World!"

@app.route('/user/<int:id>/comments', methods=['GET'])
def get_user_comments(id):
    return "Hello, World!"

@app.route('/user/<int:id>/subreddits', methods=['GET'])
def get_user_subreddits(id):
    return "Hello, World!"

@app.route('/user/<int:id>/posts', methods=['GET'])
def get_user_posts(id):
    return "Hello, World!"

@app.route('/post/<int:id>/comments', methods=['GET'])
def get_post_comments(id):
    return "Hello, World!"

@app.route('/subreddit/<int:id>/posts', methods=['GET'])
def get_subreddit_posts(id):
    return "Hello, World!"

@app.route('/subreddit/<int:id>/users', methods=['GET'])
def get_subreddit_users(id):
    return "Hello, World!"

