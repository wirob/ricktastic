from flask import Blueprint, request
from random import randrange
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

    try:
        r = requests.get(url)
        return r.json()
    except:
        return {"error": "The request to the external api failed, please try again"}, 500


@characters.route('/characters/random')
def randomCharacter():
    try:
        # At this moment, there are 671 characthers defined in the api.
        # The character ID's ranges from 1 to 671.

        # Makes an initial request to find out how many characters there are
        request = requests.get(baseUrl)

        response = request.json()['info']

        # Extracts the current count of all characters
        count = request.json()['info']['count']

        # Creates a number that ranges from 1 to the current count of characters
        randomCharacterId = randrange(count)

        url = baseUrl + '/{id}'.format(id=randomCharacterId)

        character = requests.get(url)
        return character.json()
    except:
        return {"error": "The request to the external api failed, please try again"}, 500
