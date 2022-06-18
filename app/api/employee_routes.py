from flask import Blueprint, jsonify, request
from app.models import db, Employee
from app.forms.create_employee_form import CreateEmployeeForm
from app.forms.update_employee_form import UpdateEmployeeForm

employee_routes = Blueprint('employees', __name__)


@employee_routes.route('/all')
def employees():
    employees = Employee.query.all()
    return{'employees': [employee.to_dict() for employee in employees]}


@employee_routes.route('/', methods=['POST'])
def new_employee():
    form = CreateEmployeeForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        name = form.data['name']
        email = form.data['email']
        hourly_wages = form.data['hourly_wages']

        new_employee = Employee(name=name, email=email, hourly_wages=hourly_wages, current_employee=True)

        db.session.add(new_employee)
        db.session.commit()
        return new_employee.to_dict()


@employee_routes.route('/<int:id>', methods=['PATCH'])
def update_employee(id):
    data = request.json

    employee = Employee.query.get_or_404(id)

    form = UpdateEmployeeForm()

    employee.name = data['name']
    employee.email = data['email']
    employee.hours = data['hours']
    employee.current_hours = data['current_employee']
    employee.works_monday = data['works_monday']
    employee.works_tuesday = data['works_tuesday']
    employee.works_wednesday = data['works_wednesday']
    employee.works_thursday = data['works_thursday']
    employee.works_friday = data['works_friday']
    employee.works_saturday = data['works_saturday']
    employee.works_sunday = data['works_sunday']

    db.session.commit()

    return employee.to_dict()
