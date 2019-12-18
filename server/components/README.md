# Components

Components are modules providing extended functionalities to your application. They
are loaded independently.

Components can be independent objects or middlewares.

This folder contains three examples of components:

  . `auth.js` is a component providing basic authentication by checking if the
    provided account is registered into the local database.

  . `count.js` is an ExpressJS middleware counting the number of HTTP/HTTPS requests.

  . `forcehttps` is another ExpressJS middleware forcing HTTPS redirections.

Middlewares are loaded at startup via `app.use()`. They have to be referenced in
the `middleware` array declared in `./config.js` file.
