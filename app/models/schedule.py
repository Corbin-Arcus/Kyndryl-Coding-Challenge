from sqlalchemy import ForeignKey
from .db import db


class Schedule(db.Model):
    __tablename__ = 'schedules'

    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'))
    Monday = db.Column(db.String)
    Tuesday = db.Column(db.String)
    Wednesday = db.Column(db.String)
    Thursday = db.Column(db.String)
    Friday = db.Column(db.String)
    Saturday = db.Column(db.String)
    Sunday = db.Column(db.String)
    total_hours = db.Column(db.Float)

    employees = db.relationship(
      'Employee',
      back_populates='schedules'
    )

    def to_dict(self):
        return {
          "id": self.id,
          "employee_id": self.employee_id,
          "Monday": self.Monday,
          "Tuesday": self.Tuesday,
          "Wednesday": self.Wednesday,
          "Thursday": self.Thursday,
          "Friday": self.Friday,
          "Saturday": self.Saturday,
          "Sunday": self.Sunday,
          "total_hours": self.total_hours
        }
