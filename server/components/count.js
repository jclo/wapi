/** ****************************************************************************
 *
 * Defines a middleware that counts the API calls.
 *
 *
 * Private Functions:
 *  . none,
 *
 *
 * Public Methods:
 *  . count                       returns the count middleware,
 *
 *
 *
 * @exports   count
 * @author    -
 * @since     0.0.0
 * @version   0.0.0
 * ************************************************************************** */
/* eslint one-var: 0, semi-style: 0  */


// -- Node Modules
const KZlog = require('@mobilabs/kzlog');


// -- Project Modules
const config  = require('../config.js')
    ;


// -- Local constants
const { level } = config
    , log       = KZlog('core/count.js', level, false)
    ;


// -- Local variables
let counter  = 0;


// -- Public -------------------------------------------------------------------

const count = function() {
  return function(req, res, next) {
    log.info(`count: ${counter += 1}`);
    next();
  };
};


// -- Export
module.exports = count;
