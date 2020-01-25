from flask import Flask
app = Flask(__name__)

@app.route("/", methods=['GET'])
def analysis():
   return "show result"

if __name__ == "__main__":
    app.run(port=5005, debug=True)