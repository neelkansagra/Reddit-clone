from app import app, db
from app.Models.user import User
from app.Models.post import Post
from app.Models.subreddit import Subreddit
from app.Models.comment import Comment
from app.models import UserSubs

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'Post': Post}