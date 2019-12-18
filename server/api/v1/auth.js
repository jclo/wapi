/** ****************************************************************************
 *
 * Defines the Authentication API.
 *
 *
 * Private Functions:
 *  . none
 *
 *
 * Public Methods:
 *  . login                       login,
 *  . logout                      logout,
 *
 *
 *
 * @exports   auth
 * @author    -
 * @since     0.0.0
 * @version   0.0.0
 * ************************************************************************** */
/* eslint one-var: 0, semi-style: 0  */


// -- Node modules


// -- Project modules


// -- Local constants


// -- Local variables


// -- Public Methods -----------------------------------------------------------

const auth = {

  // Handle GET method
  GET: [
    { path: 'logout', controller: 'auth', fn: 'logout' },
  ],

  // Handle POST method
  POST: [
    { path: 'login', controller: 'auth', fn: 'login' },
  ],

  // Handle PUT method
  PUT: [
    { },
  ],

  // Handle DELETE method
  DELETE: [
    { },
  ],
};


// -- Export
module.exports = auth;
