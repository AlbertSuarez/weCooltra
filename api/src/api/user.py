from flask import jsonify
from sqlalchemy import func, cast, String

from src.util import log
from src.model.user import User
from src.db.sqlalchemy import db_session


def get(user_id):
    try:
        user = db_session().query(User).filter_by(id=user_id).first()
        if user:
            response = user.serialize()
            return jsonify(error=False, response=response), 200
        else:
            return jsonify(error=True, message='No user found with {} as id.'.format(user_id)), 400
    except Exception as e:
        log.error('Unexpected error in GET/user: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400


def search(prefix_user):
    try:
        prefix_user = str(prefix_user)
        users = db_session().query(User)\
            .filter(cast(User.id, String).ilike(prefix_user + '%'))\
            .order_by(User.id)\
            .limit(10)\
            .all()
        return jsonify(error=False, response=[user.serialize() for user in users]), 200
    except Exception as e:
        log.error('Unexpected error in GET/user/search: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400


def count():
    try:
        user_query = db_session().query(User)
        user_query_count = user_query.statement.with_only_columns([func.count()]).order_by(None)
        user_count = db_session().execute(user_query_count).scalar()
        return jsonify(error=False, response=user_count), 200
    except Exception as e:
        log.error('Unexpected error in GET/user/count: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400


def random():
    try:
        user = db_session().query(User).order_by(func.random()).first()
        if user:
            response = user.id
            return jsonify(error=False, response=response), 200
        else:
            return jsonify(error=True, message='No users.'), 400
    except Exception as e:
        log.error('Unexpected error in GET/user/random: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400

