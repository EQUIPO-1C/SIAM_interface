FROM node:latest

# Create app directory
WORKDIR /siam_interface

# Install app dependencies
COPY package.json /siam_interface/
RUN npm install

# Bundle app source
COPY . /siam_interface//

CMD [ "npm", "run", "server" ]
