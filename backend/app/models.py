from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from app import db

# class User(db.Model):
#     id = db.Column(db.Integer, primary_key = True)
#     user_name = db.Column(db.String(100), index = True, unique = True)
#     email = db.Column(db.String(200), index = True, unique = True)
#     password_hash = db.Column(db.String(200))
#     posts = db.relationship('Post', backref='users', lazy='dynamic')
#     subreddits =  db.relationship('UserSubs', backref='sub', lazy='dynamic')
#     comments = db.relationship('Comment', backref='comment', lazy='dynamic')

#     voted_posts =  db.relationship('VotesPost', backref='votes', lazy='dynamic')
#     voted_comments = db.relationship('VotesComment', backref='votes', lazy='dynamic')

#     def create_post(self, t, b, sub):
#         subred = UserSubs.query.filter_by(user_id = self.id,subreddit_id = sub).first()
#         if(subred is None):
#             return -1
#         else:
#             p = Post(title = t, body = b, user_id = self.id, sub_id = sub, 
#                  num_of_upvotes = 0, num_of_downvotes = 0)
#             post_id = p.insert()
#             if(post_id is None ):
#                 return -1
#             status = self.upvote_post(post_id)
#             if(status ==-1):
#                 return -1
#             return post_id

#     def create_comment(self, b, c_id):
#         c = Comment(body = b, user_id = self.id, post_id = c_id, 
#                  num_of_upvotes = 0, num_of_downvotes = 0)
        
#         comment_id = c.insert()
#         if(comment_id is None):
#             return -1
        
#         status =self.upvote_comment(comment_id)
#         if(status == -1):
#             return -1
#         return comment_id
    
#     def upvote_post(self, p_id):
#         post = Post.query.get(p_id)
#         status = post.upvote_post()
#         if(status !=1):
#             return -1
#         query = VotesPost.query.filter_by(user_id = self.id, post_id = p_id).first()
#         if(query is None):
#             up = VotesPost(user_id = self.id, post_id = p_id, vote = -1)
#             return up.insert()
#         else:
#             return query.upvote()
        
    
#     def downvote_post(self, p_id):
#         post = Post.query.get(p_id)
#         status = post.downvote_post()
#         if(status !=1):
#             return -1
        
#         q = VotesPost.query.filter_by(user_id = self.id, post_id = p_id).first()
#         if(q is None):
#             up = VotesPost(user_id = self.id, post_id = p_id, vote = -1)
#             return up.insert()
             
#         else:
#             return q.downvote()
            
    
#     def upvote_comment(self, c_id):
#         comment = Comment.query.get(c_id)
#         if(comment is None):
#             return -1
#         status = comment.upvote_comment()
#         if(status != 1):
#             return -1
#         query = VotesComment.query.filter_by(user_id = self.id, comment_id = c_id).first()
#         if(query is None):
#             up = VotesComment(user_id = self.id, comment_id = c_id, vote = -1)
#             return up.insert()
#         else:
#             return query.upvote()
    
#     def downvote_comment(self, c_id):
#         comment = Comment.query.get(c_id)
#         comment.downvote_comment()
#         query = VotesComment.query.filter_by(user_id = self.id, comment_id = c_id).first()
#         if(query is None):
#             up = VotesComment(user_id = self.id, comment_id = c_id, vote = -1)
#             return up.insert()
#         else:
#             return query.downvote()
    
#     def follow_subreddit(self, s_id, isAdmin=False):
#         us = UserSubs(user_id = self.id, subreddit_id = s_id, admin = isAdmin)
#         a = us.insert()
#         if(a is None):
#             return -1
#         else:
#             return a
    
#     def unfollow_subreddit(self, s_id):
#         subred = UserSubs.query.filter_by(user_id = self.id,subreddit_id = s_id).first()
#         if(subred is None):
#             return -1
#         else:
#             subred.delete()
#             return 1

#     def create_subreddit(self, n):
#         print("This is id " + str(self.id))
#         s = Subreddit(name = n)
#         s_id = s.insert()
#         if(s_id is None):
#             return -1
#         print("This is s_id " + str(s_id))
#         a = self.follow_subreddit(s_id, True)
#         if(a is -1):
#             return -1
#         return s_id

