from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class CreateScheduleForm(FlaskForm):
    employee_id = IntegerField('employee_id', validators=[DataRequired()])
    Monday = StringField('Monday', validators=[DataRequired()])
    Tuesday = StringField('Tuesday', validators=[DataRequired()])
    Wednesday = StringField('Wednesday', validators=[DataRequired()])
    Thursday = StringField('Thursday', validators=[DataRequired()])
    Friday = StringField('Friday', validators=[DataRequired()])
    Saturday = StringField('Saturday', validators=[DataRequired()])
    Sunday = StringField('Sunday', validators=[DataRequired()])

