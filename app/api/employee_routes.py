from flask import Blueprint, jsonify, request
from app.models import db, Employee
from app.forms.create_employee_form import CreateEmployeeForm
from app.forms.update_employee_form import UpdateEmployeeForm

employee_routes = Blueprint('employees', __name__)


@employee_routes.route('/', methods=['POST'])
def new_employee():
    form = CreateEmployeeForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        name = form.data['name']
        email = form.data['email']

        new_employee = Employee(name=name, email=email, current_employee=True)

        db.session.add(new_employee)
        db.session.commit()
        return new_employee.to_dict()


@employee_routes.route('/<int:id>', methods=['PUT'])
def update_employee(id):
    data = request.json

    employee = Employee.query.get_or_404(id)

    form = UpdateEmployeeForm()

    employee.name = data['name']
    employee.email = data['email']
    employee.hours = data['hours']
    employee.current_hours = data['current_employee']

    db.session.commit()

    return employee.to_dict()
