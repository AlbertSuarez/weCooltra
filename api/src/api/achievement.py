from flask import jsonify

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
