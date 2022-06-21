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

        my_list = []
        my_list.append(Monday)
        my_list.append(Tuesday)
        my_list.append(Wednesday)
        my_list.append(Thursday)
        my_list.append(Friday)
        my_list.append(Saturday)
        my_list.append(Sunday)

        filtered_list = []
        for time in my_list:
            if 'OFF' not in time:
                filtered_list.append(time)
        hours = 0
        for times in filtered_list:
            times = times.split('-')
            num1 = int(times[0])
            num2 = int(times[1])
            if num2 < num1:
                num2 += 12
            hours += num2 - num1

        new_schedule = Schedule(employee_id=employee_id,
                                Monday=Monday,
                                Tuesday=Tuesday,
                                Wednesday=Wednesday,
                                Thursday=Thursday,
                                Friday=Friday,
                                Saturday=Saturday,
                                Sunday=Sunday,
                                total_hours=hours)

        db.session.add(new_schedule)
        db.session.commit()
        return new_schedule.to_dict()


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

    my_list = []
    my_list.append(form.data['monday'])
    my_list.append(form.data['tuesday'])
    my_list.append(form.data['wednesday'])
    my_list.append(form.data['thursday'])
    my_list.append(form.data['friday'])
    my_list.append(form.data['saturday'])
    my_list.append(form.data['sunday'])

    filtered_list = []
    for time in my_list:
        if 'OFF' not in time:
            filtered_list.append(time)
    hours = 0
    for times in filtered_list:
        times = times.split('-')
        num1 = int(times[0])
        num2 = int(times[1])
        if num2 < num1:
            num2 += 12
        hours += num2 - num1

    schedule.total_hours = hours

    db.session.commit()

    return schedule.to_dict()
