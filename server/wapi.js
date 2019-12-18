/** ****************************************************************************
 *
 * Resolves wapi.
 *
 *
 * Private Methods:
 *  . none,
 *
 *
 * Public Methods:
 *  . none,
 *
 *
 *
 * @exports   wapi
 * @author    -
 * @since     0.0.0
 * @version   -
 * ************************************************************************** */
/* eslint global-require: 0, import/no-unresolved: 0 */

// -- Node Modules


// -- Project Modules


// -- Local constants


// -- Local variables
let wapi;


// -- Main section -

try {
  if (require.resolve('@mobilabs/wapi')) {
    wapi = require('@mobilabs/wapi');
  }
} catch (e) {
  wapi = require('../index');
}

// -- Export
module.exports = wapi;
