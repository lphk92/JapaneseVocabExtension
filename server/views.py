from flask import render_template, url_for

from server import app

@app.route("/")
def index():
    return render_template('index.html')


@app.route("/options")
def options():
    return render_template('options.html')
