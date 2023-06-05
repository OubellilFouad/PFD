from flask import request, Flask, jsonify
from flask_cors import CORS
import models as db
from utils import *

app = Flask(__name__)
app.url_map.strict_slashes = False
CORS(app)

def delete_empty_values(d):
	return {k: v for k, v in d.items() if v != ""}

@app.route("/")
def index():
	return """
documentation:<br><br>

/dep -> POST(nom,domainid)<br>
/dep/int:depid -> GET, DELETE, PUT(nom,domainid)<br>
/deps -> GET

<br><br>

/domain -> POST(nom)<br>
/domain/int:domainid -> GET, DELETE, PUT(nom)<br>
/domains -> GET<br>

<br><br>

/chambre -> POST(nom,capacite,type)<br>
/chambre/int:chambreid -> GET, DELETE, PUT(nom,capacite,type)<br>
/chambres -> GET<br>

<br><br>

/filiere -> POST(nom,depid)<br>
/filiere/int:fillid -> GET, DELETE, PUT(nom,depid)<br>
/filieres -> GET<br>
/filieres/int:depid -> GET, DELETE(all filiere by depid)

<br><br>

/specialite -> POST(nom,fillid,cycle,depid)<br>
/specialite/int:speid -> GET, DELETE, PUT(nom,fillid,cycle,depid)<br>
/specialites -> GET<br>
/specialites/int:depid -> GET, DELETE(all specialities by depid)

<br><br>

/module -> POST(nom,speid,fillid,depid,vhg,hcour,htp,htd,abbr,semestre,palid)<br>
/module/int:modid -> GET, DELETE, PUT(nom,speid,fillid,depid,vhg,hcour,htp,htd,abbr,semestre,palid)<br>
/modules -> GET<br>
/modules/type/int:id -> DELETE(all modules by depid, all modules by speid, all modules by palid) type:["spe", "dep", "pal"] <br>
/modules/dep_or_pal/int:id -> GET

<br><br>

/section -> POST(nom,speid,capacite,depid,palid)<br>
/section/int:secid -> GET, DELETE, PUT(nom,speid,capacite,depid,palid)<br>
/sections -> GET<br>
/sections/type/int:id -> DELETE(all sections by depid, all sections by speid, , all sections by palid) type:["spe", "pal", "dep"] <br>
/sections/dep_or_spe_or_pal/int:id -> GET

<br><br>

/groupe -> POST(nom,speid,secid,capacite,depid,palid)<br>
/groupe/int:grpid -> GET, DELETE, PUT(nom,speid,secid,capacite,depid,palid)<br>
/groupes -> GET<br>
/groupes/type/int:id -> DELETE(all groups by depid, all groups by secid) type:["sec", "dep", "spe", "pal"] <br>
/groupes/dep_or_sec/int:id -> GET -> example: /groupes/dep/5 ; /groupes/sec/4<br>

<br><br>

/palier -> POST(nom,speid,depid,annee,nbrsec,nbrgrp)<br>
/palier/int:palid -> GET, DELETE, PUT(nom,speid,depid,annee,nbrsec,nbrgrp)<br>
/paliers -> GET<br>
/paliers/type/int:id -> DELETE(all pals by depid, all pals by speid) type:["spe", "dep"] <br>
/paliers/int:speid -> GET<br>

<br><br>

/veux -> POST(teacherid,choix1,choix2,choix3,choix4,choix5)<br>
/veux/int:veuxid -> GET, DELETE, PUT(teacherid,choix1,choix2,choix3,choix4,choix5)<br>
/veuxs -> GET<br>
/veuxs/int:teacherid -> GET, DELETE(all veux by teacherid)<br>

<br><br>

/affectation -> POST(profid, depid,semestre,section,groupe,module,type,tc,chef)<br>
/affectation/int:afecid -> GET, DELETE, PUT(profid, depid,semestre,section,groupe,module,type,tc,chef)<br>
/affectations -> GET<br>
/affectations/type/int:id -> DELETE(all aff by depid, all affectations by profid, all aff by modid, all aff by grpid, all aff by secid) type:["mod", "dep", "sec", "grp", "prof"] <br>
/affectations/sec_or_grp_or_prof/int:id -> GET<br>

<br><br>

/edt -> POST(profid,profname,affid,gestid,depid,semestre,section,groupe,module,type,day,hour,place,tc,chef)<br>
/edt/int:edtid -> GET, DELETE, PUT(profid,profname,affid,gestid,semestre,section,depid,groupe,module,type,day,hour,place,tc,chef)<br>
/edts -> GET<br>
/edts/type/int:id -> DELETE(all edts by depid, all edts by modid, all edts by grpid, all edts by secid, all edts by affid, all edts by profid, all edts by place) type:["mod", "dep", "sec", "grp", "aff", "prof", "place"] <br>
/edts/sec_or_grp_or_prof_or_gestid/int:id -> GET<br>

<br><br>

/sectiontc -> POST(nom,speid,capacite,palid,dep1,dep2,dep3)<br>
/sectiontc/int:secid -> GET, DELETE, PUT(nom,speid,capacite,palid,dep1,dep2,dep3)<br>
/sectionstc -> GET<br>
/sectionstc/dep_or_spe_or_pal/int:id -> GET

<br><br>

/groupetc -> POST(nom,speid,secid,capacite)<br>
/groupetc/int:grpid -> GET, DELETE, PUT(nom,speid,secid,capacite)<br>
/groupestc -> GET<br>
/groupestc/int:secid -> GET, DELETE(all grptc by sectcid)<br>

<br><br>

/paliertc -> POST(nom,speid,annee,nbrsec,nbrgrp)<br>
/paliertc/int:palid -> GET, DELETE, PUT(nom,speid,annee,nbrsec,nbrgrp)<br>
/palierstc -> GET<br>
/palierstc/int:speid -> GET, DELETE(all Paltc by speid)<br>

<br><br>

/formationtc -> POST(nom,cycle,dep1,dep2,dep3)<br>
/formationtc/int:ftcid -> GET, DELETE, PUT(nom,cycle,dep1,dep2,dep3)<br>
/formationstc -> GET<br>
/formationstc/int:depid -> GET<br>

<br><br>

/gestdep -> POST(depid,gestid)<br>
/gestdep/int:id -> GET, DELETE, PUT(depid,gestid)<br>
/gestdeps -> GET<br>
/gestdeps/int:gestid -> GET<br>
/gestdeps/type/int:id -> DELETE(all gestdeps by depid, all gestdeps by gestid) type:["gestid", "dep"]

<br><br>

/moduletc -> POST(nom,speid,dep1,dep2,dep3,vhg,hcour,htp,htd,abbr,semestre,palid)<br>
/moduletc/int:modid -> GET, DELETE, PUT(nom,speid,dep1,dep2,dep3,vhg,hcour,htp,htd,abbr,semestre,palid)<br>
/modulestc -> GET<br>
/modulestc/<ftcid> -> DELETE(all Modtc by ftcid)<br>
/modulestc/dep_or_pal/int:id -> GET<br>

<br><br>

/availability -> POST(profid,day,hour)<br>
/availability/int:avaid -> GET, DELETE, PUT(profid,day,hour)<br>
/availabilitys -> GET<br>
/availabilitys/int:profid -> GET<br>

<br><br>
"""

##DEP

