/** ****************************************************************************
 *
 * Defines a middleware that checks if the given account is authentified into
 * the database.
 *
 *
 * Private Methods:
 *  . none,
 *
 *
 * Public Methods:
 *  . auth                        returns if the caller is authentified or not,
 *
 *
 *
 * @exports   authentication
 * @author    -
 * @since     0.0.0
 * @version   -
 * ************************************************************************** */
/* eslint one-var: 0, semi-style: 0, no-lonely-if: 0 */


// -- Node Modules
const KZlog = require('@mobilabs/kzlog');


// -- Project Modules
const config  = require('../config.js')
    , account = require('../lib/account.js')
    ;


// -- Local constants
const { level } = config
    , log       = KZlog('core/http.js', level, false)
    ;


// Local variables


// -- Public -------------------------------------------------------------------

const authentication = function(req, res, next) {
  // Extract 'Authorisation' from header:
  const auth = req.header('Authorization') ? req.header('Authorization').split(' ') : [];

  if (auth.length > 0 && auth[0] === 'Bearer') {
    // It's a request with a Bearer token. Check if this token is valid:
    account.isThisTokenValid(auth[1], (msg) => {
      switch (msg) {
        // Everything seems good. Let's go on!
        case 'valid':
          next();
          break;

        // This token has expired!
        case 'expired':
          res.status(401).send({ status: 'error', message: `Your token ${auth[1]} has expired!` });
          log.info(`The token ${auth[1]} has expired.`);
          break;

        // This token is not valid!
        case 'unknown':
          res.status(401).send({ status: 'error', message: `Your token ${auth[1]} is not valid!` });
          log.info(`The token ${auth[1]} is not valid.`);
          break;

        // It seems there is a misundertanding between us!
        default:
          log.error(`The response ${msg} of account.isThisTokenValid is not understood!`);
      }
    });
  } else if (req.session.user_id) {
    // Ok. It's an open session with cookies. Let's go on!
    next();
  } else {
    // Where is no token and no open session. Check if the API requests for
    // an oauth 2 or a session authentication:
    if (req.params[0].match(/oauth2\/token/) || req.params[0].match(/auth\/login/)) {
      // Ok. Let's go on!
      next();
    } else {
      // It's a request without authentication. Say no!
      res.status(401).send({ status: 'error', message: 'This request requires an user authentication!' });
      log.info('This request requires an user authentication!');
    }
  }
};


// -- Export
module.exports = authentication;
