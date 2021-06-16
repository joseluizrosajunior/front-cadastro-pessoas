FROM nginx:latest
MAINTAINER Jose Luiz
COPY /dist /usr/share/nginx/html
EXPOSE 80