@app.route('/dep/<int:depid>', methods=['POST', 'GET', 'DELETE', 'PUT'])
@app.route('/dep', methods=['POST', 'GET', 'DELETE', 'PUT'])
def dep(depid=None):
	with db.engine.connect() as conn:

		if request.method == 'GET':
			if depid is None:
				return jsonify({"message": "depid required in GET request.", "route":"/dep/<int:depid>"})

			instance = get_or_none(conn, db.dep, depid=depid)
			if instance:
				return jsonify(instance)
			else:
				return jsonify({"message": "instance not found"})

		if request.method == 'POST':
			data = request.get_json()
			if not 'nom' in data or not 'domainid' in data:
				return jsonify({"message": "'nom' and 'domainid' are required"})

			nom = data['nom']
			domainid = data['domainid']

			instance = get_or_create(conn, db.dep, nom=nom, domainid=domainid)
			return jsonify(instance)

		if request.method == 'DELETE':
			if depid is None:
				return jsonify({"message": "depid required in DELETE request.", "route":"/dep/<int:depid>"})

			delete(conn, db.dep, depid=depid)
			return jsonify({"message":"success"})

		if request.method == 'PUT':
			if depid is None:
				return jsonify({"message": "depid required in PUT request.", "route":"/dep/<int:depid>"})

			data = delete_empty_values(request.get_json())
			if sum(['nom' in data, 'domainid' in data]) == 0:
				return jsonify({"message": "at least one of :'nom', 'domainid' are required"})

			data["depid"] = depid
			instance = update(conn, db.dep, data)

			return jsonify(instance)

@app.route('/deps', methods=['GET'])
def deps():
	with db.engine.connect() as conn:
		instances = get_all(conn, db.dep)
		return jsonify(instances)

###DOMAIN

@app.route('/domain/<int:domainid>', methods=['POST', 'GET', 'DELETE', 'PUT'])
@app.route('/domain', methods=['POST', 'GET', 'DELETE', 'PUT'])
def domain(domainid=None):
	with db.engine.connect() as conn:

		if request.method == 'GET':
			if domainid is None:
				return jsonify({"message": "domainid required in GET request.", "route":"/domain/<int:domainid>"})

			instance = get_or_none(conn, db.domain, domainid=domainid)
			if instance:
				return jsonify(instance)
			else:
				return jsonify({"message": "instance not found"})

		if request.method == 'POST':
			data = request.get_json()
			if not 'nom' in data:
				return jsonify({"message": "'nom' is required"})
			nom = data['nom']
			instance = get_or_create(conn, db.domain, nom=nom)
			return jsonify(instance)

		if request.method == 'DELETE':
			if domainid is None:
				return jsonify({"message": "domainid required in DELETE request.", "route":"/domain/<int:domainid>"})

			delete(conn, db.domain, domainid=domainid)

			return jsonify({"message":"success"})

		if request.method == 'PUT':
			if domainid is None:
				return jsonify({"message": "domainid required in PUT request.", "route":"/domain/<int:domainid>"})

			data = delete_empty_values(request.get_json())
			if not 'nom' in data:
				return jsonify({"message": "'nom' is required"})

			data["domainid"] = domainid
			instance = update(conn, db.domain, data)

			return jsonify(instance)

@app.route('/domains', methods=['GET'])
def domains():
	with db.engine.connect() as conn:
		instances = get_all(conn, db.domain)
		return jsonify(instances)

###CHAMBRE

@app.route('/chambre/<int:chambreid>', methods=['POST', 'GET', 'DELETE', 'PUT'])
@app.route('/chambre', methods=['POST', 'GET', 'DELETE', 'PUT'])
def chambre(chambreid=None):
	with db.engine.connect() as conn:

		if request.method == 'GET':
			if chambreid is None:
				return jsonify({"message": "chambreid required in GET request.", "route":"/chambre/<int:chambreid>"})

			instance = get_or_none(conn, db.chambre, chambreid=chambreid)
			if instance:
				return jsonify(instance)
			else:
				return jsonify({"message": "instance not found"})

		if request.method == 'POST':
			data = request.get_json()
			if not 'nom' in data or not 'capacite' in data or not 'type' in data:
				return jsonify({"message": "'nom', 'capacite', 'type' are required"})
			nom = data['nom']
			capacite = data['capacite']
			type = data['type']

			instance = get_or_create(conn, db.chambre, nom=nom, capacite=capacite, type=type)
			return jsonify(instance)

		if request.method == 'DELETE':
			if chambreid is None:
				return jsonify({"message": "chambreid required in DELETE request.", "route":"/chambre/<int:chambreid>"})

			delete(conn, db.chambre, chambreid=chambreid)

			return jsonify({"message":"success"})

		if request.method == 'PUT':
			if chambreid is None:
				return jsonify({"message": "chambreid required in PUT request.", "route":"/chambre/<int:chambreid>"})

			data = delete_empty_values(request.get_json())
			if sum(['nom' in data, 'capacite' in data, 'type' in data]) == 0:
				return jsonify({"message": "at least one of: 'nom', 'capacite', 'type' are required"})

			data["chambreid"] = chambreid
			instance = update(conn, db.chambre, data)

			return jsonify(instance)

@app.route('/chambres', methods=['GET'])
def chambres():
	with db.engine.connect() as conn:
		instances = get_all(conn, db.chambre)
		return jsonify(instances)

##Filiere

@app.route('/filiere/<int:fillid>', methods=['POST', 'GET', 'DELETE', 'PUT'])
@app.route('/filiere', methods=['POST', 'GET', 'DELETE', 'PUT'])
def filiere(fillid=None):
	with db.engine.connect() as conn:

		if request.method == 'GET':
			if fillid is None:
				return jsonify({"message": "fillid required in GET request.", "route":"/filiere/<int:fillid>"})

			instance = get_or_none(conn, db.filiere, fillid=fillid)
			if instance:
				return jsonify(instance)
			else:
				return jsonify({"message": "instance not found"})

		if request.method == 'POST':
			data = request.get_json()
			if not 'nom' in data or not 'depid' in data:
				return jsonify({"message": "'nom' and 'depid' are required"})

			nom = data['nom']
			depid = data['depid']

			instance = get_or_create(conn, db.filiere, nom=nom, depid=depid)
			return jsonify(instance)

		if request.method == 'DELETE':
			if fillid is None:
				return jsonify({"message": "fillid required in DELETE request.", "route":"/filiere/<int:fillid>"})

			delete(conn, db.filiere, fillid=fillid)
			return jsonify({"message":"success"})

		if request.method == 'PUT':
			if fillid is None:
				return jsonify({"message": "fillid required in PUT request.", "route":"/filiere/<int:fillid>"})

			data = delete_empty_values(request.get_json())
			if sum(['nom' in data, 'depid' in data]) == 0:
				return jsonify({"message": "at least one of :'nom', 'depid' are required"})

			data["fillid"] = fillid
			instance = update(conn, db.filiere, data)

			return jsonify(instance)

@app.route('/filieres/<int:id>', methods=['GET', 'DELETE'])
@app.route('/filieres', methods=['GET'])
def filieres(id=None):
	if request.method == "DELETE" and id is None:
		return jsonify({"message": "'depid' required in DELETE request", "route":"/filieres/<int:depid>"})
	with db.engine.connect() as conn:
		if request.method == "DELETE":
			delete(conn, db.filiere, depid=id)
			return jsonify({"message":"success"})
		if id is not None:
			instances = get_all(conn, db.filiere, depid=id)
		else:
			instances = get_all(conn, db.filiere)
		return jsonify(instances)

##SPECIALITE