#     def set_password(self, password):
#         self.password_hash = generate_password_hash(password)

#     def check_password(self, password):
#         return check_password_hash(self.password_hash, password)

#     def feedify(self):
#         k = []
#         query = self.posts.all()

#         for post in query:
#             k.append(post.jsonify())
        
#         return k

#     def insert(self):
#         try:
#             db.session.add(self)
#             db.session.commit()
#         except:
#             db.session.rollback()
#             return -1
#         return self.id

#     def add_admin(self, s_id, new_id):
#         a = UserSubs.query.filter_by(user_id = self.id, subreddit_id = s_id).first()
#         if(a.admin == False):
#             return -1
#         else:
#             t = UserSubs.query.filter_by(user_id = new_id, subreddit_id = s_id).first()
#             if(t is None):
#                 return -1
#             else:
#                 t.addAdmin()
#                 return 1
        
#     def remove_admin(self, s_id, u_id):
#         a = UserSubs.query.filter_by(user_id = self.id, subreddit_id = s_id).first()
#         if(a.admin == False):
#             return -1
#         else:
#             t = UserSubs.query.filter_by(user_id = u_id, subreddit_id = s_id).first()
#             if(t is None):
#                 return -1
#             else:
#                 t.removeAdmin()
#                 return 1
    
#     def delete(self):
#         subred = UserSubs.query.filter_by(user_id = self.id).all()
#         for i in subred:
#             i.delete()

#         posts = VotesPost.query.filter_by(user_id = self.id).all()
#         for i in posts:
#             i.delete()
        
#         comment = VotesComment.query.filter_by(user_id = self.id).all()
#         for i in comment:
#             i.delete()
        
#         try:
#             db.session.delete(self)
#             db.session.commit()
#         except:
#             db.session.rollback()
#             return -1
#         return self.id

    
#     def jsonify(self):

#         return {
#             "id": self.id,
#             "user_name": self.user_name,
#             "email": self.email,
#             "password_hash": self.password_hash
#         }

#     def __repr__(self):
#         return '<User {}>'.format(self.user_name)
#     # upvoted = db.Column()
#     # downvoted =
    
#     # posts = 

# class Post(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String(100))
#     body = db.Column(db.String(500))
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
#     sub_id = db.Column(db.Integer, db.ForeignKey('subreddit.id'))
#     comments = db.relationship('Comment', backref='comments', lazy='dynamic')
#     num_of_upvotes = db.Column(db.Integer)
#     num_of_downvotes = db.Column(db.Integer)
#     votes = db.relationship('VotesPost', backref='users', lazy='dynamic')
#     timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)

#     def upvote_post(self):
#         try:
#             self.num_of_upvotes+=1
#             db.session.commit()
#         except:
#             db.session.rollback()
#             return -1
#         return 1
    
#     def downvote_post(self):
#         try:
#             self.num_of_downvotes+=1
#             db.session.commit()
#         except:
#             db.session.rollback()
#             return -1
#         return 1
        
#     def insert(self):
#         try:
#             db.session.add(self)
#             db.session.commit()
#         except:
#             db.session.rollback()
#             return -1
#         return self.id

#     def delete(self):
#         try:
#             db.session.delete(self)
#             db.session.commit()
#         except:
#             db.session.rollback()
#             return -1
#         return self.id
    
#     def jsonify(self):

#         return {
#             "id": self.id,
#             "title": self.title,
#             "body": self.body,
#             "user_id": self.user_id,
#             "sub_id": self.sub_id,
#             "num_of_upvotes": self.num_of_upvotes,
#             "num_of_downvotes": self.num_of_downvotes,
#             "timestamp": self.timestamp
#         }

#     def __repr__(self):
#         return '<Post {}>'.format(self.title)

# class Comment(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     body = db.Column(db.String(120))
#     post_id = db.Column(db.Integer, db.ForeignKey('post.id'))
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
#     num_of_upvotes = db.Column(db.Integer)
#     num_of_downvotes = db.Column(db.Integer)
#     votes = db.relationship('VotesComment', backref='users', lazy='dynamic')

#     def upvote_comment(self):
#         try:
#             self.num_of_upvotes+=1
#             db.session.commit()
#         except:
#             db.session.rollback()
#             return -1
#         return 1

