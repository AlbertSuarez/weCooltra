import tqdm
import random
import argparse

from src.db.sqlalchemy import db_session
from src.model.user import User


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('max_value', type=float)
    return parser.parse_args()


def add():
    user_list = db_session().query(User).all()
    for user in tqdm.tqdm(user_list, total=len(user_list)):
        balance_user = round(random.uniform(0, args.max_value), 2)
        user.balance = balance_user
        db_session().commit()


if __name__ == '__main__':
    args = parse_args()
    add()
