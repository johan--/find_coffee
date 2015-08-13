var forever = require('forever-monitor');

var options = {
  silent: false,
  args: []
};

var child = new (forever.Monitor)('server.js', options);

child.on('exit', function() {
  console.log('server.js has exited');
});

child.start();
