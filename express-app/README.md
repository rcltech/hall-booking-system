# Express Back-end for Hall Booking System

### Development Mode
Make sure that you have installed nodemon, and node modules.

`npm install -g nodemon` and `npm install`

Configure your local environment variables in a `.env` file by referring to `.env.sample`.

Initiate Nodejs server using nodemon on local development.

`npm run develop`

Push to Heroku for testing.

`npm run push-heroku`

### API Endpoints
Start with [https://hall-booking-system.herokuapp.com](https://hall-booking-system.herokuapp.com)

1. Query all bookings for home page: `/` (get request)
1. Create a new booking: `/booking/create` (post request)
