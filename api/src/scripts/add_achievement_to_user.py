import random
import tqdm
import argparse

from sqlalchemy import func

from src.db.sqlalchemy import db_session
from src.model.achievement_user import AchievementUser
from src.model.friend import Friend
from src.model.trip import Trip
from src.model.user import User
from src.util import log


def parse_args():
    parser = argparse.ArgumentParser()
    return parser.parse_args()


def add_achievement(user_id, achievement_id, total_points):
    achievement_exists = db_session().query(AchievementUser)\
        .filter_by(achievement_id=achievement_id, user_id=user_id).first()
    if not achievement_exists:
        achievement_user = AchievementUser(
            achievement_id=achievement_id,
            user_id=user_id
        )
        db_session().add(achievement_user)
        db_session().flush()
        total_points[0] += achievement_user.achievement.points


def add():
    user_list = db_session().query(User).all()
    for user in tqdm.tqdm(user_list, total=len(user_list)):
        try:
            # Init points
            total_points = [user.points]

            # Compute total kilometers
            user_kilometers = 0
            trip_list = db_session().query(Trip).filter_by(user_id=user.id).all()
            for trip in trip_list:
                start_kilometers = trip.first_odometer_in_meters / 1000.0
                end_kilometers = trip.last_odometer_in_meters / 1000.0
                user_kilometers += (end_kilometers - start_kilometers)
            total_points[0] += int(user_kilometers)

            # (15) Primeros pasos
            if int(user_kilometers) > 0:
                add_achievement(user_id=user.id, achievement_id=15, total_points=total_points)

            # Initialize variables for deciding if a achievement will be granted.
            visitor_count = 0
            expert_count = 0

            # (1) Barcelona
            add_achievement(user_id=user.id, achievement_id=1, total_points=total_points)
            visitor_count += 1
            # (7) Barcelona Expert
            if random.uniform(0, 1) <= 0.1:
                add_achievement(user_id=user.id, achievement_id=7, total_points=total_points)
                expert_count += 1

            # (2) Madrid
            if random.uniform(0, 1) <= 0.1:
                add_achievement(user_id=user.id, achievement_id=2, total_points=total_points)
                visitor_count += 1
                # (8) Madrid Expert
                if random.uniform(0, 1) <= 0.1:
                    add_achievement(user_id=user.id, achievement_id=8, total_points=total_points)
                    expert_count += 1

            # (3) Valencia
            if random.uniform(0, 1) <= 0.1:
                add_achievement(user_id=user.id, achievement_id=3, total_points=total_points)
                visitor_count += 1
                # (9) Valencia Expert
                if random.uniform(0, 1) <= 0.1:
                    add_achievement(user_id=user.id, achievement_id=9, total_points=total_points)
                    expert_count += 1

            # (4) Lisbon
            if random.uniform(0, 1) <= 0.1:
                add_achievement(user_id=user.id, achievement_id=4, total_points=total_points)
                visitor_count += 1
                # (10) Lisbon Expert
                if random.uniform(0, 1) <= 0.1:
                    add_achievement(user_id=user.id, achievement_id=10, total_points=total_points)
                    expert_count += 1

            # (5) Milan
            if random.uniform(0, 1) <= 0.1:
                add_achievement(user_id=user.id, achievement_id=5, total_points=total_points)
                visitor_count += 1
                # (11) Milan Expert
                if random.uniform(0, 1) <= 0.1:
                    add_achievement(user_id=user.id, achievement_id=11, total_points=total_points)
                    expert_count += 1

            # (6) Roma
            if random.uniform(0, 1) <= 0.1:
                add_achievement(user_id=user.id, achievement_id=6, total_points=total_points)
                visitor_count += 1
                # (12) Roma Expert
                if random.uniform(0, 1) <= 0.1:
                    add_achievement(user_id=user.id, achievement_id=12, total_points=total_points)
                    expert_count += 1

            # (13) Trotamundos
            if expert_count == 6:
                add_achievement(user_id=user.id, achievement_id=13, total_points=total_points)

            # (14) Internacional
            if visitor_count > 1:
                add_achievement(user_id=user.id, achievement_id=14, total_points=total_points)

            # Friends achievements
            user_query = db_session().query(Friend).filter(Friend.user_id_one == user.id)
            user_query_count = user_query.statement.with_only_columns([func.count()]).order_by(None)
            friend_count = db_session().execute(user_query_count).scalar()

            # (16) El amigo
            add_achievement(user_id=user.id, achievement_id=16, total_points=total_points)

            # (17) El popular
            if friend_count >= 15:
                add_achievement(user_id=user.id, achievement_id=17, total_points=total_points)

            # (18) El famoso
            if friend_count >= 30:
                add_achievement(user_id=user.id, achievement_id=18, total_points=total_points)

            # (19) Eco-friendly
            if random.uniform(0, 1) <= 0.25:
                add_achievement(user_id=user.id, achievement_id=19, total_points=total_points)

            # (20) Boyscout
            if random.uniform(0, 1) <= 0.3:
                add_achievement(user_id=user.id, achievement_id=20, total_points=total_points)

            # (21) Mañanero
            if random.uniform(0, 1) <= 0.5:
                add_achievement(user_id=user.id, achievement_id=21, total_points=total_points)

            # (22) Nocturno
            if random.uniform(0, 1) <= 0.45:
                add_achievement(user_id=user.id, achievement_id=22, total_points=total_points)

            user.points = total_points[0]
            db_session().flush()

            user = db_session().query(User).filter_by(id=user.id).first()
            if user.points == 0:
                raise Exception

            db_session().commit()
        except Exception as e:
            log.error('Skipping points update for user {} - {}'.format(user.id, e))
            db_session().rollback()


if __name__ == '__main__':
    args = parse_args()
    add()
