from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField, BooleanField
from wtforms.validators import DataRequired


class UpdateEmployeeForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired()])
    hours = FloatField('hours')
    current_employee = BooleanField('current_employee')
    works_monday = BooleanField('works_monday')
    works_tuesday = BooleanField('works_tuesday')
    works_wednesday = BooleanField('works_wednesday')
    works_thursday = BooleanField('works_thursday')
    works_friday = BooleanField('works_friday')
    works_saturday = BooleanField('works_saturday')
    works_sunday = BooleanField('works_sunday')
