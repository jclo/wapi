#!/usr/bin/env node
// ESLint declarations
/* global  */
/* eslint one-var: 0, semi-style: 0, camelcase: 0, prefer-destructuring: 0 */

// -- Node modules
const request = require('request')
    ;


// -- Project modules


// -- Local constants
const server   = 'https://localhost:1443'
    , api      = 'api/v1'
    , user     = 'jdo'
    , pass     = 'jdo'
    , plogin   = 'auth/login'
    , plogout  = 'auth/logout'
    , ptoken   = 'oauth2/token'
    , version  = 'system/getversion'
    , cookie   = request.jar()
    ;


// -- Local variables
let url
  , resp
  , access_token
  , refresh_token
  ;


// Set this environment variable orherwise 'request' does not accept self-signed
// certificates:
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


// -- Private Functions --------------------------------------------------------

/**
 * Session login
 */
async function login(lurl) {
  return new Promise((resolve, reject) => {
    request({
      url: lurl,
      method: 'POST',
      jar: cookie,
      form: {
        user,
        password: pass,
      },
    }, (error, res) => {
      if (error) {
        reject(error);
      } else {
        resolve(res.body);
      }
    });
  });
}

/**
 * Session Get Request
 */
async function sessionGet(lurl) {
  return new Promise((resolve, reject) => {
    request({
      url: lurl,
      method: 'GET',
      jar: cookie,
    }, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
}

/**
 * Token request
 */
function getToken(lurl) {
  return new Promise((resolve, reject) => {
    request({
      url: lurl,
      method: 'POST',
      auth: {
        user,
        password: pass,
      },
      form: {
        grant_type: 'client_credentials',
      },
    }, (error, res) => {
      if (error) {
        reject(error);
      } else {
        access_token = JSON.parse(res.body).message.access_token;
        refresh_token = JSON.parse(res.body).message.refresh_token;
        resolve(res.body);
      }
    });
  });
}

/**
 * Token Get Request
 */
function tokenGet(lurl, token) {
  return new Promise((resolve, reject) => {
    request({
      url: lurl,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }, (error, res) => {
      if (error) {
        reject(error);
      } else {
        resolve(res.body);
      }
    });
  });
}

/**
 * Refresh Token
 */
function refreshToken(lurl) {
  return new Promise((resolve, reject) => {
    request({
      url: lurl,
      method: 'POST',
      auth: {
        user,
      },
      headers: {
        refresh_token,
      },
      form: {
        grant_type: 'refresh_token',
      },
    }, (error, res) => {
      if (error) {
        reject(error);
      } else {
        access_token = JSON.parse(res.body).message.access_token;
        resolve(res.body);
      }
    });
  });
}


/**
 * Run operations sequentially.
 */
async function run() {
  // Login:
  process.stdout.write('Request with cookies ...\n');
  process.stdout.write('login ...\n');
  url = `${server}/${api}/${plogin}`;
  resp = await login(url);
  process.stdout.write(`${resp}\n`);

  // Get Version:
  process.stdout.write('\ngetVersion ...\n');
  url = `${server}/${api}/${version}`;
  resp = await sessionGet(url);
  process.stdout.write(`${resp}\n`);

  // Logout:
  process.stdout.write('\nlogout ...\n');
  url = `${server}/${api}/${plogout}`;
  resp = await sessionGet(url);
  process.stdout.write(`${resp}\n`);

  // Get Version after Logout:
  process.stdout.write('\nget version after logout ...\n');
  url = `${server}/${api}/${version}`;
  resp = await sessionGet(url);
  process.stdout.write(`${resp}\n`);

  // Request with a Token:
  process.stdout.write('\nRequest with a token ...\n');
  process.stdout.write('Ask for an access token ...\n');
  url = `${server}/${api}/${ptoken}`;
  resp = await getToken(url);
  process.stdout.write(`${resp}\n`);

  // Get Version:
  process.stdout.write('\ngetVersion ...\n');
  url = `${server}/${api}/${version}`;
  resp = await tokenGet(url, access_token);
  process.stdout.write(`${resp}\n`);

  // Get Version with a wrong token:
  process.stdout.write('\ngetVersion with a wrong token ...\n');
  url = `${server}/${api}/${version}`;
  resp = await tokenGet(url, 'wrong_access_token');
  process.stdout.write(`${resp}\n`);

  // Request a Refresh Token:
  process.stdout.write('\nRequest a refresh token ...\n');
  url = `${server}/${api}/${ptoken}`;
  resp = await refreshToken(url);
  process.stdout.write(`${resp}\n`);

  // Get Version with a new token:
  process.stdout.write('\ngetVersion with a new access token ...\n');
  url = `${server}/${api}/${version}`;
  resp = await tokenGet(url, access_token);
  process.stdout.write(`${resp}\n`);

  process.stdout.write('\nThat\'s all Folks!\n');
}


// -- Main section -
run();
