from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from app import db

class Subreddit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique = True)
    posts = db.relationship('Post', backref='subreddit', lazy='dynamic')
    users = db.relationship('UserSubs', backref='user', lazy='dynamic')

    def insert(self):
        try:
            db.session.add(self)
            db.session.commit()
        except:
            db.session.rollback()
            return -1
        return self.id
    
    def delete(self):
        try:
            db.session.delete(self)
            db.session.commit()
        except:
            db.session.rollback()
            return -1
        return self.id
    
    def jsonify(self):

        return {
            "id": self.id,
            "name": self.name
        }
    
    def __repr__(self):
        return '<Subreddit {}>'.format(self.name)
