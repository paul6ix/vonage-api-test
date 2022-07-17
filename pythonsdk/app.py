import os
from flask import Flask, render_template
from opentok import OpenTok, Client
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv('.env'))
# Loading api variables
api_key = os.environ.get('API_KEY')
api_secret = os.environ.get('API_SECRET')

# initializing flask application
app = Flask(__name__)

# initializing opentok sdk
opentok = OpenTok(api_key, api_secret)
session = opentok.create_session()


@app.route('/')
def main():
    key = api_key
    session_id = session.session_id
    token = opentok.generate_token(session_id)
    return render_template("index.html", api_key=key, session=session_id, token_id=token)


if __name__ == "__main__":
    app.debug = True
    app.run()
