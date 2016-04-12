const WebSocketClient = require('websocket').client;
const client = new WebSocketClient();

const channel = 'simulation:fNrFkA==';
const roombaIP = 'roombots.mx.com';

const phxJoin = function (connection) {
  const initMessage = {
    topic: channel,
    event: 'phx_join',
    ref: 1,
    payload: {}
  };

  if (connection.connected) {
    console.log('Sending phx_join message to roombot');
    connection.sendUTF(JSON.stringify(initMessage));
  }
};

const heartbeat = function (connection) {
  console.log('Heart Beating');

  const heartbeatMessage = {
    topic: channel,
    event: 'heartbeat',
    payload: {},
    ref: 10
  };

  connection.sendUTF(JSON.stringify(heartbeatMessage));
};

const drive = function (connection) {
  console.log('Driving!');

  connection.on('message', function (message) {
    console.log(message);
  })
}

client.on('connectFailed', function (error) {
  console.log('Connect Error: ' + error.toString());
});

client.on('connect', function (connection) {
  console.log('WebSocket Client connected');

  phxJoin(connection);
  heartbeat(connection);
  drive(connection);
});

client.connect('ws://' + roombaIP + '/socket/websocket?vsn=1.0.0');

