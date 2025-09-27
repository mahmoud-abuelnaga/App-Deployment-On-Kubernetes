FROM node:alpine3.22

# arguments
ARG PORT=80

WORKDIR /app

# files
COPY package*.json .
RUN npm ci --only=production
COPY src ./src

# env. vars
ENV PORT=${PORT}
ENV NODE_ENV="production"
ENV STARTUP_DELAY="0"
ENV IS_LIVE="true"
ENV IS_READY="true"
ENV APP_COLOR="red"
ENV DB_SERVER_URI="mongodb://db-headless-service:27017"
ENV DB_NAME="colors"
ENV DB_USER="colors-user"
ENV DB_USER_PASSWORD="colors-user-password"


EXPOSE ${PORT}

ENTRYPOINT [ "npm" ]
CMD [ "start" ]
