from flask import Blueprint

index = Blueprint('index', __name__)


@index.route('/api')
def hello():
    return {"message": "hello, world"}
