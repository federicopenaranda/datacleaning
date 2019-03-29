from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
  return render_template("index.html", name="Joe")

if __name__ == "__main__":
  app.run()