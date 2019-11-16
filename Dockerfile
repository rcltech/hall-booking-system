FROM node:latest
WORKDIR /app
COPY . /app
RUN ["npm", "install", "--silent"]

# expose web pack server
EXPOSE 3000

CMD ["npm", "run", "start"]
