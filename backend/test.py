import string
import random
from app import app
from app.models import User, Post, Subreddit, Comment, UserSubs

def create_users():
  with app.app_context():
    ut = User.query.all()
    sub = Subreddit.query.all()
    t = UserSubs.query.all()
    pos = Post.query.all()
    comm = Comment.query.all()
    for i in t:
        i.delete()
    for i in sub:
        i.delete()
    
    for i in ut:
        i.delete()
    
    for i in pos:
        i.delete()
    
    for i in comm:
        i.delete()
    
    subreddd = []
    for i in range(5):
        us = ''.join(random.choices(string.ascii_uppercase + string.digits, k=5))
        em = ''.join(random.choices(string.ascii_uppercase + string.digits, k=20))
        u = User(user_name = us,email = em)
        
        u.set_password("psswd")
        print(u.check_password("psswd"))
        print(u.check_password("fghsadj"))
        u.insert()
        print(u.id)
        subred = "sub" + ''.join(random.choices(string.ascii_uppercase + string.digits, k=5))
        s_id1 = u.create_subreddit(subred)

        ff = u.create_post("First post by "+str(u.id), ''.join(random.choices(string.ascii_uppercase + string.digits, k=5)), s_id1)
        u.create_comment("First comment by "+str(u.id),ff)
        
        subred = "sub" + ''.join(random.choices(string.ascii_uppercase + string.digits, k=5))
        s_id2 = u.create_subreddit(subred)

        ff = u.create_post("First post by "+str(u.id), ''.join(random.choices(string.ascii_uppercase + string.digits, k=5)), s_id2)
        u.create_comment("First comment by "+str(u.id),ff)
        subreddd.append(s_id1)
        subreddd.append(s_id2)
        print("sub_id1 = " + str(s_id1))
        print("sub_id2 = " + str(s_id2))

    ut = User.query.all()
    sub = Subreddit.query.all()
    pos = Post.query.all()
    comm = Comment.query.all()
    for i in ut:
        print(i.jsonify())

    for i in pos:
        print(i.jsonify())
    
    for i in comm:
        print(i.jsonify())

    for i in sub:
        print(i.jsonify())

    t = UserSubs.query.all()
    for i in t:
        i.delete()
    
    for i in sub:
        i.delete()
    
    for i in ut:
        i.delete()

    for i in pos:
        i.delete()
    
    for i in comm:
        i.delete()    


create_users()


