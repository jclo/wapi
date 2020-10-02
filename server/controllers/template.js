/** ****************************************************************************
 *
 * Defines a controller that implements the behaviour associated to the
 * given API.
 *
 * ... (long description)
 *
 *
 * Private Functions:
 *  . ...                         ...,
 *
 *
 * Public Methods:
 *  . ...                         ...,
 *
 *
 *
 * @exports   ???
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

const methods = {

  /**
   * Gets ...
   * Method: GET
   *
   * @function (arg1, arg2)
   * @private
   * @param {Object}      ExpressJS require object,
   * @param {Object}      ExpressJS request object,
   * @returns {}          -,
   * @since 0.0.0
   */
  getMethod(req, res) {
    res.status(200).send({ status: 'getMethod' });
  },

  /**
   * Creates ...
   * Method: GET
   *
   * @function (arg1, arg2)
   * @private
   * @param {Object}      ExpressJS require object,
   * @param {Object}      ExpressJS request object,
   * @returns {}          -,
   * @since 0.0.0
   */
  createMethod(req, res) {
    res.status(200).send({ status: 'createMethod' });
  },

  /**
   * Updates ...
   * Method: PUT
   *
   * @function (arg1, arg2)
   * @private
   * @param {Object}      ExpressJS require object,
   * @param {Object}      ExpressJS request object,
   * @returns {}          -,
   * @since 0.0.0
   */
  updateMethod(req, res) {
    res.status(200).send({ status: 'updateMethod' });
  },

  /**
   * Deletes ...
   * Method: DELETE
   *
   * @function (arg1, arg2)
   * @private
   * @param {Object}      ExpressJS require object,
   * @param {Object}      ExpressJS request object,
   * @returns {}          -,
   * @since 0.0.0
   */
  deleteMethod(req, res) {
    res.status(200).send({ status: 'deleteMethod' });
  },
};


// -- Export
module.exports = methods;
