/*eslint-env node*/

const FastBootAppServer = require('fastboot-app-server');

let server = new FastBootAppServer({
  distPath: 'dist',
  gzip: true,
  host: '127.0.0.1',
  port: 8000
});

server.start();
