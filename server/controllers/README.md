# Controllers

The controllers are objects that execute operations required to process an API.

`Wapi` provides a controller for `basic authentication` as an example. This
controller `v1/auth.js` has two methods: `login` and `logout`.

`login` is called when `Wapi` receives the HTTPS POST request
`/api/v1/auth/login`. It checks if the provided credentials match an account
stored in the local database.

`logout` is called when `Wapi` receives the HTTPS GET request `/api/vi/auth/logout`.
It just deletes the the session `user_id`.

The best way to understand how it works, is to read the code!
