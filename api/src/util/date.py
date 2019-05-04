import datetime


def to_string(str_to_parse):
    return int(datetime.datetime.strptime(str_to_parse, "%Y-%m-%d %H:%M:%S").timestamp())
