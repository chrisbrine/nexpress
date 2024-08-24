/*

Will import an object for creating an express app with a set of routes and middleware

Object format is:
{
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
      },
      path: '/path', // can include variables
      middleware: [ middlewareFunction1, middlewareFunction2, ... ],
      route: function or [ route1, route2, ...] for more routes off path
      options: {}, // optional
    },
    { more routes... },
  }, // optional
}

*/

export { NExpress } from "./server";
