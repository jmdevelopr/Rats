# Rats
A blog owned by a fake artist made for their fans to make both sides able to communicate better with each other.

It is still in progress.

## How to run the app
1. Fork or download the project
2. Install the dependencies using the `npm i` command
3. Start the web server using the `npm run node` command and go to http://localhost:3000/ on your browser

## Features
- Authentication
  - users can sign up, log in and out
  - users get validated so there can't be two the same emails
  - the password gets encrypted by a bcrypt library before sending a user to a database for a better security
  - after logging in and signing up the user gets a token that declares whether a user is logged in or not
  - users can change their password which also gets encrypted
  - users can delete their accounts
  
- Commenting posts
  - a comment gets sent to a backend and then to a database and gets displayed for all users as well as their username
  
- Reacting to posts
  - reactions are stored in a database for every post and for every user
  - reactions stored in posts declare a count
  - reactions stored in users get highlighted by a different font color if a user reacted before to a specific post
  
- Preferences
  - users can set u whether they want their name to be displayed in the comments or not
  - users can toggle between a dark mode and light mode
  - all the preferences get saved so they stay the same in the next sessions
  
## Known bugs yet to be fixed
- A user can't log in anymore after reacting to a post

## Future features
- Displaying images on the posts instead of gray rectangles
- An artist account so they can add new posts on the website
- Profile pictures

## Dependencies used
- React
- react-router
- Redux
- redux-thunk
- Express
- Node
- bcrypt
- jsonwebtoken
- mongoose
- mongodb
- webpack
