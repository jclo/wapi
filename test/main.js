/* global describe, it */
/* eslint one-var: 0, semi-style: 0, no-unused-vars: 1 */

// -- Node modules
const should     = require('chai').should()
    , { expect } = require('chai')
    , request    = require('request')
    , release    = require('../package.json').version
    ;


// -- Project modules
const app = require('../server/app')
    , config = require('../server/config')
    ;


// -- Local constants
const api     = 'api/v1'
    , user    = 'jdo'
    , pass    = 'jdo'
    , auth    = 'auth/login'
    , version = 'system/getversion'
    , logout  = 'auth/logout'
    , ptoken  = 'oauth2/token'
    , cookie  = request.jar()
    ;


// -- Local variables
let server
  , url
  ;


// -- Main section -

// Set this environment variable orherwise 'request' does not accept self-signed
// certificates:
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

if (process.env.TRAVIS || !config.env.https) {
  server = `http://localhost:${config.env.httpport}`;
} else {
  server = `https://localhost:${config.env.httpsport}`;
}

describe('Test Wapi:', () => {
  describe('Test a connection session with the API server:', () => {
    describe('The login action:', () => {
      let body;

      // Test login session:
      url = `${server}/${api}/${auth}`;
      it('Expects the login action to return a null error.', (done) => {
        request.post({ url, jar: cookie, form: { user, password: pass } }, (error, resp, data) => {
          body = JSON.parse(data);
          expect(error).to.be.a('null');
          done();
        });
      });

      it('Should return a response body.', () => {
        body.should.be.an('object');
      });

      it('Should have the property "status".', () => {
        body.should.have.property('status');
      });

      it('Should have the property "message".', () => {
        body.should.have.property('message');
      });

      it('Expects the property "status" to be "Ok"', () => {
        body.status.should.be.equal('Ok');
      });

      it('Expects the property "message" to be "You are now connected!"', () => {
        body.message.should.be.equal('You are now connected!');
      });

      // Test an API:
      describe('The getversion action:', () => {
        it('Expects the getversion action to return a null error.', (done) => {
          url = `${server}/${api}/${version}`;
          request.get({ url, jar: cookie }, (error, resp, data) => {
            body = JSON.parse(data);
            expect(error).to.be.a('null');
            done();
          });
        });

        it('Should return a response body.', () => {
          body.should.be.an('object');
        });

        it('Should have the property "status".', () => {
          body.should.have.property('status');
        });

        it('Should have the property "message".', () => {
          body.should.have.property('message');
        });

        it('Expects the property "status" to be "Ok"', () => {
          body.status.should.be.equal('Ok');
        });

        it(`Expects the property "message" to be "${release}"`, () => {
          body.message.should.be.equal(release);
        });

        // Test the logout:
        describe('The logout action:', () => {
          it('Expects the logout action to return a null error.', (done) => {
            url = `${server}/${api}/${logout}`;
            request.get({ url, jar: cookie }, (error, resp, data) => {
              body = JSON.parse(data);
              expect(error).to.be.a('null');
              done();
            });
          });

          it('Should return a response body.', () => {
            body.should.be.an('object');
          });

          it('Should have the property "status".', () => {
            body.should.have.property('status');
          });

          it('Should have the property "message".', () => {
            body.should.have.property('message');
          });

          it('Expects the property "status" to be "Ok"', () => {
            body.status.should.be.equal('Ok');
          });

          it('Expects the property "message" to be "You are now disconnected!"', () => {
            body.message.should.be.equal('You are now disconnected!');
          });
        });
      });
    });
  });

  describe('Test a token Request:', () => {
    let obj
      , obj2
      , obj3
      ;

    it('Expects the token action to return an object.', (done) => {
      request({
        url: `${server}/${api}/${ptoken}`,
        method: 'POST',
        auth: {
          user,
          password: pass,
        },
        form: {
          grant_type: 'client_credentials',
        },
      }, (error, res) => {
        obj = JSON.parse(res.body);
        expect(obj).to.be.an('object');
        done();
      });
    });

    it('Expects this object to have the property status with the value "Ok".', () => {
      expect(obj).to.have.property('status').that.is.equal('Ok');
    });
    it('Expects this object to have the property message that is an object.', () => {
      expect(obj).to.have.property('message').that.is.an('object');
    });
    it('Expects this object to have the property scope that is an empty string.', () => {
      expect(obj.message).to.have.property('scope').that.is.a('string').to.have.lengthOf(0);
    });

    it('Expects this object to have the property token_type that is the string "Bearer".', () => {
      expect(obj.message).to.have.property('token_type').that.is.a('string').that.is.equal('Bearer');
    });
    it('Expects this object to have the property expires_in that is equal to 1800.', () => {
      expect(obj.message).to.have.property('expires_in').that.is.equal(1800);
    });
    it('Expects this object to have the property access_token that is a string of 32 characters.', () => {
      expect(obj.message).to.have.property('access_token').that.is.a('string').that.has.a.lengthOf(32);
    });
    it('Expects this object to have the property refresh_token that is a string of 32 characters.', () => {
      expect(obj.message).to.have.property('refresh_token').that.is.a('string').that.has.a.lengthOf(32);
    });


    it('Expects the action getversion to return an object.', (done) => {
      request({
        url: `${server}/${api}/${version}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${obj.message.access_token}`,
        },
      }, (error, res) => {
        obj2 = JSON.parse(res.body);
        expect(obj2).to.be.an('object');
        done();
      });
    });
    it('Expects this object to have the property status with the value "Ok".', () => {
      expect(obj2).to.have.property('status').that.is.equal('Ok');
    });
    it(`Expects this object to have the property message that is a string equal to "${release}".'`, () => {
      expect(obj2).to.have.property('message').that.is.equal(release);
    });


    it('Expects the action token with Grant Type refresh_token to return an object.', (done) => {
      request({
        url: `${server}/${api}/${ptoken}`,
        method: 'POST',
        auth: {
          user,
        },
        headers: {
          refresh_token: obj.message.refresh_token,
        },
        form: {
          grant_type: 'refresh_token',
        },
      }, (error, res) => {
        obj3 = JSON.parse(res.body);
        expect(obj3).to.be.an('object');
        done();
      });
    });
    it('Expects this object to have the property status with the value "Ok".', () => {
      expect(obj3).to.have.property('status').that.is.equal('Ok');
    });
    it('Expects this object to have the property message that is an object.', () => {
      expect(obj3).to.have.property('message').that.is.an('object');
    });

    it('Expects this object to have the property scope that is an empty string.', () => {
      expect(obj3.message).to.have.property('scope').that.is.a('string').that.has.lengthOf(0);
    });
    it('Expects this object to have the property token_type that is the string "Bearer".', () => {
      expect(obj3.message).to.have.property('token_type').that.is.a('string').that.is.equal('Bearer');
    });
    it('Expects this object to have the property expires_in that is equal to 1800.', () => {
      expect(obj3.message).to.have.property('expires_in').that.is.equal(1800);
    });
    it('Expects this object to have the property access_token that is a string of 32 characters.', () => {
      expect(obj3.message).to.have.property('access_token').that.is.a('string').that.has.a.lengthOf(32);
    });

    it('Expects this access_token is not equal to the previous access_token.', () => {
      expect(obj3.message.access_token).is.not.equal(obj.message.access_token);
    });
  });
});
