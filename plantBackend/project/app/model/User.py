from project.app.db import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = "user"
    user_id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(50), nullable = False)
    email = db.Column(db.String(255), nullable = False)
    password = db.Column(db.String(255), nullable = False)
    role = db.Column(db.String(15), default = 'user')
    
    active_sessions = db.relationship("ActiveUserSession", back_populates = "user")
    predictions = db.relationship("PlantPrediction", back_populates="user")
    
    def set_password(self,password):
        self.password = generate_password_hash(password)
        
    def check_password(self, passoword):
        return check_password_hash(self.password, passoword)