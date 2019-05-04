import tqdm
import argparse

from sqlalchemy import func

from src.db.sqlalchemy import db_session
from src.model.friend import Friend
from src.model.user import User


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('friends_per_user', type=int)
    return parser.parse_args()


def create_friendship(user, friend):
    friend_exists = db_session().query(Friend).filter_by(user_id_one=user.id, user_id_two=friend.id).first()
    if not friend_exists:
        friend_one = Friend(
            user_id_one=user.id,
            user_id_two=friend.id
        )
        db_session().add(friend_one)
        db_session().flush()
        friend_two = Friend(
            user_id_one=friend.id,
            user_id_two=user.id
        )
        db_session().add(friend_two)
        db_session().flush()


def make():
    user_list = db_session().query(User).all()
    for user in tqdm.tqdm(user_list, total=len(user_list)):
        user_friends = db_session().query(User)\
            .filter(User.id != user.id)\
            .order_by(func.random())\
            .limit(args.friends_per_user)\
            .all()
        for friend in user_friends:
            create_friendship(user, friend)
        db_session().commit()


if __name__ == '__main__':
    args = parse_args()
    make()