@app.route('/specialite/<int:speid>', methods=['POST', 'GET', 'DELETE', 'PUT'])
@app.route('/specialite', methods=['POST', 'GET', 'DELETE', 'PUT'])
def specialite(speid=None):
	with db.engine.connect() as conn:

		if request.method == 'GET':
			if speid is None:
				return jsonify({"message": "speid required in GET request.", "route":"/specialite/<int:speid>"})

			instance = get_or_none(conn, db.specialite, speid=speid)
			if instance:
				return jsonify(instance)
			else:
				return jsonify({"message": "instance not found"})

		if request.method == 'POST':
			data = request.get_json()
			if not 'nom' in data or not 'fillid' in data or not 'cycle' in data or not 'depid' in data:
				return jsonify({"message": "'nom' and 'fillid' and 'cycle' and 'depid' are required"})

			nom = data['nom']
			fillid = data['fillid']
			depid = data['depid']
			cycle = data['cycle']

			instance = get_or_create(conn, db.specialite, nom=nom, fillid=fillid, depid=depid, cycle=cycle)
			return jsonify(instance)

		if request.method == 'DELETE':
			if speid is None:
				return jsonify({"message": "speid required in DELETE request.", "route":"/specialite/<int:speid>"})

			delete(conn, db.specialite, speid=speid)
			return jsonify({"message":"success"})

		if request.method == 'PUT':
			if speid is None:
				return jsonify({"message": "speid required in PUT request.", "route":"/specialite/<int:speid>"})

			data = delete_empty_values(request.get_json())
			if sum(['nom' in data, 'fillid' in data, 'cycle' in data, 'depid' in data]) == 0:
				return jsonify({"message": "at least one of :'nom', 'fillid', 'cycle', 'depid' are required"})

			data["speid"] = speid
			instance = update(conn, db.specialite, data)

			return jsonify(instance)

@app.route('/specialites/<int:id>', methods=['GET', 'DELETE'])
@app.route('/specialites', methods=['GET'])
def specialites(id=None):
	if request.method == "DELETE" and id is None:
		return jsonify({"message": "'depid' required in DELETE request.", "route":"/specialites/<int:depid>"})
	with db.engine.connect() as conn:
		if id is not None:
			if request.method == "GET":
				instances = get_all(conn, db.specialite, depid=id)
				return jsonify(instances)
			else:
				delete(conn, db.specialite, depid=id)
				return jsonify({"message":"success"})
		else:
			instances = get_all(conn, db.specialite)
			return jsonify(instances)

##MODULE

@app.route('/module/<int:modid>', methods=['POST', 'GET', 'DELETE', 'PUT'])
@app.route('/module', methods=['POST', 'GET', 'DELETE', 'PUT'])
def module(modid=None):
	with db.engine.connect() as conn:

		if request.method == 'GET':
			if modid is None:
				return jsonify({"message": "modid required in GET request.", "route":"/module/<int:modid>"})

			instance = get_or_none(conn, db.module, modid=modid)
			if instance:
				return jsonify(instance)
			else:
				return jsonify({"message": "instance not found"})

		if request.method == 'POST':
			data = request.get_json()
			if not 'nom' in data or not 'speid' in data or not 'fillid' in data or not 'depid' in data or not 'vhg' in data or not 'hcour' in data or not 'htp' in data or not 'htd' in data or not 'abbr' in data or not 'semestre' in data or not 'palid' in data:
				return jsonify({"message": "'nom' and 'speid' and 'fillid' and 'depid' and 'vhg' and 'hcour' and 'htp' and 'htd' and 'abbr' and 'semestre' and 'palid' are required"})

			nom = data['nom']
			speid = data['speid']
			fillid = data['fillid']
			depid = data['depid']
			vhg = data['vhg']
			hcour = data['hcour']
			htp = data['htp']
			htd = data['htd']
			abbr = data['abbr']
			semestre = data['semestre']
			palid = data['palid']

			instance = get_or_create(conn, db.module, nom=nom, speid=speid, fillid=fillid, depid=depid, vhg=vhg, hcour=hcour, htp=htp, htd=htd, abbr=abbr, semestre=semestre, palid=palid)
			return jsonify(instance)

		if request.method == 'DELETE':
			if modid is None:
				return jsonify({"message": "modid required in DELETE request.", "route":"/module/<int:modid>"})

			delete(conn, db.module, modid=modid)
			return jsonify({"message":"success"})

		if request.method == 'PUT':
			if modid is None:
				return jsonify({"message": "modid required in PUT request.", "route":"/module/<int:modid>"})

			data = delete_empty_values(request.get_json())
			if sum(['nom' in data, 'speid' in data, 'fillid' in data, 'depid' in data, 'vhg' in data, 'hcour' in data, 'htp' in data, 'htd' in data, 'abbr' in data, 'semestre' in data, 'palid' in data]) == 0:
				return jsonify({"message": "at least one of :'nom', 'speid', 'fillid', 'depid', 'vhg', 'hcour', 'htp', 'htd', 'abbr', 'semestre', 'palid' are required"})

			data["modid"] = modid
			instance = update(conn, db.module, data)

			return jsonify(instance)

@app.route('/modules/<dep_or_pal>/<int:id>', methods=['GET'])
@app.route('/modules/<type>/<int:id>', methods=['DELETE'])
@app.route('/modules', methods=['GET'])
def modules(dep_or_pal=None, id=None, type=None):
	if request.method == "DELETE" and (id is None or type is None or not type in ["dep", "spe", "pal"] ) :
		return jsonify({"message": "'id' and 'type' are required in DELETE request. type can be: 'dep' or 'spe' or 'pal'.", "route":"/modules/<type>/<int:id>"})
	with db.engine.connect() as conn:
		if request.method == "DELETE":
			if type == "dep":
				delete(conn, db.module, depid=id)
			if type == "pal":
				delete(conn, db.module, palid=id)
			else:
				delete(conn, db.module, speid=id)	
			return jsonify({"message":"success"})
		if id is not None and dep_or_pal in ["dep", "pal"]:
			if dep_or_pal == "pal":
				instances = get_all(conn, db.module, palid=id)
			elif dep_or_pal == "dep":
				instances = get_all(conn, db.module, depid=id)
		else:
			instances = get_all(conn, db.module)
		return jsonify(instances)

##SECTION

@app.route('/section/<int:secid>', methods=['POST', 'GET', 'DELETE', 'PUT'])
@app.route('/section', methods=['POST', 'GET', 'DELETE', 'PUT'])
def section(secid=None):
	with db.engine.connect() as conn:

		if request.method == 'GET':
			if secid is None:
				return jsonify({"message": "secid required in GET request.", "route":"/section/<int:secid>"})

			instance = get_or_none(conn, db.section, secid=secid)
			if instance:
				return jsonify(instance)
			else:
				return jsonify({"message": "instance not found"})

		if request.method == 'POST':
			data = request.get_json()
			if not 'nom' in data or not 'speid' in data or not 'capacite' in data or not 'depid' in data or not 'palid' in data:
				return jsonify({"message": "'nom' and 'speid' and 'capacite' and 'depid' and 'palid' are required"})

			nom = data['nom']
			speid = data['speid']
			capacite = data['capacite']
			depid = data['depid']
			palid = data['palid']

			instance = get_or_create(conn, db.section, nom=nom, speid=speid, depid=depid, capacite=capacite, palid=palid)
			return jsonify(instance)

		if request.method == 'DELETE':
			if secid is None:
				return jsonify({"message": "secid required in DELETE request.", "route":"/section/<int:secid>"})

			delete(conn, db.section, secid=secid)
			return jsonify({"message":"success"})

		if request.method == 'PUT':
			if secid is None:
				return jsonify({"message": "secid required in PUT request.", "route":"/section/<int:secid>"})

			data = delete_empty_values(request.get_json())
			if sum(['nom' in data, 'palid' in data, 'speid' in data, 'depid' in data, 'capacite' in data]) == 0:
				return jsonify({"message": "at least one of :'nom', 'palid', 'speid', 'depid', 'capacite' are required"})

			data["secid"] = secid
			instance = update(conn, db.section, data)

			return jsonify(instance)


