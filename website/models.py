from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func
from werkzeug.security import check_password_hash


class RegisteredUser(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    pas = db.Column(db.String(100))
    name = db.Column(db.String(100))
    is_admin = db.Column(db.Boolean)
    theater = db.relationship('Theaters')
    movie = db.relationship('Movie')
    show = db.relationship('Show')
    booked_ti = db.relationship('Ticket')

    def check_password(self, password):
       return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'pas': self.pas,
            'is_admin': self.is_admin,
        }

class Theaters(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    address = db.Column(db.String(100))
    theater_admin_id = db.Column(db.Integer, db.ForeignKey('registered_user.id'))
    show = db.relationship('Show')
    booked_ti = db.relationship('Ticket')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'address': self.address,
            'theater_admin_id': self.theater_admin_id
        }


class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    poster = db.Column(db.String(255))
    title = db.Column(db.String(100))
    times_watched = db.Column(db.Integer)
    movie_admin_id = db.Column(db.Integer, db.ForeignKey('registered_user.id'))
    show = db.relationship('Show')
    booked_ti = db.relationship('Ticket')
    rating = db.Column(db.Float)
    Genre = db.Column(db.String(100))

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'rating': self.rating,
            'genre': self.Genre,
            'poster': self.poster,
        }


class Show(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    screened_m = db.Column(db.Integer, db.ForeignKey('movie.id'))
    t_in = db.Column(db.Integer, db.ForeignKey('theaters.id'))
    movie = db.Column(db.String(100))
    t = db.Column(db.String(100))
    address_t = db.Column(db.String(100))
    datetime = db.Column(db.DateTime(timezone=True), default=func.now())
    t_admin_id = db.Column(db.Integer, db.ForeignKey('registered_user.id'))
    available_seats = db.Column(db.Integer)
    cost = db.Column(db.Integer)
    booked_ti = db.relationship('Ticket')
    def to_dict(self):
        return {
            'id': self.id,
            'movie': self.movie,
            'theater': self.t_in,
            'theater_name':self.t,
            'cost': self.cost,
            'add': self.address_t,
            'time': self.datetime,
            'available_seats':self.available_seats
        }

class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    booked_show = db.Column(db.Integer, db.ForeignKey('show.id'))
    booked_m = db.Column(db.Integer, db.ForeignKey('movie.id'))
    booked_t = db.Column(db.Integer, db.ForeignKey('theaters.id'))
    user = db.Column(db.Integer, db.ForeignKey('registered_user.id'))
    movie = db.Column(db.String(100))
    t = db.Column(db.String(100))
    address_t = db.Column(db.String(100))
    total_seats = db.Column(db.Integer)
    cost = db.Column(db.Integer)
    timinig_s = db.Column(db.DateTime(timezone=True), default=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'show_id': self.booked_show,
            'movie': self.booked_m,
            'theater': self.booked_t,
            'user_id': self.user,
            'movie_name': self.movie,
            'total_seats': self.total_seats,
            'cost': self.cost,
            'time': self.timinig_s

        }

