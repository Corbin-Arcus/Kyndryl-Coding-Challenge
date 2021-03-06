from app.models import db, Employee


def seed_employees():
    corbin = Employee(
      name='Corbin Arcus',
      email='fake@fake.com',
      hours=0,
      hourly_wages=40.0,
      current_employee=True)
    josephine = Employee(
      name='Josephine Arcus',
      email='fake1@fake.com',
      hours=0,
      hourly_wages=25.5,
      current_employee=True)

    db.session.add(corbin)
    db.session.add(josephine)

    db.session.commit()


def undo_employees():
    db.session.execute('TRUNCATE employees RESTART IDENTITY CASCADE;')
    db.session.commit()

