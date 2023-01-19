FROM node:16.6-stretch-slim

ENV APP_DIR /home/node/example
WORKDIR $APP_DIR

ENV PATH $APP_DIR/node_modules/.bind:$PATH

COPY package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

CMD ["npm", "start"]