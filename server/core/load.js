/** ****************************************************************************
 *
 * Attaches API Middlewares and Controllers functions to Wapi.
 *
 *
 * Private Methods:
 *  . _explore                    attaches the API, middlewares and controllers,
 *
 *
 * Public Methods:
 *  . load                        attaches the API, middlewares and controllers,
 *
 *
 *
 * @exports   load
 * @author    -
 * @since     0.0.0
 * @version   -
 * ************************************************************************** */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Node Modules
const fs    = require('fs')
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
 * Attaches the API, middlewares and controllers to Wapi.
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {String}          the base path,
 * @param {Array}           the module to attach,
 * @param {Array}           the recursive array,
 * @returns {}              -,
 * @since 0.0.0
 */
/* eslint-disable no-param-reassign, import/no-dynamic-require, global-require */
function _explore(base, module, array) {
  array[module] = [];
  const folder = `${base}/${module}/`;
  const c = fs.readdirSync(folder);

  c.forEach((obj) => {
    const stats = fs.statSync(`${folder}${obj}`);
    if (stats.isDirectory() === true) {
      // it's a dir. Reiterate operation
      _explore(folder, obj, array[module]);
    } else if (obj.split('.').pop() === 'js' && obj !== 'wapi.js') {
      // Process only .js files and do not load 'wapi.js' twice!
      try {
        array[module][obj.split('.').shift()] = require(`${folder}${obj}`);
      } catch (e) {
        // Catch an error if require fails because it means that the js file
        // isn't a valid module.
        log.error(e);
      }
    }
  });
}
/* eslint-enable no-param-reassign, import/no-dynamic-require, global-require */


// -- Public -------------------------------------------------------------------

/**
 * Attaches the API, middlewares and controllers to Wapi.
 *
 * @function (arg1, arg2, arg3)
 * @public
 * @param {Object}          Wapi object,
 * @param {String}          the root path,
 * @param {Array}           the path of API, middlewares and controllers,
 * @returns {}              -,
 * @since 0.0.0
 */
const load = function(wapi, root, dir) {
  let error = false
    ;

  try {
    error = false;
    fs.readdirSync(`${root}/${dir}`);
  } catch (e) {
    log
      .init('core/load.js', level)
      .warn(`${root}/${dir} isn't a valid directory!`)
    ;
    error = true;
  }
  if (!error) {
    _explore(root, dir, wapi);
  }
};


// -- Export
module.exports = load;
