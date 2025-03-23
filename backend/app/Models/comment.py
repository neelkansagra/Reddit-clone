from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from app import db


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(120))
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    num_of_upvotes = db.Column(db.Integer)
    num_of_downvotes = db.Column(db.Integer)
    votes = db.relationship('VotesComment', backref='users', lazy='dynamic')

    def upvote_comment(self):
        try:
            self.num_of_upvotes+=1
            db.session.commit()
        except:
            db.session.rollback()
            return -1
        return 1

    def downvote_comment(self):
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
            "body": self.body,
            "num_of_upvotes": self.num_of_upvotes,
            "num_of_downvotes": self.num_of_downvotes
        }

    def __repr__(self):
        return '<Comment {}>'.format(self.body)
