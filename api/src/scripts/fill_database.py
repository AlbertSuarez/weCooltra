import csv
import tqdm
import argparse

from src.model.trip import Trip
from src.util import log, date
from src.model.user import User
from src.services import random_api
from src.db.sqlalchemy import db_session


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('input_file', type=str)
    parser.add_argument('--system_name', type=str, default='Barcelona')
    return parser.parse_args()


def fill_database():
    with open(args.input_file, newline='') as f:
        trips = [row[1] for row in enumerate(csv.reader(f))][1:]
    log.info('Trips: {}'.format(len(trips)))

    trips = [trip for trip in tqdm.tqdm(trips, total=len(trips)) if trip[8] == args.system_name]
    log.info('Trips of Barcelona: {}'.format(len(trips)))

    input_dict = {}
    for trip in tqdm.tqdm(trips, total=len(trips)):
        user_id = trip[7]
        if user_id not in input_dict:
            input_dict[user_id] = []
        input_dict[user_id].append(trip)
    log.info('Users of Barcelona: {}'.format(len(input_dict)))

    input_dict_items = input_dict.items()
    for user_id, trips in tqdm.tqdm(input_dict_items, total=len(input_dict_items)):
        random_personality = random_api.get_random_personality()
        if random_personality:
            full_name = '{} {}'.format(random_personality['name']['first'], random_personality['name']['last'])
            image_url = random_personality['picture']['large']
            user = User(id=user_id, full_name=full_name, image_url=image_url, level=1)
            db_session().add(user)
            db_session().flush()
            for t in trips:
                trip = Trip(
                    id=int(t[0]),
                    start_point_lat=float(t[1]),
                    start_point_lon=float(t[2]),
                    end_point_lat=float(t[3]),
                    end_point_lon=float(t[4]),
                    started_at=date.to_string(t[5]),
                    ended_at=date.to_string(t[6]),
                    system_name=t[8],
                    vehicle_external_id=t[9],
                    duration_in_seconds=float(t[10]),
                    billable_duration_in_seconds=int(t[11]),
                    first_checkout_attempt_at=date.to_string(t[12]),
                    first_checkout_attempt_error=None if not t[13] else t[13],
                    first_checkout_attempt_error_details=None if not t[14] else t[14],
                    first_checkout_attempt_id=int(t[15]),
                    first_checkout_attempt_state=t[16],
                    last_checkout_attempt_at=date.to_string(t[17]),
                    last_checkout_attempt_error=None if not t[18] else t[18],
                    last_checkout_attempt_error_details=None if not t[19] else t[19],
                    last_checkout_attempt_id=int(t[20]),
                    last_checkout_attempt_state=t[21],
                    first_odometer_in_meters=int(t[22]),
                    last_odometer_in_meters=int(t[24]),
                    pause_duration_in_seconds=float(t[27]),
                    reservation_at=date.to_string(t[28]),
                    user_id=user_id
                )
                db_session().add(trip)
                db_session().flush()
            db_session().commit()
        else:
            log.warn('Skipping user creation for user_id: {}'.format(user_id))


if __name__ == '__main__':
    args = parse_args()
    fill_database()
