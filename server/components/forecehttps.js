/** ****************************************************************************
 *
 * Defines a middleware that forces HTTPS.
 *
 *
 * Private Functions:
 *  . none,
 *
 *
 * Public Methods:
 *  . forceHttps                  returns the HTTPS redirect middleware,
 *
 *
 *
 * @exports   ForceHttps
 * @author    -
 * @since     0.0.0
 * @version   0.0.0
 * ************************************************************************** */
/* eslint one-var: 0, semi-style: 0  */


// -- Vendor Modules


// -- Project Modules


// -- Local Constants


// -- Local Variables


// -- Public Methods -----------------------------------------------------------

const forceHttps = function() {
  return function(req, res, next) {
    if (!req.secure) {
      res.redirect(`https://${req.headers.host}${req.url}`);
    } else {
      next();
    }
  };
};


// -- Export
module.exports = forceHttps;
