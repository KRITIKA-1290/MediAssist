from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from flask_cors import CORS
import urllib.parse
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)

# Basic Config
app.config['SECRET_KEY'] = 'your_secret_key_here' # Change this in production
CORS(app)

# Database Config
encoded_password = urllib.parse.quote_plus("KS72@kittu")
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://root:{encoded_password}@localhost:3306/mediassist_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Setup Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'mediassist940@gmail.com'
app.config['MAIL_PASSWORD'] = 'tjwv sibf jmvo enxd'
app.config['MAIL_DEFAULT_SENDER'] = 'mediassist940@gmail.com'

mail = Mail(app)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    doctor_name = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(20), nullable=False)
    time = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(20), default='Pending')

# Create Tables
with app.app_context():
    db.create_all()

# Routes
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 400
    
    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already taken"}), 400

    new_user = User(username=username, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        return jsonify({"message": "Login successful", "user_id": user.id, "username": user.username}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401

@app.route('/book-appointment', methods=['POST'])
def book_appointment():
    data = request.get_json()
    user_id = data.get('user_id')
    doctor_name = data.get('doctor_name')
    date = data.get('date')
    time = data.get('time')

    if not all([user_id, doctor_name, date, time]):
        return jsonify({"error": "Missing required fields"}), 400

    new_appointment = Appointment(user_id=user_id, doctor_name=doctor_name, date=date, time=time)
    db.session.add(new_appointment)
    db.session.commit()

    return jsonify({"message": "Appointment booked successfully"}), 201

@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    if not name or not email or not message:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        msg = Message(
            subject="New Contact Form Submission",
            recipients=["mediassist940@gmail.com"],
            body=f"Message from: {name}\nEmail: {email}\n\n{message}",
        )
        mail.send(msg)
        return jsonify({"message": "Email sent successfully!"}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to send email."}), 500

@app.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify({"username": user.username, "email": user.email}), 200
    else:
        return jsonify({"error": "User not found"}), 404

@app.route('/appointments/<int:user_id>', methods=['GET'])
def get_appointments(user_id):
    appointments = Appointment.query.filter_by(user_id=user_id).all()
    appointment_list = []
    for appt in appointments:
        appointment_list.append({
            "id": appt.id,
            "doctor_name": appt.doctor_name,
            "date": appt.date,
            "time": appt.time,
            "status": appt.status
        })
    return jsonify(appointment_list), 200

if __name__ == '__main__':
    app.run(debug=True)
