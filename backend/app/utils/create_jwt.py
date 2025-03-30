import jwt
import datetime
import os
import random
import string
import re
import smtplib
from email.message import EmailMessage
from app import app

def create_jwt(status, role="user"):

    resp = dict()
    expiration = datetime.datetime.now() + datetime.timedelta(seconds=int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES')))
    resp["user ID"] = status
    resp["role"] = role
    resp["exp"] = expiration.timestamp()
    token = jwt.encode(resp, os.getenv("JWT_SECRET_KEY"),algorithm="HS256")
    return token

def create_random_token(length):
    """
    Generate a random token of the given length.
    The token will be a random permutation of lowercase letters, uppercase letters, and digits.
    """
    characters = string.ascii_letters + string.digits  # Combine lowercase, uppercase, and digits
    return ''.join(random.choices(characters, k=length))

def is_valid_email(email):
    """
    Validate an email address using a regular expression.
    Returns True if the email is valid, otherwise False.
    """
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(email_regex, email) is not None
def forgot_password_email(session_id,token):
    link = "http://localhost:3001/resetPassword/?session_id={}&token={}".format(str(session_id), token)
    body = 'Here is the link to reset passowrd: {}'.format(link)
    return body

def password_changed():
    body = "Your password has succesfully changed!"
    return body

def send_email(subject, sender, reciever, body):
    msg = EmailMessage()
    msg.set_content(body)
    msg["Subject"] = subject
    msg["From"] = sender
    msg["To"] = reciever

    # 🔹 Connect to Gmail SMTP Server
    with smtplib.SMTP(sender, int(app.config['MAIL_PORT'])) as server:
        server.sendmail(msg["From"], [msg["To"]], msg.as_string())
