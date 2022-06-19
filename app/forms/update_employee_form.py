from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField, BooleanField
from wtforms.validators import DataRequired


class UpdateEmployeeForm(FlaskForm):
    name = StringField('name')
    email = StringField('email')
    hours = FloatField('hours')
    hourly_wages = FloatField('hourly_wages')
