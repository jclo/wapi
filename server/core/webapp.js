/** ****************************************************************************
 *
 * Starts the Web app.
 *
 *
 * Private Methods:
 *  . _cors                       sets the CORS policy,
 *
 *
 * Public Methods:
 *  . startWebApp                 starts the web app,
 *
 *
 *
 * @exports   webapp
 * @author    -
 * @since     0.0.0
 * @version   -
 * ************************************************************************** */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Vendor Modules
const express      = require('express')
    , bodyParser   = require('body-parser')
    , cookieParser = require('cookie-parser')
    , session      = require('express-session')
    , KZlog        = require('@mobilabs/kzlog')
    ;


// -- Project Modules
const configu = require('../config.js')
    ;


// -- Local Constants
const { level } = configu
    , log       = KZlog('core/webapp.js', level, false)
    ;


// -- Local Variables


// -- Private Functions --------------------------------------------------------

/**
 * Sets the CORS policy.
 *
 * @function (arg1)
 * @private
 * @param {Object}          the configuration settings object,
 * @returns {Object}        returns the function to execute for defining the CORS policy,
 * @since 0.0.0
 */
const _cors = function(config) {
  return function(req, res, next) {
    res.header('Access-Control-Allow-Origin', config.cors.origin);
    res.header('Access-Control-Allow-Methods', config.cors.methods);
    res.header('Access-Control-Allow-Headers', config.cors.headers);
    next();
  };
};


// -- Public -------------------------------------------------------------------

/**
 * Starts the Web App.
 *
 * @function (arg1, arg2, arg3)
 * @public
 * @param {Object}          the wapi object,
 * @param {Object}          the config object,
 * @param {String}          the server root path,
 * @returns {Object}        returns the web app,
 * @since 0.0.0
 */
const webapp = function(wapi, config) {
  // Initialize Express:
  const env = process.env.NODE_ENV || 'development';
  if (env === 'development') {
    // configure stuff here
  }

  const app = express();
  app.enable('strict routing');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(session({
    name: config.session.key,
    secret: config.session.secret,
    cookie: { maxAge: config.session.maxAge },
    saveUninitialized: true,
    resave: true,
  }));
  app.use(_cors(config));

  // Load custom middlewares:
  config.middleware.forEach((obj) => {
    if (Object.prototype.hasOwnProperty.call(wapi.components, obj)) {
      app.use(wapi.components[obj].call());
      log.info(`Middleware: ${obj} loaded!`);
    } else {
      log.warn(`'Middleware: ${obj} isn't available!'`);
    }
  });

  // Serve the static pages (insecure):
  // app.use(express.static(path.join(base, config.env.staticpage)));
  app.use(express.static('./public'));

  return app;
};


// -- Export
module.exports = webapp;
