/** ****************************************************************************
 *
 * Starts Wapi.
 *
 *
 * Private Methods:
 *  . none,
 *
 *
 * Public Methods:
 *  . start                       starts the wapi daemon,
 *  . getVersion                  returns Wapi's release number,
 *
 *
 *
 * @exports   wapi
 * @author    -
 * @since     0.0.0
 * @version   -
 * ************************************************************************** */
/* eslint one-var: 0, semi-style: 0 */


// -- Vendor Modules


// -- Project Modules
const load        = require('./load')
    , startWebApp = require('./webapp')
    , server      = require('./http')
    , setRoutes   = require('./routes')
    ;


// -- Local Constants


// -- Local Variables


// -- Public Methods -----------------------------------------------------------

const wapi = {

  /**
   * Starts the daemon that processes HTTP/HTTPS requests.
   *
   * @method (arg1, arg2, arg3, arg4)
   * @public
   * @param {String}        the root path,
   * @param {Array}         the list of the folders that contains API, mid, cntrl,
   * @param {Object}        the configuration setting object,
   * @param {String}        the log level,
   * @returns {}            -,
   * @since 0.0.0
   */
  start(base, modules, config) {
    // Load all the modules and attaches them to the wapi object:
    this.base = base;
    for (let i = 0; i < modules.length; i++) {
      load(this, base, modules[i]);
    }

    // Creates and initializes web app:
    const app = startWebApp(this, config, base);

    // Sets the routes:
    setRoutes(this, config, app);

    // Starts http & https servers:
    server.startHttp(app, config, base);
    server.startHttps(app, config, base);
  },

  /**
   * Returns Wapi's release number.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {String}      returns the release number,
   * @since 0.0.0
   */
  getVersion() {
    return '{{wapi:release}}';
  },
};


// -- Export
module.exports = wapi;
