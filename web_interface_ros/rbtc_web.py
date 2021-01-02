from flask import Flask, render_template, request, flash, redirect, url_for, send_from_directory
# ,jsonify , abort, make_response
from flask_httpauth import HTTPBasicAuth
from misc import get_ip
from shutdown import shutdown, reboot
from settings import HTTP_PORT, WEB_USER, WEB_PASS, WEB_SECRET_KEY, WEB_DEBUG


app = Flask(__name__, static_url_path="/static", template_folder="templates")
app.secret_key = WEB_SECRET_KEY
auth = HTTPBasicAuth()
ip = get_ip()

@auth.verify_password
def verify_password(username, password):
    return username == WEB_USER and password == WEB_PASS


@app.route('/static/<path:path>')
@auth.login_required
def send_static(path):
    return send_from_directory('static', path)

@app.route('/')
@auth.login_required
def home_view():
    return redirect(url_for('control_view'))

@app.route('/control')
@auth.login_required
def control_view():
    context = {
        "actual": "control",
        "ws_ip": ip,
    }
    return render_template("control.html", **context)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=HTTP_PORT, debug=WEB_DEBUG)