@app.route('/sections/<dep_or_spe>/<int:id>', methods=['GET'])
@app.route('/sections/<type>/<int:id>', methods=['DELETE'])
@app.route('/sections', methods=['GET'])
def sections(dep_or_spe=None, id=None, type=None):
	if request.method == "DELETE" and (id is None or type is None or not type in ["dep", "spe", "pal"] ) :
		return jsonify({"message": "'id' and 'type' are required in DELETE request. type can be: 'dep' or 'spe' or 'pal'.", "route":"/sections/<type>/<int:id>"})
	with db.engine.connect() as conn:
		if request.method == "DELETE":
			if type == "dep":
				delete(conn, db.groupe, depid=id)
			if type == "spe":
				delete(conn, db.groupe, speid=id)
			else:
				delete(conn, db.groupe, palid=id)	
			return jsonify({"message":"success"})
			
		if id is not None and dep_or_spe in ["dep", "spe", "pal"]:
			if dep_or_spe == "spe":
				instances = get_all(conn, db.section, speid=id)
			if dep_or_spe == "dep":
				instances = get_all(conn, db.section, depid=id)
			if dep_or_spe == "pal":
				instances = get_all(conn, db.section, palid=id)
		else:
			instances = get_all(conn, db.section)
		return jsonify(instances)

##GROUPE

@app.route('/groupe/<int:grpid>', methods=['POST', 'GET', 'DELETE', 'PUT'])
@app.route('/groupe', methods=['POST', 'GET', 'DELETE', 'PUT'])
def groupe(grpid=None):
	with db.engine.connect() as conn:

		if request.method == 'GET':
			if grpid is None:
				return jsonify({"message": "grpid required in GET request.", "route":"/groupe/<int:grpid>"})

			instance = get_or_none(conn, db.groupe, grpid=grpid)
			if instance:
				return jsonify(instance)
			else:
				return jsonify({"message": "instance not found"})

		if request.method == 'POST':
			data = request.get_json()
			if not 'nom' in data or not 'speid' in data or not 'palid' in data or not 'depid' in data or not 'capacite' in data or not 'secid' in data:
				return jsonify({"message": "'nom' and 'speid' and 'depid' and 'secid' and 'palid' and 'capacite' are required"})

			nom = data['nom']
			speid = data['speid']
			secid = data['secid']
			depid = data['depid']
			palid = data['palid']
			capacite = data['capacite']

			instance = get_or_create(conn, db.groupe, palid=palid, nom=nom, speid=speid, depid=depid, secid=secid, capacite=capacite)
			return jsonify(instance)

		if request.method == 'DELETE':
			if grpid is None:
				return jsonify({"message": "grpid required in DELETE request.", "route":"/groupe/<int:grpid>"})

			delete(conn, db.groupe, grpid=grpid)
			return jsonify({"message":"success"})

		if request.method == 'PUT':
			if grpid is None:
				return jsonify({"message": "grpid required in PUT request.", "route":"/groupe/<int:grpid>"})

			data = delete_empty_values(request.get_json())
			if sum(['nom' in data, 'speid' in data, 'palid' in data, 'depid' in data, 'secid' in data, 'capacite' in data]) == 0:
				return jsonify({"message": "at least one of :'nom', 'speid', 'depid', 'secid', 'capacite', 'palid' are required"})

			data["grpid"] = grpid
			instance = update(conn, db.groupe, data)

			return jsonify(instance)

@app.route('/groupes/<dep_or_sec>/<int:id>', methods=['GET'])
@app.route('/groupes/<type>/<int:id>', methods=['DELETE'])
@app.route('/groupes', methods=['GET'])
def groupes(dep_or_sec=None, id=None, type=None):
	if request.method == "DELETE" and (id is None or type is None or not type in ["dep", "sec", "spe", "pal"] ) :
		return jsonify({"message": "'id' and 'type' are required in DELETE request. type can be: 'dep' or 'sec' or 'spe' or 'pal'.", "route":"/groupes/<type>/<int:id>"})
	with db.engine.connect() as conn:
		if request.method == "DELETE":
			if type == "dep":
				delete(conn, db.groupe, depid=id)
			if type == "spe":
				delete(conn, db.groupe, speid=id)
			if type == "pal":
				delete(conn, db.groupe, palid=id)
			else:
				delete(conn, db.groupe, secid=id)	
			return jsonify({"message":"success"})
		if id is not None and dep_or_sec in ["dep", "sec"]:
			if dep_or_sec == "sec":
				instances = get_all(conn, db.groupe, secid=id)
			elif dep_or_sec == "dep":
				instances = get_all(conn, db.groupe, depid=id)
		else:
			instances = get_all(conn, db.groupe)
		return jsonify(instances)

##PALIER

@app.route('/palier/<int:palid>', methods=['POST', 'GET', 'DELETE', 'PUT'])
@app.route('/palier', methods=['POST', 'GET', 'DELETE', 'PUT'])
def palier(palid=None):
	with db.engine.connect() as conn:

		if request.method == 'GET':
			if palid is None:
				return jsonify({"message": "palid required in GET request.", "route":"/palier/<int:palid>"})

			instance = get_or_none(conn, db.palier, palid=palid)
			if instance:
				return jsonify(instance)
			else:
				return jsonify({"message": "instance not found"})

		if request.method == 'POST':
			data = request.get_json()
			if not 'nom' in data or not 'speid' in data or not 'annee' in data or not 'nbrsec' in data or not 'nbrgrp' in data or not 'depid' in data:
				return jsonify({"message": "'nom' and 'depid' and 'nbrsec' and 'nbrgrp' and 'speid' and 'annee' are required"})

			nom = data['nom']
			depid = data['depid']
			speid = data['speid']
			annee = data['annee']
			nbrgrp = data['nbrgrp']
			nbrsec = data['nbrsec']

			instance = get_or_create(conn, db.palier, depid=depid, nbrgrp=nbrgrp, nbrsec=nbrsec, nom=nom, speid=speid, annee=annee)
			return jsonify(instance)

		if request.method == 'DELETE':
			if palid is None:
				return jsonify({"message": "palid required in DELETE request.", "route":"/palier/<int:palid>"})

			delete(conn, db.palier, palid=palid)
			return jsonify({"message":"success"})

		if request.method == 'PUT':
			if palid is None:
				return jsonify({"message": "palid required in PUT request.", "route":"/palier/<int:palid>"})

			data = delete_empty_values(request.get_json())
			if sum(['nom' in data, 'depid' in data, 'speid' in data, 'annee' in data, 'nbrsec' in data, 'nbrgrp' in data]) == 0:
				return jsonify({"message": "at least one of :'depid', 'nom', 'nbrsec', 'nbrgrp', 'speid', 'annee' are required"})

			data["palid"] = palid
			instance = update(conn, db.palier, data)

			return jsonify(instance)


@app.route('/paliers/<int:id>', methods=['GET'])
@app.route('/paliers/<type>/<int:id>', methods=['DELETE'])
@app.route('/paliers', methods=['GET'])
def paliers(id=None, type=None):
	if request.method == "DELETE" and (id is None or type is None or not type in ["dep", "spe"] ) :
		return jsonify({"message": "'id' and 'type' are required in DELETE request. type can be: 'dep' or 'spe'.", "route":"/paliers/<type>/<int:id>"})
	with db.engine.connect() as conn:
		if request.method == "DELETE":
			if type == "dep":
				delete(conn, db.palier, depid=id)
			else:
				delete(conn, db.palier, speid=id)	
			return jsonify({"message":"success"})
		if id is not None:
			instances = get_all(conn, db.palier, speid=id)
		else:
			instances = get_all(conn, db.palier)
		return jsonify(instances)

##VEUX

