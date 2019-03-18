FROM node:10

ENV JAUS_PORT 8888
ENV JAUS_DB_LOC /data
VOLUME [ "/data" ]

ADD package.json /tmp/package.json

RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

COPY ./ /opt/app/

CMD [ "node", "/opt/app/server.js" ]
