# Owl Express Back-end

### Development Mode

Make sure that you have installed nodemon, and node modules.

`npm install -g nodemon` and `npm install`

Configure your local environment variables in a `.env` file by referring to `.env.sample`.

Initiate Nodejs server using nodemon on local development.

`npm run develop`

Push to Heroku for testing. This is **not recommended** because [Travis CI](https://travis-ci.org/) is able to automatically deploy to Heroku after testing the express-app. Hence, the following command manually pushes the express-app directory as a git subtree to Heroku.

`npm run push-heroku`

If the above fails, use

`npm run push-heroku-force`

This creates a temporary branch called `heroku`, pushes that branch's express-app to Heroku, and then deletes the branch.

### API Endpoints

Start with [https://rctech-owl.herokuapp.com/](https://rctech-owl.herokuapp.com/)

1. Query all rooms for corresponding booking info: `/room` (get request)
1. Create a new booking: `/booking/create` (post request)
1. Read the bookings of a particular user: `/booking/` (get request)
