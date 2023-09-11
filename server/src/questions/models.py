from sqlalchemy import TIMESTAMP, Boolean, DateTime, ForeignKey, MetaData, Table, Column, Integer, String, JSON, Float
from datetime import datetime

metadata = MetaData()


Surveys = Table(
    'survey',
    metadata,
    Column('id_survey_', Integer, primary_key=True),
    Column('questions', String),
    Column('is_closed', Boolean, default=False)
)
Answers = Table(
    'answer', 
    metadata, 
    Column('id_answer', Integer, primary_key=True),
    Column('answer', String),
    Column('id_survey', ForeignKey(Surveys.c.id_survey_)),
)
# regions = Table(
#     'regions',
#     metadata,
#     Column('id_region', Integer, primary_key=True),
#     Column('Latitude', Float),
#     Column('Longitude', Float),
#     Column('name', String)
# )

# ip_camers = Table(
#     'ip_camers',
#     metadata,
#     Column('id', Integer, primary_key = True),
#     Column('Latitude', Float),
#     Column('Longitude', Float),
#     Column('directions', String),
#     Column('description', String),
#     Column('region', ForeignKey(regions.c.id_region))
# )

# type_trains = Table(
#     'type_train',
#     metadata,
#     Column('id', Integer, primary_key = True),
#     Column('type', Integer),
#     Column('description', String),
    
# )

# trains = Table(
#     'trains',
#     metadata,
#     Column('id', Integer, primary_key = True),
#     Column('ip_camers', Integer, ForeignKey(ip_camers.c.id)),
#     Column('type', Integer, ForeignKey(type_trains.c.id)),
#     Column('date', TIMESTAMP, default = datetime.utcnow()),
#     Column('file_dir', String),
# )





# raw_data = Table(
#     'raw_data',
#     metadata,
#     Column('id_data', Integer, primary_key=True),
#     Column('country', String),
#     Column('category', String),
#     Column('name', String),
#     Column('brand', String),
#     Column('price', String),
#     Column('created_at', DateTime, default=datetime.datetime.now),
#     Column('update_at', DateTime, default=datetime.datetime.now),
#     Column('specifications', JSON),
#     Column('url', String),
#     Column('img_href', String),
#     Column('net_href', String),
# )

# log_changes = Table(
#     'log_changes',
#     metadata,
#     Column('id_changes', Integer, primary_key=True),
#     Column('dite_changes',DateTime, default=datetime.datetime.now),
#     Column('log_change',String)
# )