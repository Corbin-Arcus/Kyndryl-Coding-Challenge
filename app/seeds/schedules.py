from app.models import db, Schedule


def seed_schedules():
    s1 = Schedule(
      employee_id=1,
      Monday='9 to 5',
      Tuesday='9 to 5',
      Wednesday='9 to 5',
      Thursday='9 to 5',
      Friday='9 to 5',
      Saturday='--OFF--',
      Sunday='--OFF--'
    )

    db.session.add(s1)

    db.session.commit()


def undo_schedules():
    db.session.execute('TRUNCATE schedules RESTART IDENTITY CASCADE;')
    db.session.commit()
