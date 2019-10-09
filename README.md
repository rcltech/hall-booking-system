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
