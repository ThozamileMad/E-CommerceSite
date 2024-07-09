from flask import Flask, render_template, redirect, url_for, request, abort
from flask_login import UserMixin, login_user, LoginManager, current_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from databases import get_db, get_databases

app = Flask(__name__)
app.config["SECRET_KEY"] = "n19rcy3mpmr3yrhhfh0jo22f9f8h1"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_BINDS"] = {"products": "sqlite:///products.db",
                                  "carts": "sqlite:///carts.db",
                                  "purchases": "sqlite:///purchases.db"}

db = get_db(app)
databases = get_databases(app, db, UserMixin)
Users = databases["users"]
Products = databases["products"]
Carts = databases["carts"]
Purchases = databases["purchases"]


@app.route("/")
def home():

    return render_template("home.html")


if __name__ == "__main__":
    app.run(debug=True)
