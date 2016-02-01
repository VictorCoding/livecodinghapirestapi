'use strict';

const Hapi = require('hapi');
const DB = require('./plugins/db');


// Create a server with a host and port
const server = new Hapi.Server();

server.register([DB], (err) => {
  
  server.connection({ 
      host: 'localhost', 
      port: 8000 
  });

  // Add the route
  server.route({
      method: 'GET',
      path:'/api/user', 
      handler: (request, reply) => {
        
          return reply('Victor!');
      },
  });

  server.route({
    method: 'POST',
    path: '/api/user',
    handler: (request, reply) => {
      
      const user = request.payload;
      
      server.methods.db.createUser(user, (err, response) => {
        if (err) reply(err);
        
        return reply(response).code(200);
      });
    },
  });
  
  server.route({
    method: 'GET',
    path: '/api/users/{limit?}',
    handler: (request, reply) => {
      console.log('hello');
      const limit = request.params.limit;
      
      
      server.methods.db.getUsers(parseInt(limit), (err, response) => {
        if (err) throw err;
        
        return reply(response).code(200);
      });
    },
  })

  // Start the server
  server.start((err) => {

      if (err) {
          throw err;
      }
      console.log('Server running at:', server.info.uri);
  });
});