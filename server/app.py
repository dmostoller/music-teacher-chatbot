
from config import app



@app.route("/")
def index():
    return "<h1>Project Server</h1>"