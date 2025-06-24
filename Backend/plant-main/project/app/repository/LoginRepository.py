from project.app.model.User import User
from project.app.db import db
from flask_jwt_extended import create_access_token
from datetime import timedelta

class LoginRepository:
    
    @staticmethod
    def get_session():
        return db.session
    
    
    @staticmethod
    def login(args, session):
        email = args.get('email')
        password = args.get('password')
        
        user = session.query(User).filter(User.email == email).first()
        
        if not user or not user.check_password(password):  
            return {"message" : "Invalid email or password"}, 
        
        print(f"User logging in: {user.email}, Role: {user.role}") 
        
        
        access_token = create_access_token(
            identity=user.user_id, 
            additional_claims={"email": user.email, "role": user.role},  
            expires_delta=timedelta(days=30)
        )
        
        return {"access_token": access_token}, 200  