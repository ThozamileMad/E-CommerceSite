from flask import Flask, render_template, redirect, url_for, request, abort
from flask_login import UserMixin, login_user, LoginManager, current_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from databases import get_db, get_databases
from email_sender import mailSender
from datetime import datetime, timedelta
import random
from encrypt import Encrypter

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

login_manager = LoginManager()
login_manager.init_app(app)

mailsender = mailSender()

@login_manager.user_loader
def load_user(user_id):
    user = db.session.get(Users, int(user_id))
    return user


@app.route("/")
def home():
    return render_template("home.html", logged_in=current_user.get_id())


# adds new user to database
def db_add(item):
    db.session.add(item)
    db.session.commit()


# logs user in
def login(uid):
    user = Users.query.filter_by(id=uid).first()
    login_user(user)


def restrict_sign_in_out(function):
    @wraps(function)
    def inner_function(*args, **kwargs):
        is_logged_in = current_user.is_authenticated
        if is_logged_in:
            return redirect(url_for("home"))
        else:
            return function(*args, **kwargs)

    return inner_function


@app.route("/sign_up/<err>", methods=["GET", "POST"])
@restrict_sign_in_out
def sign_up(err):
    if request.method == "POST":
        user_inputs = {item: request.form.get(item).strip() for item in ["username", "email", "password"]}
        database_data = db.session.query(Users).all()

        for user_data in database_data:
            if user_inputs["username"] == user_data.username:
                return redirect(url_for("sign_up", err="Error: Username in Database!"))
            elif user_inputs["email"] == user_data.email:
                return redirect(url_for("sign_up", err="Error: Email Address in Database!"))
            elif check_password_hash(user_data.password, user_inputs["password"]):
                return redirect(url_for("sign_up", err="Error: Password in Database!"))
            
        valid_data = Users(username=user_inputs["username"],
                           email=user_inputs["email"],
                           password=generate_password_hash(user_inputs["password"]))
        db_add(valid_data)
        login(len(db.session.query(Users).all()))
        return redirect(url_for("home"))

    return render_template("sign_up.html", err=err)


@app.route("/sign_in/<err>", methods=["GET", "POST"])
@restrict_sign_in_out
def sign_in(err):
    if request.method == "POST":
        user_inputs = {item: request.form.get(item).strip() for item in ["email", "password"]}
        user_data = Users.query.filter_by(email=user_inputs["email"]).first()

        # Checks if information in database matches user's inputs

        if user_data != None:
            if check_password_hash(user_data.password, user_inputs["password"]):
                login(user_data.id)  # Logs the in if user's information is valid
                return redirect(url_for("home"))
            else:
                return redirect(url_for("sign_in", err="Error: Password does not match any passwords stored in the database. Please try again."))
        else:
            return redirect(url_for("sign_in", err="Error: Email Address does not match any email address stored in the database. Please try again."))

    return render_template("sign_in.html", err=err)


def create_pin_datetime():
    # Creates recovery pin creation date and recovery pin expiry date
    current_date = datetime.now()
    time_delta = timedelta(minutes=30)
    expiry_date = current_date + time_delta

    return {"expiry_date": expiry_date}



@app.route("/forgot_password/<err>", methods=["GET", "POST"])
def forgot_password(err):
    if request.method == "POST":
        email = request.form.get("email").strip()
        user_data = Users.query.filter_by(email=email).first()

        if user_data is not None:
            # Generate Random pin and send email
            random_pin = random.randint(1, 999)
            result = mailsender.send_email(email, "Password Recovery", "Use this pin to recover your password {}".format(random_pin))

            if result != 200:
                return redirect(url_for("forgot_password", err="Error: sorry an error has occured, please click resend. If the error persists please try again later."))
            else:
                dates = create_pin_datetime()

                # Adds recovery pin and recovery pin dates to user's database
                user_data.recovery_pin = generate_password_hash(random_pin)
                user_data.pin_expiry_datetime = dates["expiry_date"]
                db.session.commit()
                return redirect(url_for("password_recovery", user_id=user_data.id, err="err"))

    return render_template("forgot_password.html", err=err)


@app.route("/password_recovery/<user_id>/<err>", methods=["GET", "POST"])
def password_recovery(user_id, err):
    user = Users.query.filter_by(id=int(user_id)).first()

    if request.method == "POST":
        user_input = request.form.get("pin")
        current_date = datetime.fromisoformat(datetime.now())
        expiry_date = datetime.fromisoformat(user.pin_expiry_datetime)
        if current_date < expiry_date:
            if check_password_hash(user.recovery_pin, user_input):
                user.recovery_pin = ""
                user.pin_expiry_datetime = ""
                user.session.commit()
                return redirect(url_for("show_password", user_id=user.id, password=user_input))         
            else:
                return redirect(url_for("password_recovery", user_id=user.id, err="Error: Invalid pin."))
        else:
            return redirect(url_for("password_recovery", user_id=user.id, err="Error: Pin expired please generate another one."))
    return render_template("password_recovery.html", err=err)


@app.route("/show_password/<password>", methods=["GET", "POST"])
def show_password(password):
 
    return render_template("show_password.html", password=password)


@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for("home"))


if __name__ == "__main__":
    app.run(debug=True)
