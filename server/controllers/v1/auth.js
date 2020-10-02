/** ****************************************************************************
 *
 * Defines the controller that processes the Authentication.
 *
 *
 * Private Methods:
 *  . none,
 *
 *
 * Public Methods:
 *  . logout                      closes the current session,
 *  . login                       opens a session,
 *
 *
 *
 * @exports   auth
 * @author    -
 * @since     0.0.0
 * @version   -
 * ************************************************************************** */
/* eslint one-var: 0, semi-style: 0 */


// -- Vendor Modules
const KZlog = require('@mobilabs/kzlog')
    ;


// -- Project Modules
const config  = require('../../config.js')
    , account = require('../../lib/account.js')
    ;


// -- Local Constants
const { level } = config
    , log       = KZlog('controllers/auth.js', level, false)
    ;


// -- Local Variables


// -- Public Methods -----------------------------------------------------------

const auth = {

  /**
   * Logout from the session.
   * Method: GET
   *
   * @function (arg1, arg2)
   * @private
   * @param {Object}      ExpressJS require object,
   * @param {Object}      ExpressJS request object,
   * @returns {}          -,
   * @since 0.0.0
   */
  logout(req, res) {
    delete req.session.user_id;
    res.status(200).send({ status: 'Ok', message: 'You are now disconnected!' });
    log.info('You are now disconnected!');
  },

  /**
   * Opens a new session.
   * Method: POST
   *
   * @function (arg1, arg2)
   * @private
   * @param {Object}      ExpressJS require object,
   * @param {Object}      ExpressJS request object,
   * @returns {}          -,
   * @since 0.0.0
   */
  login(req, res) {
    log.info(`user: ${req.body.user}, password: ${req.body.password}.`);

    // Check if this account exists
    account.getUserCredentials(req.body.user, req.body.password, (user) => {
      if (user) {
        // Right username and right password:
        req.session.user_id = req.body.user;
        res.status(200).send({ status: 'Ok', message: 'You are now connected!' });
        log.info(`req.session.user_id: ${req.session.user_id}.`);
        log.info('You are now connected!');
      } else {
        // Wrong username and/or wrong passowrd:
        res.status(401).send({ status: 'error', message: `${req.body.user} and ${req.body.password} don't match!'` });
        log.info(`${req.body.user} + ' doesn't exist or wrong password.`);
      }
    });
  },
};


// -- Export
module.exports = auth;
