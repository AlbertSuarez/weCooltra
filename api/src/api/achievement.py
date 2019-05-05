from flask import jsonify
from sqlalchemy import func

from src.model.achievement import Achievement
from src.model.achievement_user import AchievementUser
from src.util import log
from src.model.user import User
from src.db.sqlalchemy import db_session


def get(user_id=None):
    try:
        if not user_id:
            achievement_list = db_session().query(Achievement).all()
            response = [achievement.serialize() for achievement in achievement_list]
            return jsonify(error=False, response=response), 200
        else:
            user = db_session().query(User).filter_by(id=user_id).first()
            if user:
                achievement_list = db_session().query(AchievementUser).filter_by(user_id=user_id).all()
                response = [achievement.achievement for achievement in achievement_list]
                return jsonify(error=False, response=response), 200
            else:
                return jsonify(error=True, message='No user found with {} as id.'.format(user_id)), 400
    except Exception as e:
        log.error('Unexpected error in GET/achievement: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400


def count():
    try:
        user_query = db_session().query(AchievementUser)
        user_query_count = user_query.statement.with_only_columns([func.count()]).order_by(None)
        user_count = db_session().execute(user_query_count).scalar()
        return jsonify(error=False, response=user_count), 200
    except Exception as e:
        log.error('Unexpected error in GET/achievement/count: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400
