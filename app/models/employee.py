from .db import db


class Employee(db.Model):
    __tablename__ = 'employees'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    email = db.Column(db.String(255))
    hours = db.Column(db.Float)
    hourly_wages = db.Column(db.Float)
    current_employee = db.Column(db.Boolean)

    schedules = db.relationship(
      'Schedule',
      back_populates='employees'
    )

    def to_dict(self):
        return {
          "id": self.id,
          "name": self.name,
          "email": self.email,
          "hours": self.hours,
          "hourly_wages": self.hourly_wages,
          "current_employee": self.current_employee
        }
