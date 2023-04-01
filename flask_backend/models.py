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
	capacite = Column(Integer)
	type = Column(String(length=100))

class filiere(Base):
	__tablename__ = 'filiere'
	fillid = Column(Integer, primary_key=True, autoincrement=True)
	nom = Column(String(length=100))
	depid = Column(Integer)

class specialite(Base):
	__tablename__ = 'specialite'
	speid = Column(Integer, primary_key=True, autoincrement=True)
	nom = Column(String(length=100))
	fillid = Column(Integer)
	annee = Column(Integer)

class module(Base):
	__tablename__ = 'module'
	modid = Column(Integer, primary_key=True, autoincrement=True)
	nom = Column(String(length=100))
	speid = Column(Integer)
	fillid = Column(Integer)

class section(Base):
	__tablename__ = 'section'
	secid = Column(Integer, primary_key=True, autoincrement=True)
	nom = Column(String(length=100))
	speid = Column(Integer)
	capacite = Column(Integer)

class groupe(Base):
	__tablename__ = 'groupe'
	grpid = Column(Integer, primary_key=True, autoincrement=True)
	nom = Column(String(length=100))
	speid = Column(Integer)
	secid = Column(Integer)
	capacite = Column(Integer)

Base.metadata.create_all(engine) ##create tables if they don't exist