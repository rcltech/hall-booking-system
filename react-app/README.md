# React Frontend

### Running a local development environment

Clone this repository, and navigate to `react-app` directory.

`cd react-app`

Install node packages using npm.

`npm install`

Start the development server.

`npm run start`

### Test driving the application

##### Using Docker and without cloning our Github repository

Pull our public repository at Docker hub.

`docker run --name owl --rm -p 3000:3000 rctechclub/owl:dev`

- `-d` enables terminal detached mode (optional)
- `--name` sets a short name for the docker container
- `--rm` removes the docker container if a stop command is executed
- `-p 3000:3000` plugs the container's port from 3000 to 3000

Now, you may navigate to `localhost:3000`.

Stop the container by either

- `CTRL + C` if you run without `-d`
- `docker stop owl` if you run with `-d`

Remove the image if necessary.

`docker rmi rctechclub/owl:dev`

**Note that this does not enable hot reloading**

### Docker Build and Push

To build an image.

`npm run docker:build`

To push to public repository – only for those who are part of the rctechclub organisation on Docker hub.

`npm run docker:push`
