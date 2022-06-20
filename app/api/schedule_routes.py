from re import S
from flask import Blueprint, jsonify, request
from app.models import db, Schedule
from app.forms.create_schedule_form import CreateScheduleForm
from app.forms.update_schedule_form import UpdateScheduleForm

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

        new_schedule = Schedule(employee_id=employee_id,
                                Monday=Monday,
                                Tuesday=Tuesday,
                                Wednesday=Wednesday,
                                Thursday=Thursday,
                                Friday=Friday,
                                Saturday=Saturday,
                                Sunday=Sunday)

        db.session.add(new_schedule)
        db.session.commit()
        return new_schedule.to_dict()


@schedule_routes.route('/<int:id>/<int:hours>', methods=['PUT'])
def update_schedule_hours(id, hours):
    data = request.json

    schedule = Schedule.query.get_or_404(id)

    schedule.total_hours = hours

    db.session.commit()

    return schedule.to_dict()


@schedule_routes.route('/<int:id>', methods=['PUT'])
def update_schedule(id):
    data = request.json

    schedule = Schedule.query.get_or_404(id)

    form = UpdateScheduleForm()

    schedule.Monday = form.data['monday']
    schedule.Tuesday = form.data['tuesday']
    schedule.Wednesday = form.data['wednesday']
    schedule.Thursday = form.data['thursday']
    schedule.Friday = form.data['friday']
    schedule.Saturday = form.data['saturday']
    schedule.Sunday = form.data['sunday']

    db.session.commit()

    return schedule.to_dict()


