FROM python:3.6
ADD . /srv/wecooltra
WORKDIR /srv/wecooltra
RUN pip install --upgrade pip
RUN pip3 install -r requirements.lock
CMD uwsgi --ini wecooltra.ini