from sqlalchemy import Column, Integer, String, Boolean, DateTime, create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql.sqltypes import Float
import datetime

##pip install PyMySQL SQLAlchemy flask-cors flask

# engine = create_engine('mariadb+pymysql://root:toor@localhost:3306/pfe')
engine = create_engine('mariadb+pymysql://root:@localhost:3306/pfe')

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
	depid = Column(Integer)
	cycle = Column(String(length=100))

class module(Base):
	__tablename__ = 'module'
	modid = Column(Integer, primary_key=True, autoincrement=True)
	nom = Column(String(length=100))
	speid = Column(Integer)
	depid = Column(Integer)
	fillid = Column(Integer)
	vhg = Column(Integer)
	hcour = Column(Integer)
	htp = Column(Integer)
	htd = Column(Integer)
	abbr = Column(String(length=100))
	semestre = Column(Integer)
	palid = Column(Integer)

class section(Base):
	__tablename__ = 'section'
	secid = Column(Integer, primary_key=True, autoincrement=True)
	nom = Column(String(length=100))
	speid = Column(Integer)
	depid = Column(Integer)
	capacite = Column(Integer)
	palid = Column(Integer)

class groupe(Base):
	__tablename__ = 'groupe'
	grpid = Column(Integer, primary_key=True, autoincrement=True)
	nom = Column(String(length=100))
	speid = Column(Integer)
	secid = Column(Integer)
	depid = Column(Integer)
	palid = Column(Integer)
	capacite = Column(Integer)

class palier(Base):
	__tablename__ = 'palier'
	palid = Column(Integer, primary_key=True, autoincrement=True)
	nom = Column(String(length=100))
	annee = Column(Integer)
	speid = Column(Integer)
	depid = Column(Integer)
	nbrsec = Column(Integer)
	nbrgrp = Column(Integer)

class veux(Base):
	__tablename__ = 'veux'
	veuxid = Column(Integer, primary_key=True, autoincrement=True)
	teacherid = Column(Integer)
	choix1 = Column(String(length=500))
	choix2 = Column(String(length=500))
	choix3 = Column(String(length=500))
	choix4 = Column(String(length=500))
	choix5 = Column(String(length=500))

class affectation(Base):
	__tablename__ = 'affectation'
	afecid = Column(Integer, primary_key=True, autoincrement=True)
	profid = Column(Integer)
	semestre = Column(String(length=100))
	section = Column(Integer)
	groupe = Column(Integer)
	depid = Column(Integer)
	module = Column(Integer)
	type = Column(String(length=100))
	tc = Column(Boolean)
	chef = Column(Boolean)

class edt(Base):
	__tablename__ = 'edt'
	edtid = Column(Integer, primary_key=True, autoincrement=True)
	profid = Column(Integer)
	semestre = Column(String(length=100))
	profname = Column(String(length=100))
	section = Column(Integer)
	groupe = Column(Integer)
	module = Column(Integer)
	day = Column(Integer)
	hour = Column(Integer)
	place = Column(Integer)
	affid = Column(Integer)
	depid = Column(Integer)
	gestid = Column(Integer)
	type = Column(String(length=100))
	tc = Column(Boolean)
	chef = Column(Boolean)

class formation_tranc_commun(Base):
	__tablename__ = 'formation_tranc_commun'
	ftcid = Column(Integer, primary_key=True, autoincrement=True)
	nom = Column(String(length=100))
	cycle = Column(String(length=100))
	dep1 = Column(Integer)
	dep2 = Column(Integer)
	dep3 = Column(Integer)

class section_tranc_commun(Base):
	__tablename__ = 'section_tranc_commun'
	secid = Column(Integer, primary_key=True, autoincrement=True)
	nom = Column(String(length=100))
	speid = Column(Integer)
	capacite = Column(Integer)
	palid = Column(Integer)
	dep1 = Column(Integer)
	dep2 = Column(Integer)
	dep3 = Column(Integer)

class groupe_tranc_commun(Base):
	__tablename__ = 'groupe_tranc_commun'
	grpid = Column(Integer, primary_key=True, autoincrement=True)
	nom = Column(String(length=100))
	speid = Column(Integer)
	secid = Column(Integer)
	capacite = Column(Integer)

class palier_tranc_commun(Base):
	__tablename__ = 'palier_tranc_commun'
	palid = Column(Integer, primary_key=True, autoincrement=True)
	nom = Column(String(length=100))
	annee = Column(Integer)
	speid = Column(Integer)
	nbrsec = Column(Integer)
	nbrgrp = Column(Integer)

class module_tranc_commun(Base):
	__tablename__ = 'module_tranc_commun'
	modid = Column(Integer, primary_key=True, autoincrement=True)
	nom = Column(String(length=100))
	speid = Column(Integer)
	dep1 = Column(Integer)
	dep2 = Column(Integer)
	dep3 = Column(Integer)
	vhg = Column(Integer)
	hcour = Column(Integer)
	htp = Column(Integer)
	htd = Column(Integer)
	abbr = Column(String(length=100))
	semestre = Column(Integer)
	palid = Column(Integer)

class gestdep(Base):
	__tablename__ = 'gestdep'
	id = Column(Integer, primary_key=True, autoincrement=True)
	depid = Column(Integer)
	gestid = Column(Integer)

class availability(Base):
	__tablename__ = 'availability'
	avaid = Column(Integer, primary_key=True, autoincrement=True)
	profid = Column(Integer)
	day = Column(Integer)
	hour = Column(Integer)


Base.metadata.create_all(engine) ##create tables if they don't exist
