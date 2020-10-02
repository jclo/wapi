# Wapi

[![NPM version][npm-image]][npm-url]
[![GitHub last commit][commit-image]][commit-url]
[![Travis CI][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependencies status][dependencies-image]][dependencies-url]
[![Dev Dependencies status][devdependencies-image]][devdependencies-url]
[![License][license-image]](LICENSE.md)

`Wapi` is a slim, fast and minimal API framework built on top of Express.JS. It is built to provide a flexible API consumable from other apps.


## Quick Startup

You can easily get your first Wapi Server running in a couple of minutes by just typing a few command lines. But first, you need to create an empty folder. It will contain your project.

Then, you just need to create a `package.json` file that contains:

```json
{
  "name": "NameOfYourProject",
  "scripts": {
    "create": "npm install @mobilabs/wapi && npm run populate",
    "populate": "wapi populate --name ${npm_package_name} --author \"${npm_package_writer_name}\" --acronym ${npm_package_writer_acronym} --email ${npm_package_writer_email} --url ${npm_package_writer_url} && npm install"
  },
  "writer": {
    "name": "John Doe",
    "acronym": "jdo",
    "email": "jdo@johndoe.com",
    "url": "http://www.johndoe.com/"
  }
}
```
Replace `NameOfYourProject` by your project name and fill `writer` with your credentials.

And finally, type in the terminal:

```bash
npm run create.
```

Your project is almost ready. As, Wapi relies on `https`, you have to add your certificates in the folder `server/ssl` or you can disable `https` (not recommended) in `server/config.js`.

Now you can starts your server by typing:

```bash
npm run app
```

You should get a list of messages telling that the server is running. If you want to observe transactions, you can open a second terminal and type `npm run test`.


## Documentation

You can find a detailed documentation [here](https://wapi.mobilabs.fr/doc.html) that details how to build your own API server from this one.


## License

[MIT](LICENSE.md).

<!--- URls -->

[npm-image]: https://img.shields.io/npm/v/@mobilabs/wapi.svg?style=flat-square
[release-image]: https://img.shields.io/github/release/jclo/wapi.svg?include_prereleases&style=flat-square
[commit-image]: https://img.shields.io/github/last-commit/jclo/wapi.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/jclo/wapi.svg?style=flat-square
[coveralls-image]: https://img.shields.io/coveralls/jclo/wapi/master.svg?style=flat-square
[dependencies-image]: https://david-dm.org/jclo/wapi/status.svg?theme=shields.io
[devdependencies-image]: https://david-dm.org/jclo/wapi/dev-status.svg?theme=shields.io
[npm-bundle-size-image]: https://img.shields.io/bundlephobia/minzip/@mobilabs/wapi.svg?style=flat-square
[license-image]: https://img.shields.io/npm/l/@mobilabs/wapi.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/@mobilabs/wapi
[release-url]: https://github.com/jclo/wapi/tags
[commit-url]: https://github.com/jclo/wapi/commits/master
[travis-url]: https://travis-ci.org/jclo/wapi
[coveralls-url]: https://coveralls.io/github/jclo/wapi?branch=master
[dependencies-url]: https://david-dm.org/jclo/wapi
[devdependencies-url]: https://david-dm.org/jclo/wapi?type=dev
[license-url]: http://opensource.org/licenses/MIT
[npm-bundle-size-url]: https://img.shields.io/bundlephobia/minzip/@mobilabs/wapi
