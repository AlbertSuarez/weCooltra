import json
import argparse

from src.db.sqlalchemy import db_session
from src.model.achievement import Achievement


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('title', type=str)
    parser.add_argument('description', type=str)
    parser.add_argument('points', type=int)
    return parser.parse_args()


def add():
    achievement = Achievement(
        title=args.title,
        description=args.description,
        points=args.points
    )
    db_session().add(achievement)
    db_session().flush()
    db_session().commit()

    achievement = db_session().query(Achievement).filter_by(id=achievement.id).first()
    if achievement:
        print(json.dumps(achievement.serialize(), indent=4))
    else:
        print('ERROR creating achievement')
        print('[TITLE]: {}'.format(args.title))
        print('[DESCRIPTION]: {}'.format(args.description))
        print('[POINTS]: {}'.format(args.points))


if __name__ == '__main__':
    args = parse_args()
    add()
