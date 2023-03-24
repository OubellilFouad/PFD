from flask import request, Flask, jsonify
from flask_cors import CORS
import models as db
from utils import *

app = Flask(__name__)
CORS(app)

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

/chambre -> POST(nom,depid,salleid,capacite,type)<br>
/chambre/int:chambreid -> GET, DELETE, PUT(nom,depid,salleid,capacite,type)<br>
/chambres -> GET
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
				
			data = request.get_json()
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
				
			data = request.get_json()
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
			if not 'nom' in data or not 'depid' in data or not 'salleid' in data or not 'capacite' in data or not 'type' in data:
				return jsonify({"message": "'nom', 'depid', 'salleid', 'capacite', 'type' are required"})
			nom = data['nom']
			depid = data['depid']
			salleid = data['salleid']
			capacite = data['capacite']
			type = data['type']
			
			instance = get_or_create(conn, db.chambre, nom=nom, depid=depid, salleid=salleid, capacite=capacite, type=type)
			return jsonify(instance)

		if request.method == 'DELETE':
			if chambreid is None:
				return jsonify({"message": "chambreid required in DELETE request.", "route":"/chambre/<int:chambreid>"})

			delete(conn, db.chambre, chambreid=chambreid)

			return jsonify({"message":"success"})
		
		if request.method == 'PUT':
			if chambreid is None:
				return jsonify({"message": "chambreid required in PUT request.", "route":"/chambre/<int:chambreid>"})
				
			data = request.get_json()
			if sum(['nom' in data, 'depid' in data, 'salleid' in data, 'capacite' in data, 'type' in data]) == 0:
				return jsonify({"message": "at least one of: 'nom', 'depid', 'salleid', 'capacite', 'type' are required"})
			
			data["chambreid"] = chambreid
			instance = update(conn, db.chambre, data)
			
			return jsonify(instance)

@app.route('/chambres', methods=['GET'])
def chambres():
	with db.engine.connect() as conn:
		instances = get_all(conn, db.chambre)
		return jsonify(instances)


if __name__ == '__main__':
    app.run(debug=True)