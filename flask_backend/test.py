import requests

url = 'http://127.0.0.1:5000'

# print(requests.get(f"{url}/dep").text)
# print(requests.get(f"{url}/dep/1").text)
# print(requests.post(f"{url}/dep", data = {'nom': 'admane'}).text)
# print(requests.post(f"{url}/dep", data = {'nom': 'asff5gsd', 'domainid':1}).text)
# print(requests.post(f"{url}/dep").text)
# print(requests.delete(f"{url}/dep").text)
# print(requests.delete(f"{url}/dep/1515").text)
print(requests.put(f"{url}/dep/1515", json={"nom":"hahahah", "domainid":55}).text)
print(requests.get(f"{url}/deps").text)

