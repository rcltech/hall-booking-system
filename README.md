# Owl - RC Lee Hall Booking System

### To open issues for project enhancement

Open issues according to the project enhancement template.

### To make git commits according to an issue being worked

Make sure that you are on a feature branch. If not, do

`git checkout -b branch-name`

Commit message should follow this format.

`git commit -m '[verb in present tense] [item being worked]' -m '#[issue number]'`

For example: `git commit -m 'create user login component' -m '#3'`

Push to this repository.

For first commit on branch: `git push -u origin branch-name`

For subsequent commits on branch: `git push`

### To merge into master branch

1. Create a pull request to merge feature branch into `master`.
2. Request for at least 1 review.
3. Squash and merge into `master` after the pull request has been approved.

- If this fails, that means your branch is not up to date with master. Run `git rebase -i master`; more info can be found [here](<(https://riptutorial.com/git/example/1211/local-branch-rebasing)>). After rebasing, forcefully push to remote using `git push -f`.

### Important Notes

1. Make sure to `git pull` before working on anything at the start of the day.
2. The `master` branch is protected from direct pushes. You have to make feature branches by following the instructions above.

### React Build

To manually build, either run:

1. `cd react-app && npm run build`, which builds into a `build` directory within `react-app/`
2. `npm run build`, which builds and copies into `express-app/`.

## React Frontend

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
