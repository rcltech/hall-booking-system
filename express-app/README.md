# Express Back-end for Hall Booking System

### Development Mode
Make sure that you have installed nodemon, and node modules.

`npm install -g nodemon` and `npm install`

Configure your local environment variables in a `.env` file by referring to `.env.sample`.

Initiate Nodejs server using nodemon on local development.

`npm run develop`

Push to Heroku for testing. This is **not recommended** because [Travis CI](https://travis-ci.org/) is able to automatically deploy to Heroku after testing the express-app.

`npm run push-heroku`

### API Endpoints
Start with [https://hall-booking-system.herokuapp.com](https://hall-booking-system.herokuapp.com)

1. Query all rooms for corresponding booking info: `/room` (get request)
1. Create a new booking: `/booking/create` (post request)
