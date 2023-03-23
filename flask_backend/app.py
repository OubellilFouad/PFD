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
"""

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
			if not 'nom' in data or not 'domainid' in data:
				return jsonify({"message": "'nom' and 'domainid' are required"})

			nom = data['nom']
			domainid = data['domainid']

			instance = update(conn, db.dep, depid=depid, nom=nom, domainid=domainid)
			return jsonify(instance)

@app.route('/deps', methods=['GET'])
def deps():
	with db.engine.connect() as conn:
		instances = get_all(conn, db.dep)
		return jsonify(instances)

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
				return jsonify({"message": "domainid required in GET request.", "route":"/domain/<int:domainid>"})

			delete(conn, db.domain, domainid=domainid)

			return jsonify({"message":"success"})
		
		if request.method == 'PUT':
			if domainid is None:
				return jsonify({"message": "domainid required in PUT request.", "route":"/domain/<int:domainid>"})
				
			data = request.get_json()
			if not 'nom' in data:
				return jsonify({"message": "'nom' is required"})

			nom = data['nom']

			instance = update(conn, db.domain, domainid=domainid, nom=nom)
			return jsonify(instance)

@app.route('/domains', methods=['GET'])
def domains():
	with db.engine.connect() as conn:
		instances = get_all(conn, db.domain)
		return jsonify(instances)

if __name__ == '__main__':
    app.run(debug=True)