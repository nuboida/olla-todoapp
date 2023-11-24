# Builder container to compile typescript
FROM node:lts-alpine AS build
WORKDIR /usr/src/app

# install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# Copy the application source
COPY . .
# Build typescript
RUN npm run build

FROM nginx:latest

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/todolist-frontend /usr/share/nginx/html

EXPOSE 80
