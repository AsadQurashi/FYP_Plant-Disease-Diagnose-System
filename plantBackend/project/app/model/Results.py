from project.app.db import db
from datetime import datetime

class PlantPrediction(db.Model):
    __tablename__ = 'plant_predictions'

    id = db.Column(db.Integer, primary_key=True)
    plant_disease = db.Column(db.String(100), nullable=False)
    prediction_result = db.Column(db.Text, nullable=False)
    image_path = db.Column(db.String(255), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    user = db.relationship("User", back_populates="predictions")