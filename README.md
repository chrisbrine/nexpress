# nExpress

This module will allow for using a simple object for creating an express based application along with integrating in validators. Also supports a quick easy method to create a REST API, for getting the entire path structure for the API sorted into categories and labels if used.

Likely there are some features missing. If I'm let known about it I will gladly add them as needed.

## When installed you only need to use one class:

- **new NExpress(NExpressOptions)**

For how to enter an NExpressOptions object it is as follows:

```
  ports: {
    {
      port: number,
      protocol: 'http' | 'https', // defaults to http
      files: {
        key: string,
        cert: string,
      }, // only needed for an https port
    }
  ], // or just pass a number for a single port
  middleware: [ middlewareFunction1, middlewareFunction2, ... ],
  engines: {
    [engineName]: engineFunction,
  }, // optional
  options: {
    json: {
      Express json options
    }, // see express.json() options, optional to be set
    urlencoded: {
      Express urlencoded options
    }, // see express.urlencoded() options, optional to be set
    static: {
      Express static options
    }, // see express.static() options, optional to be set
  }, // optional
  routes: {
    [label]:{
      methods: {
        [method]: {
          title: 'title', // optional, for if retrieving list of routes
          description: 'description', // optional, for if retrieving list of routes
          category: 'category', // optional, for if retrieving list of routes
          action: function, // function to run
        } // key name can be 'get', 'post', 'put', 'delete', 'patch', or 'all'
        // the function for the action is:
        // (Utils, Data, exp): null.
        // Info includes various functions sendJson, sendError, params, queries, bodyJsonEntries
      },
      path: '/path', // can include variables
      middleware: [ middlewareFunction1, middlewareFunction2, ... ],
      route: function or [ route1, route2, ...] for more routes off path
      options: {}, // router options
    },
    { more routes... },
  }, // optional
```

## Ease of creating the object

There are commands for easily creating the options such as:

`NX.Server = (Ports, Routes?, middlewareFunctions[]?, staticRoot?, options?) => NExpress`

- Ports and Routes can be created via other commands
- For Port, use NX.Port() command and place each in an array. Or it can be a number if you want all default settings used and just one port
- middlewareFunctions is an array of functions with the `(Response, Request, NextFunction)` parameters.
- staticRoot is for the root directory for the static files
- options allows for a dictionary of options to pass to express as needed:

```
{
  json: json options
  urlencoded: urlencoded options
  static: static files options
}
```

- Only Ports is required
- if not using one in between one that you are using you can pass undefined

`NX.Port = (port: number, host?: string, useHttps?: boolean, keyFile?: string, certFile?: string) => NExpressPort`

- port is the port to use, of course. The only one that is required.
- host would be a hostname to remember. Optional.
- useHttps if turned on will use https / ssl. Optional, defaults to false.
- keyFile will reference the key file for SSL / https. Required if using https, ignored if not.
- certFile works similar to key file but is for the key file instead.
- if not using one in between one that you are using you can pass undefined

`NX.Router = (path?: string, middlewareFunctions[]?, methods?, router?, params?, verify?, options?) => NExpressRouteOptions`

- path would be the referenced path and is required depending on what options you pass. If you use any methods it is definitely needed even if it is just a /.
- middlewareFunctions is an array of functions with the `(Response, Request, NextFunction)` parameters.
- NX.Methods can be passed using another methods command
- NX.Router can be used to crate new routes under router similarly handled as on NX.Server. To combine them you can use an object similar to:

```
{
  [label]: NX.Router(...),
  and more
}
```

- Params is just handled by passing an object with the param name as the key and the function set to it as its value. The params would be: `(Request, Response, NextFunction, id)`.
- Verify is another object specifically for an ease of verification. The functions have the format of `(value, options: {paramName, type: VerificationType, req: Request, res: Response, next: NextFunction}): boolean`. How it should be laid out is as an object as follows:

```
{
  [query type of 'body', 'query', or 'param']: {
    [name of item]: Function
  }
}
```

- Router would be the router options for in express

`NX.Methods = ([RouterMethod, MethodOptions]...) => NExpressRouteActionOptions`

- can add as many of the arrays for any number of methods
- RouterMethod would be the method used such as GET, PUT, POST, DELETE, PATCH, ALL
- MethodOptions can be created with NX.Method

`NX.Method = (action, title?, description?, category?, params?) => NExpressRouteActionSubOptions`

- action would be the function used for the method in the format of `(Utils: Record<string, unknown>, Data: Record<string, unknown>, exp: routerFunctionInputs) => void`. Utils is a list of available commands, Data, would be a list of variables, and exp would be all of express' available options including the response and request objects.
- title is optional and for storing a title for the method
- description is optional and for storing the description for the method
- category is optional and for storing the category name
- params is an object list with the key of the parameter name for the method path along with descriptions for each

## To do

- Fully test, though it works so far

## Maybe future?

- See about adding easy integration of gRPC and Graph QL
- Add web sockets support
- Easier integration into databases like SQL or MongoDB?
- Easier handling of user authentication
- add quick and easy way of getting files so it isn't difficult to implement
- allow for disabling of of the getting files feature
