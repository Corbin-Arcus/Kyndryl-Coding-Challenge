from sqlalchemy import ForeignKey
from .db import db
from .employee_schedule import employee_schedules, Employee_Schedules


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

    employees = db.relationship(
      'Employee',
      secondary=employee_schedules,
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
          "Sunday": self.Sunday
        }