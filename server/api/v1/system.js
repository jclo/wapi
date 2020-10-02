/** ****************************************************************************
 *
 * Defines the System API.
 *
 *
 * Private Functions:
 *  . none
 *
 *
 * Public Methods:
 *  . getVersion                  requests for Wapi Version,
 *
 *
 *
 * @exports   system
 * @author    -
 * @since     0.0.0
 * @version   0.0.0
 * ************************************************************************** */
/* eslint one-var: 0, semi-style: 0  */


// -- Vendor Modules


// -- Project Modules


// -- Local Constants


// -- Local Variables


// -- Public Methods -----------------------------------------------------------

const system = {

  // Handle GET method
  GET: [
    { path: 'getversion', controller: 'controller/system', fn: 'getVersion' },
  ],

  // Handle POST method
  POST: [
    { },
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
module.exports = system;
