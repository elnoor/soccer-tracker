# Soccer Tracker
A simple tracking app for organizing/viewing expenses and payments related to our casual soccer gatherings.

## https://futbol25.vercel.app

### Story
We play soccer every week with friends. I am the one who usually organizes: booking fields, paying for bookings, buying new balls/pinnies etc. I used to have an Excel sheet to keep track of all the expenses and debts. Though I always craved for something simpler, so, here it is! A super simple soccer tracker app! P.S. actually this app is pretty generic and can be used for other purposes too.

### Stack
Built using Tailwind, React, Next.js, Vercel, Postgres.

I wanted to give a try to newer version of Next.js and Vercel's new serverless storage. Some of the things are new to me and I also wanted to do this quick, so the code may not be perfect.
I used [Vercel Postgres Next.js Starter template](https://vercel.com/templates/next.js/postgres-starter) that uses [Vercel Postgres](https://vercel.com/postgres) as the database to accelarate the development.

### Auth
The app has an extremely simple cookie-based authentication that allows a single user to "log in". The actual password is stored as an environment variable with name `ADMIN_PASSWORD`. One can go to `/auth` path in order to enter password and authenticate. Once the password is entered, it will be matched against the one stored in environment variables and if matched a cookie will be created.

### Seeding
Once authenticated, go to `/seed` path in order to create `players` and `transactions` tables and some dummy records in them.

### Features
 - Players can view their balances and transactions.
 - Admin can view/add/edit/delete players. A player can be flagged as "Guest". Past players can be flagged as not "Active".
 - Admin can view/add/edit/delete transactions which are used to track a player's balance.
 - Bulk transactions: same transaction can be added for multiple users.

