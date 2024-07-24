from flask_sqlalchemy import SQLAlchemy


def get_db(app):
    return SQLAlchemy(app)


def get_databases(app, db, usermixin):
    with app.app_context():
        class Users(db.Model, usermixin):
            id = db.Column(db.Integer, primary_key=True)
            username = db.Column(db.String, unique=True, nullable=False)
            email = db.Column(db.String, unique=True, nullable=False)
            password = db.Column(db.String, unique=True, nullable=False)
            recovery_pin = db.Column(db.String, unique=True, nullable=True)
            recovery_pin_creation_datetime = db.Column(db.String, unique=False, nullable=True)
            recovery_pin_expiration_datetime = db.Column(db.String, unique=False, nullable=True)

        class Products(db.Model):
            __bind_key__ = "products"
            id = db.Column(db.Integer, primary_key=True)
            name = db.Column(db.String, unique=True, nullable=False)
            price = db.Column(db.Integer, unique=False, nullable=False)
            category = db.Column(db.Integer, unique=False, nullable=False)
            product_type = db.Column(db.String, unique=False, nullable=False)
            sales_val = db.Column(db.Integer, unique=False, nullable=False)
            times_purchased = db.Column(db.Integer, unique=False, nullable=False)

        class Carts(db.Model):
            __bind_key__ = "carts"
            id = db.Column(db.Integer, primary_key=True)
            user_id = db.Column(db.Integer, unique=True, nullable=False)
            item_id = db.Column(db.Integer, unique=True, nullable=False)

        class Purchases(db.Model):
            __bind_key__ = "purchases"
            id = db.Column(db.Integer, primary_key=True)
            user_id = db.Column(db.Integer, unique=True, nullable=False)
            item_id = db.Column(db.Integer, unique=True, nullable=False)
            date = db.Column(db.String, unique=False, nullable=False)
            time = db.Column(db.String, unique=False, nullable=False)

        db.create_all()

    return {"users": Users, "products": Products, "carts": Carts, "purchases": Purchases}
