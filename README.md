# Authentication Demo featuring The Society for the Appreciation of Capybaras

![A preview gif of the end UI](/public/images/Untitled-1.gif)

A locally hosted backend system focused around authentication. Login, signup and logging user's most recent login are supported. Sessions, a reset password flow, and logout are in the process of being built.

Database: MySQL, with tables for users and sessions.
Backend and Middleware: Node.js, Express.js, Sequelize, Validator.js, bcrypt, morgan and more!
Frontend: EJS and CSS

## Notes on current stage of development

As this was my first project with MySQL and Sequelize, I faced some uncertainty with how to set up sessions. Currently sessions are initialized but they are not persistent, nor are they tied to the user upon logging in.

## How to install and run
You need Node and MySQL on your computer. Download the zip file or fork the repository and make a local copy. Open the root directory in terminal of your editor and use the CLI to run:

```npm init```

```npm install```

In the root directory, create a file named ".env" with the following fields:

```PORT = port number```

```DB_NAME = 'name of your database'```

```DB_PW = 'your database user password'```

```DB_USER = 'your database user name'```

Make sure your database server is live. Navigate to the ```root/models/User.js``` file and run it with the following CLI command: ```node user.js``` 

You should get a console message telling you the database synced successfully.

Once you've assured that your database is connected, you can fire up the server with the following command:

```npm start```

Open your browser and head to "localhost:PORT". You can now signup, login, etc. Have fun and find the capybara photo.

## Future Optimizations
:warning: = If the SFTAC was real, which it should be, these would be important to fix.

- [ ] Increased validation/sanitization on all forms :warning:
- [ ] Update hashing algorithm to Argon2
- [ ] Write functions to simplify database operations
- [ ] Write actual tests with Jest
- [ ] In-browser password reset flow with tokens
- [ ] Configure sessions (this is started) :warning:
- [ ] Google ReCaptchav3 on forms :warning:
- [ ] The UI is ugly :warning:

### A note on the tests

They are a bit hacky! These are just bits I wrote while building this to see outputs and/or check something was working.

![A capybara with a butterfly](/public/images/capybara.jpg)
