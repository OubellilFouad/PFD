import sqlalchemy as sql
from sqlalchemy.dialects.mysql import insert

def get_or_create(conn, model, **kwargs):
	instance = conn.execute(sql.insert(model).values(**kwargs))		
	return {"id": instance.inserted_primary_key[0]}

def get_or_none(conn, model, **kwargs):
	instance = conn.execute(sql.select(model).filter_by(**kwargs)).first()
	if instance:
		return instance._asdict()
	else:
		return None

def delete(conn, model, **kwargs):
	instance = conn.execute(sql.delete(model).filter_by(**kwargs))

def update(conn, model, data):
	instance = conn.execute(insert(model).values(data).on_duplicate_key_update(data))
	
	return {"id": instance.inserted_primary_key[0]}

def get_all(conn, model, **kwargs):
	if kwargs:
		instances = conn.execute(sql.select(model).filter_by(**kwargs)).all()
	else:
		instances = conn.execute(sql.select(model)).all()
		
	return [dict(row._mapping) for row in instances]
