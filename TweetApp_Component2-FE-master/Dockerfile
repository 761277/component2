# # Step 1
# FROM node:10-alpine as build-step
# RUN mkdir /app
# WORKDIR /app
# COPY package.json /app
# RUN npm install
# COPY . /app
# RUN npm run build 
# # Stage 2
# FROM nginx:1.17.1-alpine
# COPY --from=build-step /app/build /usr/share/nginx/html

# Stage 1
FROM node:10-alpine as build-step

RUN mkdir -p /src

WORKDIR /src

COPY package.json /src

RUN npm install

COPY . /src

RUN npm run build --prod

# Stage 2

FROM nginx:1.17.1-alpine
COPY --from=build-step /src/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx","-g","daemon off;"]