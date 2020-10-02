/** ****************************************************************************
 *
 * Script that creates an user database.
 *
 *
 * @exports   -
 * @author    -
 * @since     0.0.0
 * @version   -
 * ************************************************************************** */
/* eslint one-var: 0, semi-style: 0 */


// -- Vendor Modules
const fs       = require('fs')
    , readline = require('readline')
    ;


// -- Project Modules


// -- Local Constants
const dbfile = './accounts.db'
    ;


// -- Local Variables
let user
  ;


// -- Private functions --------------------------------------------------------

/**
* Returns an user profile
*/
function createUserProfile() {
  return {
    /* eslint-disable no-multi-spaces, key-spacing */
    _id: undefined,
    user_name:             undefined,       // undefined means that the field won't be saved.
    user_hash:             undefined,
    authenticate_id:       undefined,
    user_pwd:              undefined,
    pwd_last_changed:      undefined,
    is_authorized:         undefined,
    receive_notifications: undefined,
    is_admin:              undefined,
    user_role:             undefined,
    user_status:           undefined,
    created_by:            undefined,
    date_created:          new Date(),
    date_modified:         undefined,
    modified_user_id:      undefined,
    reports_to_id:         undefined,
    description:           undefined,
    first_name:            undefined,
    last_name:             undefined,
    title:                 undefined,
    department:            undefined,
    phone_mobile:          undefined,
    phone_work:            undefined,
    phone_other:           undefined,
    phone_fax:             undefined,
    phone_home:            undefined,
    email_address_work:    undefined,
    email_address_home:    undefined,
    address_street:        undefined,
    address_city:          undefined,
    address_state:         undefined,
    address_country:       undefined,
    address_postalcode:    undefined,
    /* eslint-enable no-multi-spaces, key-spacing */
  };
}


// -- Main section -

// Check if database already exits:
if (fs.existsSync(dbfile)) {
  // console.log(dbfile + ' already exists. Aborting ...');
  process.stdout.write(`${dbfile} already exists. Aborting ...\n`);
  process.exit(0);
}

// Add a first user:
user = createUserProfile();
user.user_name = 'jdo';
user.user_pwd = 'jdo';
user.first_name = 'John';
user.last_name = 'Doe';
fs.appendFileSync(dbfile, `${JSON.stringify(user)}\n`);

// Add a seond user:
user = createUserProfile();
user.user_name = 'jsn';
user.user_pwd = 'jsn';
user.first_name = 'John';
user.last_name = 'Snow';
fs.appendFileSync(dbfile, `${JSON.stringify(user)}\n`);

// Dump db:
process.stdout.write('You fill the following accounts:\n');

const rd = readline.createInterface({
  input: fs.createReadStream(dbfile),
  output: process.stdout,
  terminal: false,
});

// Read line by line:
rd.on('line', (line) => {
  process.stdout.write(`  ${line}\n`);
});

// Until the end:
rd.on('close', () => {
  process.stdout.write('  Done ...\n');
});
