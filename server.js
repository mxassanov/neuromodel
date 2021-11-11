const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db/db.json'));
const middlewares = jsonServer.defaults({ static: './dist' });
const port = process.env.PORT || 3001;

// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3001',
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200,
};
server.use(cors(corsOptions));

server.use(middlewares);
server.use(router);
server.listen(port);
