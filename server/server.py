from flask import Flask, render_template, url_for
#from crossdomain import crossdomain
import json
import os

app = Flask(__name__)

list_dir = "./lists"

lists = {}

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/options")
def options():
    return render_template('options.html')

@app.route("/list", methods=["GET"])
#@crossdomain(origin='*')
def list_sources():
    list_dict = dict()
    for k, v in lists.items():
        list_dict[k] = list(v.keys())
    return json.dumps(list_dict)

@app.route("/list/<category>/<filename>", methods=["GET"])
#@crossdomain(origin='*')
def get_list(category, filename):
    if category in lists:
        if filename in lists[category]:
            return json.dumps(lists[category][filename])
        else:
            return "Could not find file {} in category {}".format(filename, category)
    else:
        return "Could not find category {}".format(category)


if __name__ == "__main__":
    import codecs

    for d in os.listdir(list_dir):
        lists[d] = dict()
        for filename in os.listdir(os.path.join(list_dir, d)):
            name = filename.split('.')[0]
            with codecs.open(format(os.path.join(list_dir, d, filename)), 'r', 'utf-8') as f:
                data = [l.split(',') for l in f.readlines()]
                lists[d][name] = data

    app.run(debug=True)
