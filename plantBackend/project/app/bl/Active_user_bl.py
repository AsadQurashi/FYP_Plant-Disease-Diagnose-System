from project.app.db import db
from project.app.model.ActiveUsers import ActiveUserSession
from project.app.model.User import User

class Actives:
    @staticmethod
    def get_active_users():
        active_users = (
            db.session.query(User)
            .join(ActiveUserSession)
            .filter(ActiveUserSession.is_active == True)
            .distinct()
            .all()
        )
        return active_users
