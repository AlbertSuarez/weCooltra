from flask import jsonify, request
from sqlalchemy import func

from src.model.friend import Friend
from src.util import log
from src.model.user import User
from src.db.sqlalchemy import db_session


def get(user_id):
    try:
        user = db_session().query(User).filter_by(id=user_id).first()
        if user:
            friend_list = db_session().query(Friend).filter_by(user_id_one=user_id).all()
            friend_list = [friend.user_two.serialize() for friend in friend_list]
            response = sorted(friend_list, key=lambda k: k['points'], reverse=True)
            return jsonify(error=False, response=response), 200
        else:
            return jsonify(error=True, message='No user found with {} as id.'.format(user_id)), 400
    except Exception as e:
        log.error('Unexpected error in GET/friend: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400


def post():
    try:
        body = request.json
        required_parameters = ['user_one', 'user_two']
        if not all(x in body for x in required_parameters):
            return jsonify(error=True, message='All request body parameters are required.'), 400

        if body['user_one'] == body['user_two']:
            return jsonify(error=True, message='Both user have to be different.'), 400

        user_one = db_session().query(User).filter_by(id=body['user_one']).first()
        if not user_one:
            return jsonify(error=True, message='No user found with {} as id.'.format(body['user_one'])), 400

        user_two = db_session().query(User).filter_by(id=body['user_two']).first()
        if not user_two:
            return jsonify(error=True, message='No user found with {} as id.'.format(body['user_two'])), 400

        friend = db_session().query(Friend).filter_by(user_id_one=user_one.id, user_id_two=user_two.id).first()
        if not friend:
            friend_one = Friend(
                user_id_one=user_one.id,
                user_id_two=user_two.id
            )
            db_session().add(friend_one)
            db_session().flush()

            friend_two = Friend(
                user_id_one=user_two.id,
                user_id_two=user_one.id
            )
            db_session().add(friend_two)
            db_session().flush()

            db_session().commit()
            response = 'OK'
        else:
            response = 'Already created'
        return jsonify(error=False, response=response), 200

    except Exception as e:
        log.error('Unexpected error in POST/friend: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400


def count():
    try:
        user_query = db_session().query(Friend)
        user_query_count = user_query.statement.with_only_columns([func.count()]).order_by(None)
        user_count = db_session().execute(user_query_count).scalar()
        return jsonify(error=False, response=user_count/2), 200
    except Exception as e:
        log.error('Unexpected error in GET/friend/count: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400
