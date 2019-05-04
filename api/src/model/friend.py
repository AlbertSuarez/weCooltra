import sqlalchemy as db

from sqlalchemy.orm import relationship

from src.db.sqlalchemy import Base
from src.model.user import User


class AchievementUser(Base):
    __tablename__ = 'wecooltra_achievement_user'

    user_id_one = db.Column(db.Integer, db.ForeignKey('wecooltra_user.id'), primary_key=True)
    user_id_two = db.Column(db.Integer, db.ForeignKey('wecooltra_user.id'), primary_key=True)

    user_one = relationship(User.__name__, foreign_keys=[user_id_one])
    user_two = relationship(User.__name__, foreign_keys=[user_id_two])

    def serialize(self):
        return dict(
            user_one=self.user_one.serialize(),
            user_two=self.user_two.serialize()
        )
