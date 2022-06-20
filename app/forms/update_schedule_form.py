from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField, BooleanField
from wtforms.validators import DataRequired


class UpdateScheduleForm(FlaskForm):
    monday = StringField('monday', validators=[DataRequired()])
    tuesday = StringField('tuesday', validators=[DataRequired()])
    wednesday = StringField('wednesday', validators=[DataRequired()])
    thursday = StringField('thursday', validators=[DataRequired()])
    friday = StringField('friday', validators=[DataRequired()])
    saturday = StringField('saturday', validators=[DataRequired()])
    sunday = StringField('sunday', validators=[DataRequired()])

