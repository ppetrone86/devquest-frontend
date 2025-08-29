FROM node:22-alpine

WORKDIR /dev-quest

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm install -g @angular/cli@latest

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]
# ENTRYPOINT ["/bin/sh", "-c", "echo 'The container has been started' && tail -f /dev/null"] <= use this if you want run container without perform ng serve
