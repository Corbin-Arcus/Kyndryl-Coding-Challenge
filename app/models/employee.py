from app.models.employee_schedule import Employee_Schedules
from .db import db
from .employee_schedule import employee_schedules, Employee_Schedules


class Employee(db.Model):
    __tablename__ = 'employees'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    hours = db.Column(db.Float)
    current_employee = db.Column(db.Boolean)

    schedules = db.relationship(
      'Schedule',
      secondary=employee_schedules,
      back_populates='employees'
    )

    def to_dict(self):
        return {
          "id": self.id,
          "name": self.name,
          "email": self.email,
          "hours": self.hours,
          "current_employee": self.current_employee
        }
