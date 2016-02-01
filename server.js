'use strict';

const Hapi = require('hapi');


// Create a server with a host and port
const server = new Hapi.Server();
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
    }
});

server.route({
  method: 'POST',
  path: '/api/user',
  handler: (request, reply) => {
    
    const user = request.payload;
    console.log(user);
    
    return reply(user);
    
  }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
