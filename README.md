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
    Router: {
      Express router options
    }, // see express.Router() options, optional to be set
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
      options: {}, // optional
    },
    { more routes... },
  }, // optional
```

## To do

- Create documentation
- Fully test

## Maybe future?

- See about adding easy integration of gRPC and Graph QL
- Easier integration into databases like SQL or MongoDB?
- Easier handling of user authentication
- add quick and easy way of getting files so it isn't difficult to implement
- allow for disabling of of the getting files feature
