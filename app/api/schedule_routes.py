from flask import Blueprint, jsonify, request
from app.models import db, Schedule

schedule_routes = Blueprint('schedules', __name__)


@schedule_routes.route('/all')
def schedules():
    schedules = Schedule.query.all()
    return{'schedules': [schedule.to_dict() for schedule in schedules]}


