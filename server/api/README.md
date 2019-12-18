# API

Files specified in the `api` folder or its subfolders are objects which define how the application responds to the REST API.


## Objects

These objects contain a set of properties which refer to the HTTP requests `GET`, `POST`, `PUT` and `DELETE`.

Each property contains three sub-property: `path`, `controller`, and `fn`.

The `path` defines the endpoint route. Root route is `default`.

The `controller` specifies the controller file.

The `fn` defines the method contained in the file `controller` that has to be called.


## Exemple

A typical `api` file contains:
```
module.exports = {

  'GET': { path: 'default', controller: 'path/to/controller', fn: 'getMethod' },
  ...
  'DELETE': { path: 'default', controller: 'path/to/controller', fn: 'deleteMethod' }
};
```

## Advanced Routing

Each HTTP request can support several routes. If you want to associate a set of routes to `GET`, you need to define an array with different `path` values:
```
'GET': [
  { path: 'default', controller: 'path/to/controller', fn: 'getMethod' },
  { path: 'init', controller: 'path/to/controller', fn: 'getInitMethod' }
]
```
Paths support `:id` parameters. If you define a path like this: `users/:id`, all the routes `users/xxx` will invoke the `method` associated with the `path` `users:/id`.

The controller method should then retrieve `xxx` from `req.params`.


## Limitations

`path` must be explicit. The root route is associated with the `path` `default`.
