import codecs
import json
import os

#from crossdomain import crossdomain
from server import app

list_dir = "./server/lists"
lists = {}

for d in os.listdir(list_dir):
    lists[d] = dict()
    for filename in os.listdir(os.path.join(list_dir, d)):
        name = filename.split('.')[0]
        with codecs.open(
                format(os.path.join(list_dir, d, filename)),
                'r', 'utf-8') as f:
            data = [l.split(',') for l in f.readlines()]
            lists[d][name] = data


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
    list_dict = dict()
    for k, v in lists.items():
        list_dict[k] = list(v.keys())
    return json_data([ {"category": k, "lists": v}
                       for k, v in list_dict.items() ])


@app.route("/list/<category>", methods=["GET"])
def get_lists_for_category(category):
    if category in lists:
        return json_data({"lists":
                          sorted(list(lists[category].keys())) })
    else:
        return json_error(
                   "Invalid Category",
                   "Could not find category {}".format(category))


@app.route("/list/<category>/<filename>", methods=["GET"])
#@crossdomain(origin='*')
def get_list(category, filename):
    if category in lists:
        if filename in lists[category]:
            return json_data([
                { "reading": l[0],
                  "kanji":   l[1],
                  "meaning": l[2] }
                # Skip the first entry (header row)
                for l in lists[category][filename][1:]
            ])
        else:
            return json_error(
                    "Invalid List",
                    "Could not find list {} in category {}"\
                        .format(filename, category))
    else:
        return json_error(
                   "Invalid Category",
                   "Could not find category {}".format(category))
