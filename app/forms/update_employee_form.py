from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField, BooleanField
from wtforms.validators import DataRequired


class UpdateEmployeeForm(FlaskForm):
    name = StringField('name')
    email = StringField('email')
    hourly_wages = FloatField('hourly_wages')
    current_employee = BooleanField('current_employee')
