const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'src/db/db.json'));
const middlewares = jsonServer.defaults({ static: './dist' });
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);
server.listen(port);
