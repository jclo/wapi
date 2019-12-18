/** ****************************************************************************
 *
 * Defines ... (short explanation)
 *
 * ... (long description)
 *
 *
 * Private Functions:
 *  . ...                         ...,
 *
 *
 * Public Methods:
 *  . ...                         ...,
 *
 *
 * @exports   ???
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

const methods = {

  // Handle GET method
  GET: [
    { path: 'default', controller: 'path/to/controller', fn: 'getMethod' },
    { path: 'route/:id', controller: 'path/to/controller', fn: 'getMethod_plus' },
  ],

  // Handle POST method
  POST: [
    { path: 'default', controller: 'path/to/controller', fn: 'createMethod' },
  ],

  // Handle PUT method
  PUT: [
    { path: 'default', controller: 'path/to/controller', fn: 'updateMethod' },
  ],

  // Handle DELETE method
  DELETE: [
    { path: ':id', controller: 'path/to/controller', fn: 'deleteMethod' },
  ],
};


// -- Export
module.exports = methods;
