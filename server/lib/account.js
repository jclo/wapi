/** ****************************************************************************
 *
 * Manages the OAUTH Tokens.
 *
 *
 * Private Methods:
 *  . _generateUniqueTokenString  returns a unique string of 32 chars,
 *  . _accessTokenExpireIn        returns the lifetime for the access token,
 *  . _refreshTokenExpireIn       returns the lifetime for the refresh token,
 *  . _setToken                   returns a new token,
 *  . _refresh                    refreshes the access token,
 *
 *
 * Public Methods:
 *  . init                        initializes the in-memory account database,
 *  . getUserCredentials          retrieves the user's credentials from the db,
 *  . getToken                    returns a new token for this user,
 *  . isThisTokenValid            returns the token status,
 *  . refreshToken                updates the access token value,
 *
 *
 *
 * @exports   account
 * @author    -
 * @since     0.0.0
 * @version   -
 * ************************************************************************** */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Node Modules
const fs       = require('fs')
    , readline = require('readline')
    , PicoDB   = require('picodb')
    , _        = require('@mobilabs/overslash')
    ;


// -- Project Modules


// -- Local constants
const accounts = './server/accounts/accounts.db'
    , db       = PicoDB()
    , docs     = []
    ;


// -- Local variables


// -- Private Functions --------------------------------------------------------

/**
 * Returns a unique string of 32 chars.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {String}        returns a unique string of 32 chars.
 * @since 0.0.0
 */
const _generateUniqueTokenString = () => _.makeid(32);

/**
 * Returns the lifetime for the access token.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {Number}        returns the lifetime in seconds,
 * @since 0.0.0
 */
const _accessTokenExpireIn = () => 30 * 60;

/**
 * Returns the lifetime for the refresh token.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {Number}        returns the lifetime in seconds,
 * @since 0.0.0
 */
const _refreshTokenExpireIn = () => 24 * 60 * 60;

/**
 * Returns a new token.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {Object}        returns the new token,
 * @since 0.0.0
 */
const _setToken = () => ({
  scope: '',
  token_type: 'Bearer',
  expires_in: _accessTokenExpireIn(),
  expires_at: Date.now() + (_accessTokenExpireIn() * 1000),
  refresh_expires_at: Date.now() + (_refreshTokenExpireIn() * 1000),
  access_token: _generateUniqueTokenString(),
  refresh_token: _generateUniqueTokenString(),
});

/**
 * Refreshes the access token of the passed-in token object.
 *
 * Note: this function mutates the argument `token`.
 *
 * @function (arg1)
 * @private
 * @param {Object}          the token object,
 * @returns {Object}        returns the token object with a new value for
                            the access token,,
 * @since 0.0.0
 */
/* eslint-disable no-param-reassign */
const _refresh = (token) => {
  token.access_token = _generateUniqueTokenString();
  token.expires_at = Date.now() + (_accessTokenExpireIn() * 1000);
  return token;
};
/* eslint-enable no-param-reassign */


// -- Public Methods -----------------------------------------------------------

const account = {
  /**
   * Initializes the in-memory account database.
   *
   * @method()
   * @public
   * @param {}              -,
   * @returns {Object}      returns added users as a promise,
   * @since 0.0.0
   */
  init() {
    const rd = readline.createInterface({
      input: fs.createReadStream(accounts),
      output: process.stdout,
      terminal: false,
    });

    // Read line by line:
    rd.on('line', (line) => {
      docs.push(JSON.parse(line));
    });

    // Return promise when ended:
    return new Promise((resolve, reject) => {
      rd.on('close', () => {
        db.insertMany(docs, (err, data) => {
          // err ? reject(err) : resolve(data);
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    });
  },

  /**
   * Retrieves the user's credentials from the accounts db.
   *
   * @method(arg1, arg2, arg3)
   * @public
   * @param {String}        the username,
   * @param {String}        the password,
   * @param{Function}       the function to call at completion,
   * @returns {}            -,
   * @since 0.0.0
   */
  getUserCredentials(user, pass, callback) {
    db.find({ user_name: user, user_pwd: pass }).toArray((err, data) => {
      callback(!err ? data[0] : false);
    });
  },

  /**
   * Returns a new token for this user.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the user's id,
   * @param {Function}      the function to call at completion,
   * @returns {}            -,
   * @since 0.0.0
  */
  /* eslint-disable no-param-reassign */
  getToken(id, callback) {
    // Set a new token:
    const token = _setToken();

    // Save the token into account the db:
    db.updateOne({ _id: id }, { $set: { token } }, (err, doc) => {
      delete doc[0].token.expires_at;
      delete doc[0].token.refresh_expires_at;
      callback(doc[0].token);
    });
  },
  /* eslint-enable no-param-reassign */

  /**
   * Returns the token status (`valid`, `expired` or `unknown`).
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the token to find in the account db,
   * @param {Function}      the function to call at completion,
   * @returns {}            -,
   * @since 0.0.0
  */
  isThisTokenValid(tk, callback) {
    db.find({ token: { access_token: tk } }).toArray((err, doc) => {
      const now = Date.now();

      // Something?
      if (doc.length > 0) {
        // Yes. Check if this token is still valid:
        callback(now <= doc[0].token.expires_at ? 'valid' : 'expired');
      } else {
        // No token found!
        callback('unknown');
      }
    });
  },

  /**
   * Updates the access token value of the token object the contains
   * the passed-in refresh token.
   *
   * @method (arg1, arg2, arg3)
   * @public
   * @param {Object}        the client credentials,
   * @param {String}        the value of the refresh token,
   * @param {Function}      the function to call at completion,
   * @returns {}            -,
   * @since 0.0.0
  */
  /* eslint-disable no-param-reassign, max-len */
  refreshToken(user, tk, callback) {
    const now = Date.now();

    db.find({ token: { refresh_token: tk } }).toArray((err, doc) => {
      if (doc.length > 0) {
        // Check if client_id and refresh_token match:
        if (user.pass) {
          if (user.name !== doc[0].user_name || user.pass !== doc[0].user_pwd) {
            // client_id, client_secret and refresh_token do not match!
            callback(`The refresh_token ${tk}  does not match with the client_id ${user.name}  and/or the client_secret ${user.pass}!`);
            return;
          }
        } else if (user.name !== doc[0].user_name) {
          // This token does not belong to this client_id!
          callback(`The refresh_token ${tk} does not belong to the client_id ${user.name}!`);
          return;
        }

        // They match. Check if the refresh token is still valid:
        if (now <= doc[0].token.refresh_expires_at) {
          db.updateOne({ _id: doc[0]._id }, { $set: { token: _refresh(doc[0].token) } }, (error, docx) => {
            // Return to the client an expurgated version of the token :
            delete docx[0].token.expires_at;
            delete docx[0].token.refresh_expires_at;
            delete docx[0].token.refresh_token;
            callback(null, docx[0].token);
          });
        } else {
          // Tell that the refresh token has expired!
          callback(`The refresh_token ${tk} has expired!`);
        }
      } else {
        // Tell that this refresh token does not belong to any account!
        callback(`The refresh_token ${tk} is unknown!`);
      }
    });
  },
  /* eslint-enable no-param-reassign, max-len */
};

// -- Export
module.exports = account;
