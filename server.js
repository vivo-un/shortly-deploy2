var app = require('./server-config.js');

var port = 4568;
port = process.env.PORT;

app.listen(port);

console.log('Server now listening on port ' + port);
