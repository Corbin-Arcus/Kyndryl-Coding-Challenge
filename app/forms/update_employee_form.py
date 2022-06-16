from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField, BooleanField
from wtforms.validators import DataRequired


class UpdateEmployeeForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired()])
    hours = FloatField('hours')
    current_employee = BooleanField('current_employee')