@app.route('/veux/<int:veuxid>', methods=['POST', 'GET', 'DELETE', 'PUT'])
@app.route('/veux', methods=['POST', 'GET', 'DELETE', 'PUT'])
def veux(veuxid=None):
	with db.engine.connect() as conn:

		if request.method == 'GET':
			if veuxid is None:
				return jsonify({"message": "veuxid required in GET request.", "route":"/veux/<int:veuxid>"})

			instance = get_or_none(conn, db.veux, veuxid=veuxid)
			if instance:
				return jsonify(instance)
			else:
				return jsonify({"message": "instance not found"})

		if request.method == 'POST':
			data = request.get_json()
			if not 'teacherid' in data or not 'choix1' in data or not 'choix2' in data or not 'choix3' in data or not 'choix4' in data or not 'choix5' in data:
				return jsonify({"message": "'teacherid' and 'choix1' and 'choix2' and 'choix3' and 'choix4' and 'choix5' are required"})

			teacherid = data['teacherid']
			choix1 = data['choix1']
			choix2 = data['choix2']
			choix3 = data['choix3']
			choix4 = data['choix4']
			choix5 = data['choix5']

			instance = get_or_create(conn, db.veux, teacherid=teacherid, choix1=choix1, choix2=choix2, choix3=choix3, choix4=choix4, choix5=choix5)
			return jsonify(instance)

		if request.method == 'DELETE':
			if veuxid is None:
				return jsonify({"message": "veuxid required in DELETE request.", "route":"/veux/<int:veuxid>"})

			delete(conn, db.veux, veuxid=veuxid)
			return jsonify({"message":"success"})

		if request.method == 'PUT':
			if veuxid is None:
				return jsonify({"message": "veuxid required in PUT request.", "route":"/veux/<int:veuxid>"})

			data = delete_empty_values(request.get_json())
			if sum(['teacherid' in data, 'choix1' in data, 'choix2' in data, 'choix3' in data, 'choix4' in data, 'choix5' in data]) == 0:
				return jsonify({"message": "at least one of :'teacherid', 'choix1', 'choix2', 'choix3', 'choix4', 'choix5' are required"})

			data["veuxid"] = veuxid
			instance = update(conn, db.veux, data)

			return jsonify(instance)

@app.route('/veuxs/<int:id>', methods=['GET', 'DELETE'])
@app.route('/veuxs', methods=['GET'])
def veuxs(id=None):
	if request.method == "DELETE" and id is None:
		return jsonify({"message": "'teacherid' required in DELETE request", "route":"/veuxs/<int:teacherid>"})
	with db.engine.connect() as conn:
		if request.method == "DELETE":
			delete(conn, db.veux, teacherid=id)	
			return jsonify({"message":"success"})
		if id is not None:
			instances = get_all(conn, db.veux, teacherid=id)
			if instances:
				instances = instances[0]
			else:
				instances = {}
		else:
			instances = get_all(conn, db.veux)
		return jsonify(instances)


##AFFECTATION

@app.route('/affectation/<int:afecid>', methods=['POST', 'GET', 'DELETE', 'PUT'])
@app.route('/affectation', methods=['POST', 'GET', 'DELETE', 'PUT'])
def affectation(afecid=None):
	with db.engine.connect() as conn:

		if request.method == 'GET':
			if afecid is None:
				return jsonify({"message": "afecid required in GET request.", "route":"/affectation/<int:afecid>"})

			instance = get_or_none(conn, db.affectation, afecid=afecid)
			if instance:
				return jsonify(instance)
			else:
				return jsonify({"message": "instance not found"})

		if request.method == 'POST':
			data = request.get_json()
			if not 'profid' in data or not 'semestre' in data or not 'section' in data or not 'groupe' in data or not 'depid' in data or not 'type' in data or not 'module' in data or not 'tc' in data or not 'chef' in data:
				return jsonify({"message": "'profid' and 'semestre' and 'section' and 'groupe' and 'type' and 'module' and 'tc' and 'depid' and 'chef' are required"})

			profid = data['profid']
			semestre = data['semestre']
			section = data['section']
			groupe = data['groupe']
			module = data['module']
			depid = data['depid']
			type = data['type']
			tc = data['tc']
			chef = data['chef']

			instance = get_or_create(conn, db.affectation, depid=depid, profid=profid, semestre=semestre, section=section, groupe=groupe, type=type, module=module, tc=tc, chef=chef)
			return jsonify(instance)

		if request.method == 'DELETE':
			if afecid is None:
				return jsonify({"message": "afecid required in DELETE request.", "route":"/affectation/<int:afecid>"})

			delete(conn, db.affectation, afecid=afecid)
			return jsonify({"message":"success"})

		if request.method == 'PUT':
			if afecid is None:
				return jsonify({"message": "afecid required in PUT request.", "route":"/affectation/<int:afecid>"})

			data = delete_empty_values(request.get_json())
			if sum(['profid' in data, 'section' in data, 'groupe' in data, 'module' in data, 'semestre' in data, 'type' in data, 'tc' in data, 'chef' in data, 'depid' in data]) == 0:
				return jsonify({"message": "at least one of :'profid', 'module', 'semestre', 'section', 'groupe', 'type', 'tc', 'chef', 'depid' are required"})

			data["afecid"] = afecid
			instance = update(conn, db.affectation, data)

			return jsonify(instance)

@app.route('/affectations/<sec_or_grp>/<int:id>', methods=['GET'])
@app.route('/affectations/<type>/<int:id>', methods=['DELETE'])
@app.route('/affectations', methods=['GET'])
def affectations(id=None, sec_or_grp=None, type=None):
	if request.method == "DELETE" and (id is None or type is None or not type in ["dep", "mod", "grp", "sec", "prof"] ) :
		return jsonify({"message": "'id' and 'type' are required in DELETE request. type can be: 'dep' or 'grp' or 'mod' or 'sec' or 'prof'.", "route":"/affectations/<type>/<int:id>"})
	with db.engine.connect() as conn:
		if request.method == "DELETE":
			if type == "dep":
				delete(conn, db.affectation, depid=id)
			if type == "mod":
				delete(conn, db.affectation, module=id)
			if type == "grp":
				delete(conn, db.affectation, groupe=id)
			if type == "prof":
				delete(conn, db.affectation, profid=id)
			else:
				delete(conn, db.affectation, section=id)	
			return jsonify({"message":"success"})
		if id is not None and sec_or_grp in ["sec", "grp", "prof"]:
			if sec_or_grp == "sec":
				instances = get_all(conn, db.affectation, section=id, groupe=None)
			if sec_or_grp == "grp":
				instances = get_all(conn, db.affectation, groupe=id)
			if sec_or_grp == "prof":
				instances = get_all(conn, db.affectation, profid=id)
		else:
			instances = get_all(conn, db.affectation)
		return jsonify(instances)
		

##GROUPE TRANC COMMUN

@app.route('/groupetc/<int:grpid>', methods=['POST', 'GET', 'DELETE', 'PUT'])
@app.route('/groupetc', methods=['POST', 'GET', 'DELETE', 'PUT'])
def groupetc(grpid=None):
	with db.engine.connect() as conn:

		if request.method == 'GET':
			if grpid is None:
				return jsonify({"message": "grpid required in GET request.", "route":"/groupetc/<int:grpid>"})

			instance = get_or_none(conn, db.groupe_tranc_commun, grpid=grpid)
			if instance:
				return jsonify(instance)
			else:
				return jsonify({"message": "instance not found"})

		if request.method == 'POST':
			data = request.get_json()
			if not 'nom' in data or not 'speid' in data or not 'capacite' in data or not 'secid' in data:
				return jsonify({"message": "'nom' and 'speid' and 'secid' and 'capacite' are required"})

			nom = data['nom']
			speid = data['speid']
			secid = data['secid']
			capacite = data['capacite']

			instance = get_or_create(conn, db.groupe_tranc_commun, nom=nom, speid=speid, secid=secid, capacite=capacite)
			return jsonify(instance)

		if request.method == 'DELETE':
			if grpid is None:
				return jsonify({"message": "grpid required in DELETE request.", "route":"/groupetc/<int:grpid>"})

			delete(conn, db.groupe_tranc_commun, grpid=grpid)
			return jsonify({"message":"success"})

		if request.method == 'PUT':
			if grpid is None:
				return jsonify({"message": "grpid required in PUT request.", "route":"/groupetc/<int:grpid>"})

			data = delete_empty_values(request.get_json())
			if sum(['nom' in data, 'speid' in data, 'secid' in data, 'capacite' in data]) == 0:
				return jsonify({"message": "at least one of :'nom', 'speid', 'secid', 'capacite' are required"})

			data["grpid"] = grpid
			instance = update(conn, db.groupe_tranc_commun, data)

			return jsonify(instance)

