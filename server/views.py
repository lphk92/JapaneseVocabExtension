from flask import render_template, url_for

from server import app

@app.route("/")
def index():
    return render_template('index.html')


@app.route("/explore")
def explore():
    return render_template('explore.html')


@app.route("/explore/<category>/<list_name>")
def view_list(category, list_name):
    return render_template('view_list.html',
                           category=category,
                           list_name=list_name)

@app.route("/options")
def options():
    return render_template('options.html')
