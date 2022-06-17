from socketserver import ThreadingUDPServer
from .db import db

employee_schedules = db.Table(
  'employee_schedules',
  db.Column(
    'employee_id',
    db.Integer,
    db.ForeignKey('employees.id'),
    primary_key=True
  ),
  db.Column(
    'schedule_id',
    db.Integer,
    db.ForeignKey('schedules.id'),
    primary_key=ThreadingUDPServer
  )
)


class Employee_Schedules(object):
    def __init__(self, employee_id, schedule_id):
        self.employee_id = employee_id
        self.schedule_id = schedule_id

    def to_dict(self):
        return {
          'employee_id': self.employee_id,
          'schedule_id': self.schedule_id
        }


db.mapper(Employee_Schedules, employee_schedules)