@app.route('/groupestc/<int:id>', methods=['GET', 'DELETE'])
@app.route('/groupestc', methods=['GET'])
def groupestc(id=None):
	if request.method == "DELETE" and id is None:
		return jsonify({"message": "'secid' required in DELETE request.", "route":"/groupestc/<int:secid>"})
	with db.engine.connect() as conn:
		if id is not None:
			if request.method == "GET":
				instances = get_all(conn, db.groupe_tranc_commun, secid=id)
				return jsonify(instances)
			else:
				delete(conn, db.groupe_tranc_commun, secid=id)
				return jsonify({"message":"success"})
		else:
			instances = get_all(conn, db.groupe_tranc_commun)
			return jsonify(instances)

##PALIER TRANC COMMUN

@app.route('/paliertc/<int:palid>', methods=['POST', 'GET', 'DELETE', 'PUT'])
@app.route('/paliertc', methods=['POST', 'GET', 'DELETE', 'PUT'])
def paliertc(palid=None):
	with db.engine.connect() as conn:

		if request.method == 'GET':
			if palid is None:
				return jsonify({"message": "palid required in GET request.", "route":"/paliertc/<int:palid>"})

			instance = get_or_none(conn, db.palier_tranc_commun, palid=palid)
			if instance:
				return jsonify(instance)
			else:
				return jsonify({"message": "instance not found"})

		if request.method == 'POST':
			data = request.get_json()
			if not 'nom' in data or not 'speid' in data or not 'annee' in data or not 'nbrsec' in data or not 'nbrgrp' in data:
				return jsonify({"message": "'nom' and 'nbrsec' and 'nbrgrp' and 'speid' and 'annee' are required"})

			nom = data['nom']
			speid = data['speid']
			annee = data['annee']
			nbrgrp = data['nbrgrp']
			nbrsec = data['nbrsec']

			instance = get_or_create(conn, db.palier_tranc_commun, nbrgrp=nbrgrp, nbrsec=nbrsec, nom=nom, speid=speid, annee=annee)
			return jsonify(instance)

		if request.method == 'DELETE':
			if palid is None:
				return jsonify({"message": "palid required in DELETE request.", "route":"/paliertc/<int:palid>"})

			delete(conn, db.palier_tranc_commun, palid=palid)
			return jsonify({"message":"success"})

		if request.method == 'PUT':
			if palid is None:
				return jsonify({"message": "palid required in PUT request.", "route":"/paliertc/<int:palid>"})

			data = delete_empty_values(request.get_json())
			if sum(['nom' in data, 'speid' in data, 'annee' in data, 'nbrsec' in data, 'nbrgrp' in data]) == 0:
				return jsonify({"message": "at least one of :'nom', 'nbrsec', 'nbrgrp', 'speid', 'annee' are required"})

			data["palid"] = palid
			instance = update(conn, db.palier_tranc_commun, data)

			return jsonify(instance)


@app.route('/palierstc/<int:id>', methods=['GET', 'DELETE'])
@app.route('/palierstc', methods=['GET'])
def palierstc(id=None):
	if request.method == "DELETE" and id is None:
		return jsonify({"message": "'speid' required in DELETE request.", "route":"/palierstc/<int:speid>"})
	with db.engine.connect() as conn:
		if id is not None:
			if request.method == 'GET':
				instances = get_all(conn, db.palier_tranc_commun, speid=id)
				return jsonify(instances)
			else:
				delete(conn, db.palier_tranc_commun, speid=id)
				return jsonify({"message":"success"})
		else:
			instances = get_all(conn, db.palier_tranc_commun)
			return jsonify(instances)

##SECTION TRANC COMMUN

@app.route('/sectiontc/<int:secid>', methods=['POST', 'GET', 'DELETE', 'PUT'])
@app.route('/sectiontc', methods=['POST', 'GET', 'DELETE', 'PUT'])
def sectiontc(secid=None):
	with db.engine.connect() as conn:

		if request.method == 'GET':
			if secid is None:
				return jsonify({"message": "secid required in GET request.", "route":"/sectiontc/<int:secid>"})

			instance = get_or_none(conn, db.section_tranc_commun, secid=secid)
			if instance:
				return jsonify(instance)
			else:
				return jsonify({"message": "instance not found"})

		if request.method == 'POST':
			data = request.get_json()
			if not 'nom' in data or not 'speid' in data or not 'capacite' in data or not 'dep1' in data or not 'dep2' in data or not 'dep3' in data or not 'palid' in data:
				return jsonify({"message": "'nom' and 'speid' and 'capacite' and 'palid' and 'dep1' and 'dep2' and 'dep3' are required"})

			nom = data['nom']
			speid = data['speid']
			capacite = data['capacite']
			palid = data['palid']
			dep1 = data['dep1']
			dep2 = data['dep2']
			dep3 = data['dep3']

			instance = get_or_create(conn, db.section_tranc_commun, nom=nom, speid=speid, capacite=capacite, palid=palid, dep1=dep1, dep2=dep2, dep3=dep3)
			return jsonify(instance)

		if request.method == 'DELETE':
			if secid is None:
				return jsonify({"message": "secid required in DELETE request.", "route":"/sectiontc/<int:secid>"})

			delete(conn, db.section_tranc_commun, secid=secid)
			return jsonify({"message":"success"})

		if request.method == 'PUT':
			if secid is None:
				return jsonify({"message": "secid required in PUT request.", "route":"/sectiontc/<int:secid>"})

			data = delete_empty_values(request.get_json())
			if sum(['nom' in data, 'palid' in data, 'speid' in data, 'dep1' in data, 'dep2' in data, 'dep3' in data, 'capacite' in data]) == 0:
				return jsonify({"message": "at least one of :'nom', 'palid', 'speid', 'dep1', 'dep2', 'dep3', 'capacite' are required"})

			data["secid"] = secid
			instance = update(conn, db.section_tranc_commun, data)

			return jsonify(instance)


@app.route('/sectionstc/<dep_or_spe>/<int:id>', methods=['GET'])
@app.route('/sectionstc', methods=['GET'])
def sectionstc(id=None, dep_or_spe=None):
	with db.engine.connect() as conn:
		if id is not None and dep_or_spe in ["dep", "spe", "pal"]:
			if dep_or_spe == "dep":
				instances = get_all(conn, db.section_tranc_commun, dep1=id) + get_all(conn, db.section_tranc_commun, dep2=id) + get_all(conn, db.section_tranc_commun, dep3=id)
			if dep_or_spe == "pal":
				instances = get_all(conn, db.section_tranc_commun, palid=id)
			if dep_or_spe == "spe":
				instances = get_all(conn, db.section_tranc_commun, speid=id)
		else:
			instances = get_all(conn, db.section_tranc_commun)
		return jsonify(instances)

##SPECIALITE

