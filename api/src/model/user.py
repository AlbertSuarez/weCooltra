import sqlalchemy as db

from src.db.sqlalchemy import Base


class User(Base):
    __tablename__ = 'wecooltra_user'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(500), nullable=False)
    level = db.Column(db.Integer, nullable=False)

    def serialize(self):
        return dict(
            id=self.id,
            full_name=self.full_name,
            image_url=self.image_url,
            level=self.level
        )
