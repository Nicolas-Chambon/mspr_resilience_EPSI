
# Setup and build the client

FROM node:9.4.0-alpine as client

WORKDIR /usr/app/client/
COPY client/package*.json ./
RUN npm install -qy
COPY client/ ./

RUN npm run build


# Setup the server

FROM node:9.4.0-alpine

WORKDIR /usr/app/
COPY --from=client /usr/app/client/build/ ./client/build/

WORKDIR /usr/app/server/
COPY server/package*.json ./
RUN npm install -qy
COPY server/ ./

ENV PORT 8000
ENV HOST 0.0.0.0
ENV AWS_ACCESS_KEY_ID "AKIAJ2XV5O5YA2EBVAWQ"
ENV AWS_SECRET_ACCESS_KEY "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"
ENV AWS_DEFAULT_REGION "us-east-1"

EXPOSE 8000

CMD ls && ls ..
CMD ["npm", "start"]
