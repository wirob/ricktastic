from flask import Flask

from routes.index import index
from routes.characters import characters

app = Flask(__name__)

app.register_blueprint(index)
app.register_blueprint(characters)
