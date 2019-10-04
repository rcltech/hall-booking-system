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
3. Merge into `master` after the pull request has been approved.

### Important Notes
1. Make sure to `git pull` before working on anything at the start of the day.
2. The `master` branch is protected from direct pushes. You have to make feature branches by following the instructions above.
