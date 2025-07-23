# from project.app.model.User import User
# from project.app.db import db
# from flask_jwt_extended import create_access_token
# from datetime import timedelta

# class LoginRepository:
    
#     @staticmethod
#     def get_session():
#         return db.session
    
    
#     @staticmethod
#     def login(args, session):
#         email = args.get('email')
#         password = args.get('password')
        
#         user = session.query(User).filter(User.email == email).first()
        
#         if not user or not user.check_password(password):  
#             return {"message" : "Invalid email or password"}, 
        
#         print(f"User logging in: {user.email}, Role: {user.role}") 
        
        
#         access_token = create_access_token(
#             identity=user.user_id, 
#             additional_claims={"email": user.email, "role": user.role},  
#             expires_delta=timedelta(days=30)
#         )
        
#         return {"access_token": access_token}, 200  
from project.app.model.ActiveUsers import ActiveUserSession
from project.app.model.User import User
from project.app.db import db
from flask_jwt_extended import create_access_token
from datetime import datetime, timedelta

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
            return {"message": "Invalid email or password"}, 401

        print(f"User logging in: {user.email}, Role: {user.role}")

        # ✅ Update or create ActiveUserSession
        existing_session = session.query(ActiveUserSession).filter_by(user_id=user.user_id).first()

        if existing_session:
            existing_session.login_time = datetime.utcnow()
            existing_session.is_active = True
        else:
            new_session = ActiveUserSession(user_id=user.user_id, login_time=datetime.utcnow(), is_active=True)
            session.add(new_session)

        # ✅ Create JWT
        access_token = create_access_token(
            identity=user.user_id,
            additional_claims={"email": user.email, "role": user.role},
            expires_delta=timedelta(days=30)
        )

        return {"access_token": access_token}, 200
