from project.app.repository.UserRepository import UserRepository
from project.app.schema.UserSchema import UserSchema
from flask import jsonify
from http import HTTPStatus

class UserBLC:

    @staticmethod
    def add_user(args: dict):
        session = UserRepository.get_session()
        try:
            users = UserRepository.add_user(args, session)
            session.commit() 
            user_schema = UserSchema()
            result = user_schema.dump(users)
            return result
        except Exception as e:
            session.rollback()
            raise e
    
    @staticmethod
    def fetch_user_by_id(args):
        id = args.get("id")  
        session = UserRepository.get_session()
        try:
            result = UserRepository.get_user(id,session)
            # breakpoint()
            return result
        except Exception as e:
            raise e
        
    @staticmethod
    def get_all_users():
        session = UserRepository.get_session()
        try:
            result = UserRepository.get_all_users(session)
            return result
        except Exception as e:
            raise e


    @staticmethod
    def update_user_by_id(args: dict):
        session = UserRepository.get_session()
        try:
            user = UserRepository.get_user(args.get('user_id'), session)  
            if not user:
                return {"error!" : "User id not found!"}
            
            updated_user = UserRepository.update_user_details(user, args)
            session.commit()
            
            schema = UserSchema()
            result = schema.dump(updated_user)
            
            return {"message" : "user updated successfully!", "result" : result}
        except Exception as e:
            session.rollback()
            return {"error!" : str(e)}
        
    @staticmethod
    def deleted_user_by_id(args):
        session = UserRepository.get_session()
        try:
            res = UserRepository.delete_user_by_id(args, session)
            if res:
                return {"message": "User deleted successfully", "result": res}
            else:
                return {"message": "User with this id not found!"}
        except Exception as e:
            return {"error!": str(e)}

