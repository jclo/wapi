/** ****************************************************************************
 *
 * Starts the Http and Https servers.
 *
 *
 * Private Methods:
 *  . _certificates               returns the SSL certificates,
 *
 *
 * Public Methods:
 *  . startHttp                   starts the HTTP server,
 *  . startHttps                  Starts the HTTPS server,
 *
 *
 *
 * @exports   server
 * @author    -
 * @since     0.0.0
 * @version   -
 * ************************************************************************** */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Node Modules
const fs    = require('fs')
    , http  = require('http')
    , https = require('https')
    , KZlog = require('@mobilabs/kzlog')
    ;


// -- Project Modules
const config = require('../config.js');


// -- Local constants
const { level } = config
    , log       = KZlog('core/http.js', level, false)
    ;


// Local variables


// -- Private Functions --------------------------------------------------------

/**
 * Returns the SSL certificates.
 *
 * @function (arg1)
 * @private
 * @param {String}          the root path,
 * @returns {Object}        returns the private key and the public certificate,
 * @since 0.0.0
 */
const _getCertificates = function(base) {
  return {
    key: fs.readFileSync(`${base}/ssl/server-key.pem`, 'utf8'),
    cert: fs.readFileSync(`${base}/ssl/server-cert.pem`, 'utf8'),
  };
};


// -- Public Mathods -----------------------------------------------------------

const server = {

  /**
   * Starts the HTTP server.
   *
   * @function (arg1, arg2)
   * @public
   * @param {Object}        the web app object,
   * @param {Object}        the app config,
   * @returns {}            -,
   * @since 0.0.0
   */
  startHttp(app, conf) {
    http.createServer(app)
      .on('error', (e) => {
        if (e.code === 'EACCES') {
          log.error(`You don't have the privileges to listen the port: ${conf.env.httpport}.`);
        } else {
          log.error(e);
        }
      })
      // '127.0.0.1' means allowing access to the local machine only. If you
      // want to authorize the server to listen any machines on the
      // network, replace '127.0.0.1' by '0.0.0.0'.
      .listen(conf.env.httpport, conf.env.network, () => {
        log.trace(`http listening on port ${conf.env.httpport}.`);
      });
  },

  /**
   * Starts the HTTPS server.
   *
   * @function (arg1, arg2, arg3)
   * @public
   * @param {Object}        the web app object,
   * @param {Object}        the app config,
   * @param {String}        the web server root path,
   * @returns {}            -,
   * @since 0.0.0
   */
  startHttps(app, conf, base) {
    if (conf.env.https && !process.env.TRAVIS) {
      https.createServer(_getCertificates(base), app)
        .on('error', (e) => {
          if (e.code === 'EACCES') {
            log.error(`You don't have the privileges to listen the port: ${conf.env.httpsport}.`);
          } else {
            log.error(e);
          }
        })
        .listen(conf.env.httpsport, conf.env.network, () => {
          log.trace(`https listening on port ${conf.env.httpsport}.`);
        });
    } else if (!conf.env.https) {
      log.trace('config.env.https is false, the https server is not started!');
    } else {
      log.trace('Wapi is runing on TRAVIS-CI, the https server is not started!');
    }
  },
};

// -- Export
module.exports = server;
