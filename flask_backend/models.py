from sqlalchemy import Column, Integer, String, Boolean, DateTime, create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql.sqltypes import Float
import datetime

##pip install PyMySQL SQLAlchemy flask-cors flask

engine = create_engine('mariadb+pymysql://root:toor@localhost:3306/pfe')
##username:password@host:port/database
Base = declarative_base()

class dep(Base):
	__tablename__ = 'dep'
	depid = Column(Integer, primary_key=True, autoincrement=True)
	nom = Column(String(length=100), nullable=False, unique=True)
	domainid = Column(Integer, nullable=False)

class domain(Base):
	__tablename__ = 'domain'
	domainid = Column(Integer, primary_key=True, autoincrement=True)
	nom = Column(String(length=100), nullable=False, unique=True)

Base.metadata.create_all(engine) ##create tables if they don't exist