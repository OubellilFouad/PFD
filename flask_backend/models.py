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
	nom = Column(String(length=100))
	domainid = Column(Integer)

class domain(Base):
	__tablename__ = 'domain'
	domainid = Column(Integer, primary_key=True, autoincrement=True)
	nom = Column(String(length=100))

class chambre(Base):
	__tablename__ = 'chambre'
	chambreid = Column(Integer, primary_key=True, autoincrement=True)
	nom = Column(String(length=100))
	depid = Column(Integer)
	salleid = Column(Integer)
	capacite = Column(Integer)
	type = Column(String(length=100))

Base.metadata.create_all(engine) ##create tables if they don't exist