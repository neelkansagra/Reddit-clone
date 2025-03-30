import datetime
from app import db

class ResetPasswordSession(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String(25),unique = True)
    expiry_time = db.Column(db.Integer)
    is_expired = db.Column(db.Boolean,default=False) 
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref='reset_sessions', lazy=True)

    def update_token(self,token, time_limit=3600):
        print(token)
        print(time_limit)
        try:
            self.token = token
            temp = datetime.datetime.now() + datetime.timedelta(seconds = time_limit)
            self.expiry_time = int(temp.timestamp())
            self.is_expired = False
            db.session.commit()
            return 1
        except Exception as e:
            print(e)
            db.session.rollback()
            return -1
        
    def expire(self):
        try:
            self.is_expired = True
            db.session.commit()
            return 1
        except:
            db.session.rollback()
            return -1

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

    def __repr__(self):
        return '<ResetSession id:{}, user_id:{}, token:{}, expiry:{}, is_expired:{} >'.format(self.id,str(self.user_id),self.token,str(self.expiry_time),self.is_expired)