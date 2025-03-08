from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/members")
def members():
    return {"members": ["M1", "M2", "M3"]}

if __name__ == "__main__":
    app.run(debug=True)
