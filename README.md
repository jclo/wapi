# Wapi

[![NPM version][npm-image]][npm-url]
[![Travis CI][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependencies status][dependencies-image]][dependencies-url]
[![Dev Dependencies status][devdependencies-image]][devdependencies-url]
[![License][license-image]](LICENSE.md)
<!--- [![node version][node-image]][node-url] -->

[![NPM install][npm-install-image]][npm-install-url]

`Wapi` is a slim, fast and minimal API framework built on top of Express.JS. It is built to provide a flexible API consumable from other apps.


## Build an Run

You can create an API Server from `Wapi` in a very few steps:

  1. create a folder that contains your project,

  3. then, execute the following commands from a shell terminal:

  ```bash
  npm install wapi
  ./node_modules/.bin/wapi create -n <name_of_your_app>
  npm install
  ```

That's all!

Your API server is almost ready to run. If you want to use `https` calls, you have to create your certificates and store them in `server/ssl`. Read the README.md to know how to create them.

You can run it without `https` (for testing purpose only) by replacing in the file `server/config.js`:

```javascript
env: {
  ...
  https: true,
  ...
}
```

by:
```javascript
env: {
  ...
  https: false,
  ...
}
```

Now, start it by typing `npm run app`. you should get a list of messages telling that the server is running. If you want to observe transactions, you can open a second terminal and type `npm run test`.


## Documentation

You can find a detailed documentation [here](https://wapi.mobilabs.fr/doc.html) that details how to build your own API server from this one.


## License

[MIT](LICENSE.md).

<!--- URls -->

[npm-image]: https://img.shields.io/npm/v/@mobilabs/wapi.svg?style=flat-square
[npm-install-image]: https://nodei.co/npm/@mobilabs/wapi.png?compact=true
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[download-image]: https://img.shields.io/npm/dm/@mobilabs/wapi.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/jclo/wapi.svg?style=flat-square
[coveralls-image]: https://img.shields.io/coveralls/jclo/wapi/master.svg?style=flat-square
[dependencies-image]: https://david-dm.org/jclo/wapi/status.svg?theme=shields.io
[devdependencies-image]: https://david-dm.org/jclo/wapi/dev-status.svg?theme=shields.io
[license-image]: https://img.shields.io/npm/l/@mobilabs/wapi.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/@mobilabs/wapi
[npm-install-url]: https://nodei.co/npm/@mobilabs/wapi
[node-url]: http://nodejs.org/download
[download-url]: https://www.npmjs.com/package/@mobilabs/wapi
[travis-url]: https://travis-ci.org/jclo/wapi
[coveralls-url]: https://coveralls.io/github/jclo/wapi?branch=master
[dependencies-url]: https://david-dm.org/jclo/wapi
[devdependencies-url]: https://david-dm.org/jclo/wapi?type=dev
[license-url]: http://opensource.org/licenses/MIT
