#base image
FROM node:16.14.2


#RUN mkdir -p /usr/app/
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci


COPY ./ ./

#RUN npm install
#RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
