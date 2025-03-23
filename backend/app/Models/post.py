from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from app import db

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    body = db.Column(db.String(500))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    sub_id = db.Column(db.Integer, db.ForeignKey('subreddit.id'))
    comments = db.relationship('Comment', backref='comments', lazy='dynamic')
    num_of_upvotes = db.Column(db.Integer)
    num_of_downvotes = db.Column(db.Integer)
    votes = db.relationship('VotesPost', backref='users', lazy='dynamic')
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    def upvote_post(self):
        try:
            self.num_of_upvotes+=1
            db.session.commit()
        except:
            db.session.rollback()
            return -1
        return 1
    
    def downvote_post(self):
        try:
            self.num_of_downvotes+=1
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
            "title": self.title,
            "body": self.body,
            "user_id": self.user_id,
            "sub_id": self.sub_id,
            "num_of_upvotes": self.num_of_upvotes,
            "num_of_downvotes": self.num_of_downvotes,
            "timestamp": self.timestamp
        }

    def __repr__(self):
        return '<Post {}>'.format(self.title)