#     def downvote_comment(self):
#         try:
#             self.num_of_downvotes+=1
#             db.session.commit()
#         except:
#             db.session.rollback()
#             return -1
#         return 1

#     def insert(self):
#         try:
#             db.session.add(self)
#             db.session.commit()
#         except:
#             db.session.rollback()
#             return -1
#         return self.id

#     def delete(self):
#         try:
#             db.session.delete(self)
#             db.session.commit()
#         except:
#             db.session.rollback()
#             return -1
#         return self.id
    
#     def jsonify(self):

#         return {
#             "id": self.id,
#             "body": self.body,
#             "num_of_upvotes": self.num_of_upvotes,
#             "num_of_downvotes": self.num_of_downvotes
#         }

#     def __repr__(self):
#         return '<Comment {}>'.format(self.body)

# class Subreddit(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(120), unique = True)
#     posts = db.relationship('Post', backref='subreddit', lazy='dynamic')
#     users = db.relationship('UserSubs', backref='user', lazy='dynamic')

#     def insert(self):
#         try:
#             db.session.add(self)
#             db.session.commit()
#         except:
#             db.session.rollback()
#             return -1
#         return self.id
    
#     def delete(self):
#         try:
#             db.session.delete(self)
#             db.session.commit()
#         except:
#             db.session.rollback()
#             return -1
#         return self.id
    
#     def jsonify(self):

#         return {
#             "id": self.id,
#             "name": self.name
#         }
    
#     def __repr__(self):
#         return '<Subreddit {}>'.format(self.name)

class UserSubs(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey(
        'user.id'), primary_key=True)
    subreddit_id = db.Column(db.Integer, db.ForeignKey(
        'subreddit.id'), primary_key=True)
    admin = db.Column(db.Boolean, default = False)

    def addAdmin(self):
        self.admin = True
        db.session.commit()
    
    def removeAdmin(self):
        self.admin = False
        db.session.commit()
    
    def insert(self):
        try:
            db.session.add(self)
            db.session.commit()
        except:
            db.session.rollback()
            return -1
        return (self.user_id,self.subreddit_id)
    
    def delete(self):
        try:
            db.session.delete(self)
            db.session.commit()
        except:
            db.session.rollback()
            return -1
        return (self.user_id,self.subreddit_id)
    
    def __repr__(self):
        return '<Subreddit {} {}>'.format(self.user_id,self.subreddit_id)

class VotesPost(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey(
        'user.id'), primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey(
        'post.id'), primary_key=True)
    vote = db.Column(db.Integer,default = 1, nullable = False)

    def upvote(self):
        try:
            self.vote = 1
            db.session.commit()
        except:
            db.session.rollback()
            return -1
        return 1
    def downvote(self):
        try:
            self.vote = -1
            db.session.commit()
        except:
            db.session.rollback()
            return -1
        return 1

    def insert(self):
        try:
            db.session.add(self)
            db.session.commit()
        except:
            db.session.rollback()
            return -1
        return 1
    
    def delete(self):
        try:
            db.session.delete(self)
            db.session.commit()
        except:
            db.session.rollback()
            return -1
        return 1
    
    def __repr__(self):
        s = "Upvote" if(self.vote == 1) else "Downvote"
        return '<'+s+' {} {}>'.format(self.user_id,self.post_id)

class VotesComment(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey(
        'user.id'), primary_key=True)
    comment_id = db.Column(db.Integer, db.ForeignKey(
        'comment.id'), primary_key=True)
    vote = db.Column(db.Integer,default = 1, nullable = False)

    def upvote(self):
        try:
            self.vote = 1
            db.session.commit()
        except:
            db.session.rollback()
        return 1

    def downvote(self):
        try:
            self.vote = -1
            db.session.commit()
        except:
            db.session.rollback()
        return 1

    def insert(self):
        try:
            db.session.add(self)
            db.session.commit()
        except:
            db.session.rollback()
        return 1
    
    def delete(self):
        try:
            db.session.delete(self)
            db.session.commit()
        except:
            db.session.rollback()
        return 1
        #return (self.user_id,self.subreddit_id)
    
    def __repr__(self):
        s = "Upvote" if(self.vote == 1) else "Downvote"
        return '<'+s+' {} {}>'.format(self.user_id,self.comment_id)
