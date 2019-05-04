from flask import jsonify

from src.util import log
from src.model.user import User
from src.model.trip import Trip
from src.db.sqlalchemy import db_session


def get(user_id):
    try:
        user = db_session().query(User).filter_by(id=user_id).first()
        if user:
            trip_list = db_session().query(Trip).filter_by(user_id=user_id).all()
            response = [trip.serialize() for trip in trip_list]
            return jsonify(error=False, response=response), 200
        else:
            return jsonify(error=True, message='No user found with {} as id.'.format(user_id)), 400
    except Exception as e:
        log.error('Unexpected error in GET/trip: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400
