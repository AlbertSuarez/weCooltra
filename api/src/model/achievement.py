import sqlalchemy as db

from src.db.sqlalchemy import Base


class Achievement(Base):
    __tablename__ = 'wecooltra_achievement'

    id = db.Column(db.Integer, db.Sequence('wecooltra_achievement_id_seq', start=1, increment=1), primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    points = db.Column(db.Integer, nullable=False)

    def serialize(self):
        return dict(
            id=self.id,
            title=self.title,
            description=self.description,
            points=self.points
        )
