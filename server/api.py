import codecs
import json
import os
import re

#from crossdomain import crossdomain
from server import app


def natural_key(string_):
    """See http://www.codinghorror.com/blog/archives/001018.html"""
    return [int(s) if s.isdigit() else s for s in re.split(r'(\d+)', string_)]


list_dir = "./server/lists"
lists = {}

for d in os.listdir(list_dir):
    list_names = [ f.split('.')[0] for f in os.listdir(os.path.join(list_dir, d)) ]
    lists[d] = sorted(list_names, key=natural_key)


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
    return json_data([ {"category": k, "lists": v}
                       for k, v in lists.items() ])


@app.route("/list/<category>", methods=["GET"])
def get_lists_for_category(category):
    if category in lists:
        return json_data({ "lists": lists[category] })
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
