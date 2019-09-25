FROM node.10.16.3-alpine
#FROM node:10

RUN mkdir /app
ADD . /app

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package*.json ./

#RUN npm install
# If you are building your code for production
 #RUN npm ci --only=production

# Bundle app source
#COPY . .

#EXPOSE 8080
#CMD [ "node", "server.js" ]

CMD node app.js --bind localhost:$PORT


################ Docker Command ######################
#cd doodle\cheers2019 ; docker build -t mamun131/cheers2019 .
#docker run -it --rm mamun131/cheers2019
#docker login ; docker push mamun131/cheers2019