@app.route('/formationtc/<int:ftcid>', methods=['POST', 'GET', 'DELETE', 'PUT'])
@app.route('/formationtc', methods=['POST', 'GET', 'DELETE', 'PUT'])
def formationtc(ftcid=None):
	with db.engine.connect() as conn:

		if request.method == 'GET':
			if ftcid is None:
				return jsonify({"message": "ftcid required in GET request.", "route":"/formationtc/<int:ftcid>"})

			instance = get_or_none(conn, db.formation_tranc_commun, ftcid=ftcid)
			if instance:
				return jsonify(instance)
			else:
				return jsonify({"message": "instance not found"})

		if request.method == 'POST':
			data = request.get_json()
			if not 'nom' in data or not 'cycle' in data or not 'dep1' in data or not 'dep2' in data or not 'dep3' in data :
				return jsonify({"message": "'nom' and 'cycle' and 'dep1' and 'dep2' and 'dep3' are required are required"})

			nom = data['nom']
			cycle = data['cycle']
			dep1 = data['dep1']
			dep2 = data['dep2']
			dep3 = data['dep3']

			instance = get_or_create(conn, db.formation_tranc_commun, nom=nom, cycle=cycle, dep1=dep1, dep2=dep2, dep3=dep3)
			return jsonify(instance)

		if request.method == 'DELETE':
			if ftcid is None:
				return jsonify({"message": "ftcid required in DELETE request.", "route":"/formationtc/<int:ftcid>"})

			delete(conn, db.formation_tranc_commun, ftcid=ftcid)
			return jsonify({"message":"success"})

		if request.method == 'PUT':
			if ftcid is None:
				return jsonify({"message": "ftcid required in PUT request.", "route":"/formationtc/<int:ftcid>"})

			data = delete_empty_values(request.get_json())
			if sum(['nom' in data, 'cycle' in data, 'dep1' in data, 'dep2' in data, 'dep3' in data]) == 0:
				return jsonify({"message": "at least one of :'nom', 'cycle', 'dep1', 'dep2', 'dep3' are required"})

			data["ftcid"] = ftcid
			instance = update(conn, db.formation_tranc_commun, data)

			return jsonify(instance)

@app.route('/formationstc/<int:id>', methods=['GET'])
@app.route('/formationstc', methods=['GET'])
def formationstc(id=None):
	with db.engine.connect() as conn:
		if id is not None:
			instances = get_all(conn, db.formation_tranc_commun, dep1=id) + get_all(conn, db.formation_tranc_commun, dep2=id) + get_all(conn, db.formation_tranc_commun, dep3=id)
		else:
			instances = get_all(conn, db.formation_tranc_commun)
		return jsonify(instances)


##gestdep

@app.route('/gestdep/<int:id>', methods=['POST', 'GET', 'DELETE', 'PUT'])
@app.route('/gestdep', methods=['POST', 'GET', 'DELETE', 'PUT'])
def gestdep(id=None):
	with db.engine.connect() as conn:

		if request.method == 'GET':
			if id is None:
				return jsonify({"message": "id required in GET request.", "route":"/gestdep/<int:id>"})

			instance = get_or_none(conn, db.gestdep, id=id)
			if instance:
				return jsonify(instance)
			else:
				return jsonify({"message": "instance not found"})

		if request.method == 'POST':
			data = request.get_json()
			if not 'depid' in data or not 'gestid' in data:
				return jsonify({"message": "'depid' and 'gestid' are required are required"})

			depid = data['depid']
			gestid = data['gestid']

			instance = get_or_create(conn, db.gestdep, depid=depid, gestid=gestid)
			return jsonify(instance)

		if request.method == 'DELETE':
			if id is None:
				return jsonify({"message": "id required in DELETE request.", "route":"/gestdep/<int:id>"})

			delete(conn, db.gestdep, id=id)
			return jsonify({"message":"success"})

		if request.method == 'PUT':
			if id is None:
				return jsonify({"message": "id required in PUT request.", "route":"/gestdep/<int:id>"})

			data = delete_empty_values(request.get_json())
			if sum(['depid' in data, 'gestid' in data]) == 0:
				return jsonify({"message": "at least one of :'depid', 'gestid' are required"})

			data["id"] = id
			instance = update(conn, db.gestdep, data)

			return jsonify(instance)

@app.route('/gestdeps/<int:gestid>', methods=['GET'])
@app.route('/gestdeps/<type>/<int:id>', methods=['DELETE'])
@app.route('/gestdeps', methods=['GET'])
def gestdeps(gestid=None, type=None, id=None):
	if request.method == "DELETE" and (id is None or type is None or not type in ["dep", "gestid"] ) :
		return jsonify({"message": "'id' and 'type' are required in DELETE request. type can be: 'dep' or 'gestid'.", "route":"/gestdeps/<type>/<int:id>"})
	with db.engine.connect() as conn:
		if request.method == "DELETE":
			if type == "dep":
				delete(conn, db.gestdep, depid=id)
			else:
				delete(conn, db.gestdep, gestid=id)	
			return jsonify({"message":"success"})
		if gestid is not None:
			instances = get_all(conn, db.gestdep, gestid=gestid)
		else:
			instances = get_all(conn, db.gestdep)
		return jsonify(instances)

##MODULE

@app.route('/moduletc/<int:modid>', methods=['POST', 'GET', 'DELETE', 'PUT'])
@app.route('/moduletc', methods=['POST', 'GET', 'DELETE', 'PUT'])
def moduletc(modid=None):
	with db.engine.connect() as conn:

		if request.method == 'GET':
			if modid is None:
				return jsonify({"message": "modid required in GET request.", "route":"/moduletc/<int:modid>"})

			instance = get_or_none(conn, db.module_tranc_commun, modid=modid)
			if instance:
				return jsonify(instance)
			else:
				return jsonify({"message": "instance not found"})

		if request.method == 'POST':
			data = request.get_json()
			if not 'nom' in data or not 'speid' in data or not 'dep1' in data or not 'dep2' in data or not 'dep3' in data or not 'vhg' in data or not 'hcour' in data or not 'htp' in data or not 'htd' in data or not 'abbr' in data or not 'semestre' in data or not 'palid' in data:
				return jsonify({"message": "'nom' and 'speid' and 'dep1' and 'dep2' and 'dep3' and 'vhg' and 'hcour' and 'htp' and 'htd' and 'abbr' and 'semestre' and 'palid' are required"})

			nom = data['nom']
			speid = data['speid']
			dep1 = data['dep1']
			dep2 = data['dep2']
			dep3 = data['dep3']
			vhg = data['vhg']
			hcour = data['hcour']
			htp = data['htp']
			htd = data['htd']
			abbr = data['abbr']
			semestre = data['semestre']
			palid = data['palid']

			instance = get_or_create(conn, db.module_tranc_commun, nom=nom, speid=speid, dep1=dep1, dep2=dep2, dep3=dep3, vhg=vhg, hcour=hcour, htp=htp, htd=htd, abbr=abbr, semestre=semestre, palid=palid)
			return jsonify(instance)

		if request.method == 'DELETE':
			if modid is None:
				return jsonify({"message": "modid required in DELETE request.", "route":"/moduletc/<int:modid>"})

			delete(conn, db.module_tranc_commun, modid=modid)
			return jsonify({"message":"success"})

		if request.method == 'PUT':
			if modid is None:
				return jsonify({"message": "modid required in PUT request.", "route":"/moduletc/<int:modid>"})

			data = delete_empty_values(request.get_json())
			if sum(['nom' in data, 'speid' in data, 'dep1' in data, 'dep2' in data, 'dep3' in data, 'vhg' in data, 'hcour' in data, 'htp' in data, 'htd' in data, 'abbr' in data, 'semestre' in data, 'palid' in data]) == 0:
				return jsonify({"message": "at least one of :'nom', 'speid', 'dep1', 'dep2', 'dep3', 'vhg', 'hcour', 'htp', 'htd', 'abbr', 'semestre', 'palid' are required"})

			data["modid"] = modid
			instance = update(conn, db.module_tranc_commun, data)

			return jsonify(instance)

