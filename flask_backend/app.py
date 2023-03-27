from flask import request, Flask, jsonify
from flask_cors import CORS
import models as db
from utils import *

app = Flask(__name__)
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
/domains -> GET

<br><br>

/chambre -> POST(nom,depid,capacite,type)<br>
/chambre/int:chambreid -> GET, DELETE, PUT(nom,depid,capacite,type)<br>
/chambres -> GET

<br><br>

/filiere -> POST(nom,depid)<br>
/filiere/int:fillid -> GET, DELETE, PUT(nom,depid)<br>
/filieres -> GET

<br><br>

/specialite -> POST(nom,fillid,annee)<br>
/specialite/int:speid -> GET, DELETE, PUT(nom,fillid,annee)<br>
/specialites -> GET

<br><br>

/module -> POST(nom,speid,fillid)<br>
/module/int:modid -> GET, DELETE, PUT(nom,speid,fillid)<br>
/modules -> GET
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
			if not 'nom' in data or not 'depid' in data or not 'capacite' in data or not 'type' in data:
				return jsonify({"message": "'nom', 'depid', 'capacite', 'type' are required"})
			nom = data['nom']
			depid = data['depid']
			capacite = data['capacite']
			type = data['type']

			instance = get_or_create(conn, db.chambre, nom=nom, depid=depid, capacite=capacite, type=type)
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
			if sum(['nom' in data, 'depid' in data, 'capacite' in data, 'type' in data]) == 0:
				return jsonify({"message": "at least one of: 'nom', 'depid', 'capacite', 'type' are required"})

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

@app.route('/filieres', methods=['GET'])
def filieres():
	with db.engine.connect() as conn:
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
			if not 'nom' in data or not 'fillid' in data or not 'annee' in data:
				return jsonify({"message": "'nom' and 'fillid' and 'annee' are required"})

			nom = data['nom']
			fillid = data['fillid']
			annee = data['annee']

			instance = get_or_create(conn, db.specialite, nom=nom, fillid=fillid, annee=annee)
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
			if sum(['nom' in data, 'fillid' in data, 'annee' in data]) == 0:
				return jsonify({"message": "at least one of :'nom', 'fillid', 'annee' are required"})

			data["speid"] = speid
			instance = update(conn, db.specialite, data)

			return jsonify(instance)

@app.route('/specialites', methods=['GET'])
def specialites():
	with db.engine.connect() as conn:
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
			if not 'nom' in data or not 'speid' in data or not 'fillid' in data:
				return jsonify({"message": "'nom' and 'speid' and 'fillid' are required"})

			nom = data['nom']
			speid = data['speid']
			fillid = data['fillid']

			instance = get_or_create(conn, db.module, nom=nom, speid=speid, fillid=fillid)
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
			if sum(['nom' in data, 'speid' in data, 'fillid' in data]) == 0:
				return jsonify({"message": "at least one of :'nom', 'speid', 'fillid' are required"})

			data["modid"] = modid
			instance = update(conn, db.module, data)

			return jsonify(instance)

@app.route('/modules', methods=['GET'])
def modules():
	with db.engine.connect() as conn:
		instances = get_all(conn, db.module)
		return jsonify(instances)
