from flask import jsonify

from src.model.friend import Friend
from src.util import log
from src.model.user import User
from src.db.sqlalchemy import db_session


def get(user_id):
    try:
        user = db_session().query(User).filter_by(id=user_id).first()
        if user:
            friend_list = db_session().query(Friend).filter_by(user_id_one=user_id).all()
            response = [friend.user_two.serialize() for friend in friend_list]
            return jsonify(error=False, response=response), 200
        else:
            return jsonify(error=True, message='No user found with {} as id.'.format(user_id)), 400
    except Exception as e:
        log.error('Unexpected error in GET/friend: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400