@app.route('/modulestc/<dep_or_pal>/<int:id>', methods=['GET'])
@app.route('/modulestc', methods=['GET'])
@app.route('/modulestc/<int:by>', methods=['DELETE'])
def modulestc(dep_or_pal=None, id=None):
	with db.engine.connect() as conn:
		if request.method == "DELETE":
			if by is None:
				return jsonify({"message": "'speid' required in DELETE request.", "route":"/modulestc/<int:speid>"})
			delete(conn, db.module_tranc_commun, speid=by)
			return jsonify({"message":"success"})
			
		if id is not None and dep_or_pal in ["dep", "pal"]:
			if dep_or_pal == "pal":
				instances = get_all(conn, db.module_tranc_commun, palid=id)
			elif dep_or_pal == "dep":
				instances = get_all(conn, db.module_tranc_commun, dep1=id) + get_all(conn, db.module_tranc_commun, dep2=id) + get_all(conn, db.module_tranc_commun, dep3=id)
		else:
			instances = get_all(conn, db.module_tranc_commun)
		return jsonify(instances)

##EDT

@app.route('/edt/<int:edtid>', methods=['POST', 'GET', 'DELETE', 'PUT'])
@app.route('/edt', methods=['POST', 'GET', 'DELETE', 'PUT'])
def edt(edtid=None):
	with db.engine.connect() as conn:

		if request.method == 'GET':
			if edtid is None:
				return jsonify({"message": "edtid required in GET request.", "route":"/edt/<int:edtid>"})

			instance = get_or_none(conn, db.edt, edtid=edtid)
			if instance:
				return jsonify(instance)
			else:
				return jsonify({"message": "instance not found"})

		if request.method == 'POST':
			data = request.get_json()
			
			if not 'groupe' in data:
				data["groupe"] = None
			
			if not 'profid' in data or not 'semestre' in data or not 'section' in data or not 'groupe' in data or not 'type' in data or not 'module' in data or not 'day' in data or not 'hour' in data or not 'affid' in data or not 'depid' in data or not 'place' in data or not 'tc' in data or not 'chef' in data or not 'gestid' in data or not 'profname' in data:
				return jsonify({"message": "'profid' and 'profname' and 'semestre' and 'section' and 'groupe' and 'type' and 'module' and 'day' and 'hour' and 'place' and 'affid' and 'depid' and 'tc' and 'chef' and 'gestid' are required"})

			profid = data['profid']
			semestre = data['semestre']
			profname = data['profname']
			section = data['section']
			groupe = data['groupe']
			module = data['module']
			type = data['type']
			affid = data['affid']
			day = data['day']
			depid = data['depid']
			hour = data['hour']
			place = data['place']
			gestid = data['gestid']
			tc = data['tc']
			chef = data['chef']

			instance = get_or_create(conn, db.edt, affid=affid, depid=depid, profid=profid, semestre=semestre, section=section, groupe=groupe, type=type, module=module, day=day, hour=hour, place=place, tc=tc, chef=chef,gestid=gestid,profname=profname)
			return jsonify(instance)

		if request.method == 'DELETE':
			if edtid is None:
				return jsonify({"message": "edtid required in DELETE request.", "route":"/edt/<int:edtid>"})

			delete(conn, db.edt, edtid=edtid)
			return jsonify({"message":"success"})

		if request.method == 'PUT':
			if edtid is None:
				return jsonify({"message": "edtid required in PUT request.", "route":"/edt/<int:edtid>"})

			data = delete_empty_values(request.get_json())
			if sum(['profid' in data, 'section' in data, 'groupe' in data, 'module' in data, 'semestre' in data, 'type' in data, 'day' in data, 'hour' in data, 'chef' in data, 'place' in data, 'tc' in data, 'depid' in data, 'profname' in data, 'affid' in data, 'gestid' in data]) == 0:
				return jsonify({"message": "at least one of :'profid', 'module', 'semestre', 'section', 'groupe', 'type', 'day', 'profname', 'depid', 'affid', 'gestid', 'hour', 'place', 'tc', 'chef' are required"})

			data["edtid"] = edtid
			instance = update(conn, db.edt, data)

			return jsonify(instance)

@app.route('/edts/<sec_or_grp>/<int:id>', methods=['GET'])
@app.route('/edts/<type>/<int:id>', methods=['DELETE'])
@app.route('/edts', methods=['GET'])
def edts(sec_or_grp=None, id=None, type=None):
	if request.method == "DELETE" and (id is None or type is None or not type in ["dep", "mod", "grp", "sec", "aff", "prof", "place"] ) :
		return jsonify({"message": "'id' and 'type' are required in DELETE request. type can be: 'dep' or 'grp' or 'mod' or 'sec' or 'aff' or 'prof' or 'place'.", "route":"/edts/<type>/<int:id>"})
	with db.engine.connect() as conn:
		if request.method == "DELETE":
			if type == "dep":
				delete(conn, db.edt, depid=id)
			if type == "mod":
				delete(conn, db.edt, module=id)
			if type == "grp":
				delete(conn, db.edt, groupe=id)
			if type == "aff":
				delete(conn, db.edt, affid=id)
			if type == "prof":
				delete(conn, db.edt, profid=id)
			if type == "place":
				delete(conn, db.edt, place=id)
			else:
				delete(conn, db.edt, section=id)	
			return jsonify({"message":"success"})
		if id is not None and sec_or_grp in ["sec", "grp", "prof", "gestid"]:
			if sec_or_grp == "sec":
				instances = get_all(conn, db.edt, section=id, groupe=None)
			elif sec_or_grp == "grp":
				instances = get_all(conn, db.edt, groupe=id)
			elif sec_or_grp == "prof":
				instances = get_all(conn, db.edt, profid=id)
			elif sec_or_grp == "gestid":
				instances = get_all(conn, db.edt, gestid=id)
		else:
			instances = get_all(conn, db.edt)
		return jsonify(instances)

###AVAILABILITY

@app.route('/availability/<int:avaid>', methods=['POST', 'GET', 'DELETE', 'PUT'])
@app.route('/availability', methods=['POST', 'GET', 'DELETE', 'PUT'])
def availability(avaid=None):
	with db.engine.connect() as conn:

		if request.method == 'GET':
			if avaid is None:
				return jsonify({"message": "avaid required in GET request.", "route":"/availability/<int:avaid>"})

			instance = get_or_none(conn, db.availability, avaid=avaid)
			if instance:
				return jsonify(instance)
			else:
				return jsonify({"message": "instance not found"})

		if request.method == 'POST':
			data = request.get_json()
			if not 'profid' in data or not 'day' in data or not 'hour' in data:
				return jsonify({"message": "'profid', 'day', 'hour' are required"})
			profid = data['profid']
			day = data['day']
			hour = data['hour']

			instance = get_or_create(conn, db.availability, profid=profid, day=day, hour=hour)
			return jsonify(instance)

		if request.method == 'DELETE':
			if avaid is None:
				return jsonify({"message": "avaid required in DELETE request.", "route":"/availability/<int:avaid>"})

			delete(conn, db.availability, avaid=avaid)

			return jsonify({"message":"success"})

		if request.method == 'PUT':
			if avaid is None:
				return jsonify({"message": "avaid required in PUT request.", "route":"/availability/<int:avaid>"})

			data = delete_empty_values(request.get_json())
			if sum(['profid' in data, 'day' in data, 'hour' in data]) == 0:
				return jsonify({"message": "at least one of: 'profid', 'day', 'hour' are required"})

			data["avaid"] = avaid
			instance = update(conn, db.availability, data)

			return jsonify(instance)

@app.route('/availabilitys/<int:id>', methods=['GET'])
@app.route('/availabilitys', methods=['GET'])
def availabilitys(id=None):
	with db.engine.connect() as conn:
		if id is not None:
			instances = get_all(conn, db.availability, profid=id)
		else:
			instances = get_all(conn, db.availability)
		return jsonify(instances)

if __name__=="__main__":
	app.run()
