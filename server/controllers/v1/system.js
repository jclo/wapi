/** ****************************************************************************
 *
 * Defines the controller that processes the system calls.
 *
 *
 * Private Methods:
 *  . none,
 *
 *
 * Public Methods:
 *  . getVersion                  returns the current version of Wapi,
 *
 *
 *
 * @exports   system
 * @author    -
 * @since     0.0.0
 * @version   -
 * ************************************************************************** */
/* eslint one-var: 0, semi-style: 0 */


// -- Node Modules


// -- Project Modules


// -- Local constants
const { version } = require('../../../package.json');


// Local variables


// -- Public Methods -----------------------------------------------------------

const system = {
  /**
   * Returns the version.
   * Method: GET
   *
   * @method (arg1, arg2)
   * @public
   * @param {Object}        ExpressJS require object,
   * @param {Object}        ExpressJS request object,
   * @returns {}            -,
   * @since 0.0.0
   */
  getVersion(req, res) {
    res.status(200).send({ status: 'Ok', message: version });
  },
};


// -- Export
module.exports = system;
