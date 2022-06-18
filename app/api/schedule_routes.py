from re import S
from flask import Blueprint, jsonify, request
from app.models import db, Schedule
from app.forms.create_schedule_form import CreateScheduleForm

schedule_routes = Blueprint('schedules', __name__)


@schedule_routes.route('/all')
def schedules():
    schedules = Schedule.query.all()
    return{'schedules': [schedule.to_dict() for schedule in schedules]}


@schedule_routes.route('/', methods=['POST'])
def new_schedule():
    form = CreateScheduleForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        employee_id = form.data['employee_id']
        Monday = form.data['Monday']
        Tuesday = form.data['Tuesday']
        Wednesday = form.data['Wednesday']
        Thursday = form.data['Thursday']
        Friday = form.data['Friday']
        Saturday = form.data['Saturday']
        Sunday = form.data['Sunday']

        new_schedule = Schedule(employee_id=employee_id, Monday=Monday,
            Tuesday=Tuesday, Wednesday=Wednesday, Thursday=Thursday,
            Friday=Friday, Saturday=Saturday, Sunday=Sunday)

        db.session.add(new_schedule)
        db.session.commit()
        return new_schedule.to_dict()


