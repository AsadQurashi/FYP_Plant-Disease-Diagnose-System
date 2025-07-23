from sqlalchemy.orm import Session
from project.app.repository.LoginRepository import LoginRepository 

class LoginBLC:
    
    @staticmethod
    def login(args):
        session: Session = LoginRepository.get_session()
        
        try:
            result = LoginRepository.login(args, session)
            # breakpoint()
            session.commit()
            return result
        except Exception as e:
            session.rollback()
            print(f"Error in LoginBLC.login: {e}")  
            raise e
        finally:
            session.close()  
