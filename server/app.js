/** ****************************************************************************
 *
 * Starts {{app:name}}.
 *
 * Private Functions:
 *  . none,
 *
 *
 * Main:
 *  . script!
 *
 *
 *
 * @exports   app
 * @author    -
 * @since     0.0.0
 * @version   -
 * ************************************************************************** */
/* eslint one-var: 0, semi-style: 0 */


// -- Vendor Modules
const KZlog = require('@mobilabs/kzlog')
    ;


// -- Project Modules
const wapi    = require('./wapi')
    , account = require('./lib/account.js')
    , config  = require('./config.js')
    ;


// -- Local Constants
const { level } = config
    , log       = KZlog('app.js', level, false)
    ;


// -- Local Variables


// -- Main section -

function app() {
  account.init()
    .then(() => {
      // Start the API Server:
      log.info(`start wapi v${wapi.getVersion()} ...`);
      wapi.start(__dirname, ['api', 'controllers', 'components'], config, 'trace');
    })
    .catch((e) => {
      throw new Error(e);
    });
}

// -- Export
module.exports = app;
