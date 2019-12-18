/** ****************************************************************************
 *
 * Defines the controller that processes the OAUTH Authentication.
 *
 *
 * Private Methods:
 *  . none,
 *
 *
 * Public Methods:
 *  . token                       request for an access token,
 *
 *
 *
 * @exports   oauth
 * @author    -
 * @since     0.0.0
 * @version   -
 * ************************************************************************** */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Node Modules
const auth = require('basic-auth')
    , KZlog = require('@mobilabs/kzlog')
    ;


// -- Project Modules
const account = require('../../lib/account.js')
    , config  = require('../../config.js')
    ;


// -- Local constants
const { level } = config
    , log       = KZlog('core/http.js', level, false)
    ;


// Local variables


// -- Public Methods -----------------------------------------------------------

const oauth = {
  /**
   * Requests for an access token.
   * Method: POST
   *
   * @method (arg1, arg2)
   * @public
   * @param {Object}        ExpressJS require object,
   * @param {Object}        ExpressJS request object,
   * @returns {}            -,
   * @since 0.0.0
   */
  token(req, res) {
    // Extract the client_id:client_secret from the http header:
    const user = auth(req);
    // Extract the refresh token from the http header:
    const refreshToken = req.header('refresh_token');

    switch (req.body.grant_type) {
      case 'client_credentials':
        account.getUserCredentials(user.name, user.pass, (data) => {
          if (data) {
            // Return a new token:
            account.getToken(data._id, (token) => {
              res.status(200).send({ status: 'Ok', message: token });
              log.info('A new token has been sent.');
            });
          } else {
            // Wrong username and/or wrong password:
            res.status(401).send({ status: 'error', message: `${req.body.user} and ${req.body.password} don't match!` });
            log.info(`${req.body.user} doesn't exist or wrong password.`);
          }
        });
        break;

      case 'refresh_token':
        if (refreshToken) {
          // Try to refresh the access token:
          account.refreshToken(user, refreshToken, (err, data) => {
            if (err) {
              // Answer why that token can't be refreshed:
              res.status(401).send({ status: 'error', message: err });
              log.info(err);
            } else {
              // Return a new access token:
              res.status(200).send({ status: 'Ok', message: data });
              log.info('A new token has been sent.');
            }
          });
        } else {
          // Answer missing refresh token:
          res.status(401).send({ status: 'error', message: 'The refresh token is missing!' });
          log.info('The refresh token is missing in the header!');
        }
        break;

      default:
        if (req.body.grant_type) {
          // Answer wrong Grant Type:
          res.status(401).send({ status: 'error', message: `The Grant Type '${req.body.grant_type}' is not supported!` });
          log.info(`The Grant Type '${req.body.grant_type}' is not supported!`);
        } else {
          // Answer missing Grant Type:
          res.status(401).send({ status: 'error', message: 'You have to specify a \'Grant Type\'' });
          log.info('The Grant Type is not specified!');
        }
    }
  },
};


// -- Export
module.exports = oauth;
