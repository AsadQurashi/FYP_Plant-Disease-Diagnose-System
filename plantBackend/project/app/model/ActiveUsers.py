from project.app.db import db
from datetime import datetime

class ActiveUserSession(db.Model):
    __tablename__ = "active_sessions"
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    login_time = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)

    user = db.relationship("User", back_populates="active_sessions")
