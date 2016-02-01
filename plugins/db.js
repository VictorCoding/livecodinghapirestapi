'use strict';

const R = require('rethinkdb');

exports.register = (server, options, next) => {
  const db = 'livecodinghapirestapi';
  const usersTable = 'users';
  let conn;
  
  //Connect and initialize
  R.connect((err, connection) => {

      if (err) {
          return next(err);
      }

      conn = connection;

      // Create db
      R.dbCreate(db).run(connection, (err, result) => {

          //Create users table
          R.db(db).tableCreate(usersTable).run(connection, (err, result) => {
            
              return next();
          });

      });
  });
  
  server.method('db.createUser', (user, callback) => {
    R.db(db).table(usersTable).insert(user).run(conn, callback);
  });
  
  server.method('db.getUsers', (limit, callback) => {
    R.db(db).table(usersTable).orderBy(R.desc('createAt')).limit(limit).run(conn, callback);
  });
  
}

exports.register.attributes = {
    name: 'DB'
};