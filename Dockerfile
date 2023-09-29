FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Bundle app source
COPY . .

# Run the app
CMD yarn start
