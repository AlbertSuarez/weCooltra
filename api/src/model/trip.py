import sqlalchemy as db
from sqlalchemy.orm import relationship

from src.db.sqlalchemy import Base
from src.model.user import User


class Trip(Base):
    __tablename__ = 'wecooltra_trip'

    id = db.Column(db.Integer, primary_key=True)
    start_point_lat = db.Column(db.Float, nullable=False)
    start_point_lon = db.Column(db.Float, nullable=False)
    end_point_lat = db.Column(db.Float, nullable=False)
    end_point_lon = db.Column(db.Float, nullable=False)
    started_at = db.Column(db.DateTime(timezone=False), nullable=False)
    ended_at = db.Column(db.DateTime(timezone=False), nullable=False)
    system_name = db.Column(db.String(100), nullable=False)
    vehicle_external_id = db.Column(db.String(100), nullable=False)
    duration_in_seconds = db.Column(db.Float, nullable=False)
    billable_duration_in_seconds = db.Column(db.Integer, nullable=False)
    first_checkout_attempt_at = db.Column(db.DateTime(timezone=False), nullable=False)
    first_checkout_attempt_error = db.Column(db.String(100), nullable=True)
    first_checkout_attempt_error_details = db.Column(db.String(100), nullable=True)
    first_checkout_attempt_id = db.Column(db.Integer, nullable=False)
    first_checkout_attempt_state = db.Column(db.String(100), nullable=False)
    last_checkout_attempt_at = db.Column(db.DateTime(timezone=False), nullable=False)
    last_checkout_attempt_error = db.Column(db.String(100), nullable=True)
    last_checkout_attempt_error_details = db.Column(db.String(100), nullable=True)
    last_checkout_attempt_id = db.Column(db.Integer, nullable=False)
    last_checkout_attempt_state = db.Column(db.String(100), nullable=False)
    first_odometer_in_meters = db.Column(db.Integer, nullable=False)
    last_odometer_in_meters = db.Column(db.Integer, nullable=False)
    pause_duration_in_seconds = db.Column(db.Float, nullable=False)
    reservation_at = db.Column(db.DateTime(timezone=False), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('wecooltra_user.id'), nullable=False)
    participant = relationship(User.__name__)

    def serialize(self):
        return dict(
            id=self.id,
            start_point_lat=self.start_point_lat,
            start_point_lon=self.start_point_lon,
            end_point_lat=self.end_point_lat,
            end_point_lon=self.end_point_lon,
            started_at=self.started_at,
            ended_at=self.ended_at,
            system_name=self.system_name,
            vehicle_external_id=self.vehicle_external_id,
            duration_in_seconds=self.duration_in_seconds,
            billable_duration_in_seconds=self.billable_duration_in_seconds,
            first_checkout_attempt_at=self.first_checkout_attempt_at,
            first_checkout_attempt_error=self.first_checkout_attempt_error,
            first_checkout_attempt_error_details=self.first_checkout_attempt_error_details,
            first_checkout_attempt_id=self.first_checkout_attempt_id,
            first_checkout_attempt_state=self.first_checkout_attempt_state,
            last_checkout_attempt_at=self.last_checkout_attempt_at,
            last_checkout_attempt_error=self.last_checkout_attempt_error,
            last_checkout_attempt_error_details=self.last_checkout_attempt_error_details,
            last_checkout_attempt_id=self.last_checkout_attempt_id,
            last_checkout_attempt_state=self.last_checkout_attempt_state,
            first_odometer_in_meters=self.first_odometer_in_meters,
            last_odometer_in_meters=self.last_odometer_in_meters,
            pause_duration_in_seconds=self.pause_duration_in_seconds,
            reservation_at=self.reservation_at,
            user=self.user.serialize(),
        )
