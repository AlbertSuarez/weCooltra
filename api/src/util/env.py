import os


def get_env(env_key):
    if env_key in os.environ:
        return os.environ[env_key]
    return None
