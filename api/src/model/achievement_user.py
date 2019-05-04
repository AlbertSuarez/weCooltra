import sqlalchemy as db

from sqlalchemy.orm import relationship

from src.db.sqlalchemy import Base
from src.model.achievement import Achievement
from src.model.user import User


class AchievementUser(Base):
    __tablename__ = 'wecooltra_achievement_user'

    achievement_id = db.Column(db.Integer, db.ForeignKey('wecooltra_achievement.id'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('wecooltra_user.id'), primary_key=True)

    achievement = relationship(Achievement.__name__)
    user = relationship(User.__name__)

    def serialize(self):
        return dict(
            achievement=self.achievement.serialize(),
            user=self.user.serialize()
        )
