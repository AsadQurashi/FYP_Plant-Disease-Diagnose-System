from project import api
from flask_migrate import Migrate
from project.app.db import db

application = api.create_app()
migrate = Migrate(application, db)

if __name__ == "__main__":
    application.run(host="0.0.0.0",  debug=True)
