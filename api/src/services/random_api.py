import requests

from src import *
from src.util import log


def get_random_personality():
    for attempt in range(0, 3):
        try:
            response = requests.get(RANDOM_API_ENDPOINT, timeout=15)
            if not response.ok:
                raise Exception(response.status_code)
            response = response.json()
            response = response['results'][0]
            return response
        except Exception as e:
            log.warn('Error calling RandomAPI [{}]: [{}]'.format(e, 'NULL' if not e.args else e.args[0]))
    return None
