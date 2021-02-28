from flask import Blueprint

characters = Blueprint('characters', __name__)


@characters.route('/characters')
def default():
    return {"message": "getting all characters baby!"}
