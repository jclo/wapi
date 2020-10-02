/** ****************************************************************************
 *
 * Manages the routes.
 *
 *
 * Private Methods:
 *  . _process                    processes the requested API,
 *
 *
 * Public Methods:
 *  . routes                      initializes the routes,
 *
 *
 *
 * @exports   routes
 * @author    -
 * @since     0.0.0
 * @version   -
 * ************************************************************************** */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Vendor Modules
const path  = require('path')
    , KZlog = require('@mobilabs/kzlog')
    ;


// -- Project Modules
const config = require('../config.js')
    ;


// -- Local Constants
const { level } = config
    , log       = KZlog('core/routes.js', level, false)
    ;


// -- Local Variables


// -- Private Functions --------------------------------------------------------

/**
 * Processes the requested API.
 *
 * @function (arg1, arg2, arg3, arg4)
 * @private
 * @param {Object}          the wapi object,
 * @param {Object}          ExpressJS require object,
 * @param {Object}          ExpressJS request object,
 * @param {Function}        Callback to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
const _process = function(...args) {
  const wapi = args[0]
      , req  = args[1]
      , res  = args[2]
      , base = `${wapi.base}/api/`
      ;

  let endpoint   = req.params[0].split('/')
    , { api }    = wapi
    , controller = wapi.controllers
    , dir
    , match
    , pos
    ;

  // Check if endpoint exists:
  dir = base;
  match = '';
  pos = 0;
  endpoint.forEach((obj, index) => {
    try {
      match = require.resolve(dir + obj);
      pos = index;
    } catch (e) {
      //
    } finally {
      dir += `${obj}/`;
    }
  });

  // So?
  if (match !== '') {
    // Yes, this endpoint exists!
    dir = endpoint.slice(pos + 1).toString().replace(/,/g, '/');
    endpoint.splice(pos + 1, 99);
    endpoint = endpoint.toString().replace(/,/g, '/');
    log.info(`'endpoint "${endpoint}" exists with the path: ${dir}.`);
  } else {
    // No, this api has no corresponding endpoint!
    endpoint = endpoint.toString().replace(/,/g, '/');
    res.status(404).send({ status: 'error', message: `'This endpoint "${endpoint}" does not exist!` });
    log.warn(`endpoint "${endpoint}" doesn't exist!`);
    return;
  }

  // Finds 'api' & 'cntrl' that match this endpoint:
  endpoint.split('/').forEach((obj) => { api = api[obj]; controller = controller[obj]; });
  // Check if controller exits
  if (!controller) {
    res.status(404).send({ status: 'error', message: `'There is no controller for the endpoint: "${endpoint}".` });
    log.error(`'There is no controller for the endpoint: ${endpoint}!`);
    return;
  }

  // Check if the requested method is supported:
  if (!Object.prototype.hasOwnProperty.call(api, req.method)) {
    // No!
    res.status(405).send({ status: 'error', message: `The method ${req.method} isn't allowed!` });
    log.error(`The method ${req.method} isn't allowed!`);
    return;
  }

  // Yes, it is! Check if the route is supported:
  pos = -1;
  if (dir === '') { dir = 'default'; }
  dir += '/';
  // Test if 'api[method] is an array:
  if (Object.prototype.toString.call(api[req.method]) !== '[object Array]') {
    log.error(`${api[req.method]} isn't and array!`);
    return;
  }
  api[req.method].forEach((obj, index) => {
    if (obj.path !== undefined) {
      // const regex = '^' + (obj.path.replace(/\/:id/, '') + '/').replace(/\//g, '\\/');
      const regex = `^${(`${obj.path.replace(/\/:id/, '')}/`).replace(/\//g, '\\/')}`;
      if (dir.match(regex) === null) {
        log.info(`This path "${obj.path}" doesn't match!`);
      } else {
        log.info(`This path "${obj.path}" matches!`);
        pos = index;
      }
    }
  });
  if (pos === -1) {
    // Route not supported.
    res.status(405).send({ status: 'error', message: `'This route: ${dir} isn't supported!` });
    log.warn(`This route "${path}" isn't supported!`);
    return;
  }

  // Check if controller 'fn' exists
  if (!Object.prototype.hasOwnProperty.call(controller, api[req.method][pos].fn)) {
    // Controller method not implemented!
    res.status(405).send({ status: 'error', message: `'This Controller method: "${api[req.method][pos].fn}" isn't supported!` });
    log.error(`This Controller method "${api[req.method][pos].fn}" isn't supported!`);
    return;
  }

  // All the tests succeeded! Call the controller:
  controller[api[req.method][pos].fn](req, res);
};


// -- Public -------------------------------------------------------------------

/**
 * Initializes the routes.
 *
 * @function (arg1, arg2, arg3)
 * @public
 * @param {Object}          the wapi object,
 * @param {Object}          the app config,
 * @param {Object}          the web app object,
 * @returns {}              -,
 * @since 0.0.0
 */
const routes = function(wapi, conf, app) {
  // Check if it is an Https request for '/api/*' routes:
  app.all('/api/*', (req, res, next) => {
    if (!conf.env.https) {
      log.info('Wapi is running in test mode, HTTP accesses are exceptionally authorized!');
      next();
    } else if (process.env.TRAVIS) {
      log.info('Wapi is running on TRAVIS-CI, HTTP accesses are exceptionally authorized!');
      next();
    } else if (!req.secure) {
      // Reject http requests except if wapi is running in test mode!
      res.status(401).send({ status: 'error', message: 'HTTP accesses are not authorized!' });
      log.info('HTTP accesses are not authorized!');
    } else {
      // Authorize https requests:
      log.info('It is an HTTPS request. Authorize it.');
      next();
    }
  });

  // Process API calls for all routes defined by /api/:id
  app.all('/api/*', wapi.components.auth, _process.bind(null, wapi));

  // Else return an error message:
  app.all('/*', (req, res) => {
    res.status(403).send({ status: 'error', message: 'This request is forbidden!' });
    log.warn('This request is forbidden!');
  });
};


// -- Export
module.exports = routes;
