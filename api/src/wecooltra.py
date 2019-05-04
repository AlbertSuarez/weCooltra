import connexion

from flask_cors import CORS

from src.util import log
from src.db import sqlalchemy


connexion_app = connexion.FlaskApp(__name__, specification_dir='./openapi/')
flask_app = connexion_app.app
flask_app.config['JSON_AS_ASCII'] = False
connexion_app.add_api('openapi.yaml', arguments={'title': 'weCooltra API'})

CORS(flask_app)


@flask_app.teardown_appcontext
def shutdown_session(exception=None):
    log.debug('Session removed: {}'.format(exception))
    sqlalchemy.db_session.remove()


@flask_app.route('/')
def alive_check():
    return "Welcome to weCooltra API!", 200
