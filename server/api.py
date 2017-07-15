import codecs
import json
import os

#from crossdomain import crossdomain
from server import app

list_dir = "./server/lists"
lists = {}

for d in os.listdir(list_dir):
    lists[d] = [f.split('.')[0] for f in os.listdir(os.path.join(list_dir, d))]
    #for filename in os.listdir(os.path.join(list_dir, d)):
    #    name = filename.split('.')[0]
    #    lists[d][name] = ""


def json_data(data):
    return json.dumps({
        "data": data
    })


def json_error(title, message):
        return json.dumps({
            "errors": [{
                "title": title,
                "detail": message
            }]
        })


@app.route("/list", methods=["GET"])
#@crossdomain(origin='*')
def list_sources():
    return json_data([ {"category": k, "lists": sorted(v)}
                       for k, v in lists.items() ])


@app.route("/list/<category>", methods=["GET"])
def get_lists_for_category(category):
    if category in lists:
        return json_data({"lists": sorted(lists[category]) })
                          #sorted(list(lists[category].keys())) })
    else:
        return json_error(
                   "Invalid Category",
                   "Could not find category {}".format(category))


@app.route("/list/<category>/<filename>", methods=["GET"])
#@crossdomain(origin='*')
def get_list(category, filename):
    if category in lists:
        if filename in lists[category]:
            # Load up the list JSON
            list_path = os.path.join(list_dir, category, filename + ".json")
            with open(list_path, "r") as f:
                return json_data(json.loads(f.read()))
        else:
            return json_error(
                    "Invalid List",
                    "Could not find list {} in category {}"\
                        .format(filename, category))
    else:
        return json_error(
                   "Invalid Category",
                   "Could not find category {}".format(category))
