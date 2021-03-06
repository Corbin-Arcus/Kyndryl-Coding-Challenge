"""empty message

Revision ID: 91f36c06e8f9
Revises: ef3447fcc91e
Create Date: 2022-06-18 14:04:05.203596

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '91f36c06e8f9'
down_revision = 'ef3447fcc91e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('employees', sa.Column('hourly_wages', sa.Float(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('employees', 'hourly_wages')
    # ### end Alembic commands ###
