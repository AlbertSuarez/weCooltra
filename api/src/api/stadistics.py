from flask import jsonify

from src.model.trip import Trip
from src.util import log
from src.model.user import User
from src.db.sqlalchemy import db_session


def get(user_id):
    try:
        user = db_session().query(User).filter_by(id=user_id).first()
        if user:
            user_kilometers = 0
            trip_list = db_session().query(Trip).filter_by(user_id=user_id).all()
            for trip in trip_list:
                start_kilometers = trip.first_odometer_in_meters / 1000.0
                end_kilometers = trip.last_odometer_in_meters / 1000.0
                user_kilometers += (end_kilometers - start_kilometers)

            achievement_list = []

            response = {
                'user': user.serialize(),
                'kilometers': round(user_kilometers, 2),
                'trips': len(trip_list),
                'average': round(user_kilometers / len(trip_list), 2),
                'achievements': achievement_list
            }
            return jsonify(error=False, response=response), 200
        else:
            return jsonify(error=True, message='No user found with {} as id.'.format(user_id)), 400
    except Exception as e:
        log.error('Unexpected error in GET/user: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400
