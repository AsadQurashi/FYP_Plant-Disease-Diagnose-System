from project.app.model.User import User
from project.app.db import db
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import scoped_session
from werkzeug.security import generate_password_hash
from project.app.schema.UserSchema import UserSchema

class UserRepository:
    
    @staticmethod
    def get_session():
        return db.session
    
    @staticmethod
    def add_user(args: dict, session: scoped_session):
        try:
            hashed_password = generate_password_hash(args['password'])
            # user_role = 'user'
            user = User(
                username=args['username'], 
                email=args['email'], 
                password=hashed_password, 
                # role = args['role']
            )
            user.role = 'user'
            session.add(user)
            session.commit()  

            return user
        except IntegrityError as e:
            session.rollback()
            raise ValueError("User with this email or username already exists.")
        except Exception as e:
            session.rollback()
            raise e
        
    @staticmethod
    def get_user(id: int, session):
        # Make sure you're calling query on session, not on user_id
        result = session.query(User).filter(User.user_id == id).first()
        # breakpoint()
        return result

    @staticmethod
    def get_all_users(session: scoped_session):
        try:
            query = session.query(User)  
            users = query.all()
            return users
        except Exception as e:
            raise e


    @staticmethod
    def update_user_details(user, args:dict):
        user.username = args.get("username", user.username)
        user.email = args.get("email", user.email)
        if args.get("password"):
            user.password = generate_password_hash(args["password"])
        # user.role = args.get("role", user.role)
        
        return user
    
    @staticmethod
    def delete_user_by_id(args, session: scoped_session):
        user_id = args.get("user_id")
        try:
            user = session.query(User).filter(User.user_id == user_id).first()
            
            if not user:
                return None
            deleted_user = UserSchema().dump(user)
            session.delete(user)
            session.commit()
            
            return deleted_user
        except Exception as e:
            session.rollback() 
            raise e

