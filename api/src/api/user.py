from flask import jsonify

from src.util import log


def get(user_id):
    try:
        user = None
        if user:
            response = user.serialize()
            return jsonify(error=False, response=response), 200
        else:
            return jsonify(error=True, message='No user found with {} as id.'.format(user_id)), 400
    except Exception as e:
        log.error('Unexpected error in GET/user: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400
