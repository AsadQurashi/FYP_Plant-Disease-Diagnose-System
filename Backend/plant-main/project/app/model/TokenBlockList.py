from datetime import datetime
from project.app.db import db

class TokenBlockList(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    jti = db.Column(db.String(36), nullable = False, unique = True)
    created_at = db.Column(db.DateTime, default = datetime.utcnow)