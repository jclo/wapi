/** ****************************************************************************
 *
 * Defines the OAUTH Authentication API.
 *
 *
 * Private Functions:
 *  . none
 *
 *
 * Public Methods:
 *  . token                       requests for a OAuth token,
 *
 *
 *
 * @exports   oAuth
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

const oAuth = {

  // Handle GET method
  GET: [
    { },
  ],

  // Handle POST method
  POST: [
    { path: 'token', controller: 'oauth2', fn: 'token' },
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
module.exports = oAuth;
