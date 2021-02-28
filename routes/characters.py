from flask import Blueprint, request
import requests

characters = Blueprint('characters', __name__)

baseUrl = 'https://rickandmortyapi.com/api/character'


@characters.route('/characters')
def findCharacter():
    status = request.args.get('status')
    gender = request.args.get('gender')

    if status is not None:
        if status not in ('Alive', 'Dead', 'unknown'):
            return {"error": "you need to supply a correct status"}, 400

    if gender is not None:
        if gender not in ('Female', 'Male', 'Genderless', 'unknown'):
            return {"error": "you need to specify a correct gender"}, 400

    url = baseUrl + \
        '?status={status}&gender={gender}'.format(
            status=status or '', gender=gender or '')

    r = requests.get(url)

    return r.json()
