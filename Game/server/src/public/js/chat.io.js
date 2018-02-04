const serverAddress = '60.249.179.126';
const reconnectTimeout = 3000;
let mqttClient = null;

function connect() {

    // Paho.MQTT from lib(mqttws.31.js)
    mqttClient = new Paho.MQTT.Client(serverAddress, 8083, document.querySelector('input').value);
    const connectionOptions = {
        keepAliveInterval: 0,
        onSuccess: onConnect,
        onFailure(message) {
            console.log('connection failed: ' + message.errorMessage);
            showReconnectMessage();
            setTimeout(connect, reconnectTimeout);
        }
    };
    mqttClient.connect(connectionOptions);
    mqttClient.onMessageArrived = onMessageArrived;
    mqttClient.onConnectionLost = onConnectionLost;
}

function onMessageArrived(message) {
    let msg;
    try {
        msg = JSON.parse(message.payloadString)
    } catch (e) {
        msg = message.payloadString;
    }
    const topic = message.destinationName;
    console.log({
        topic,
        msg,
    });

    // use switch ... case to do sth.
}

function onConnectionLost(response) {
    console.log(response);
    document.querySelector('.btnConn').disabled = false;
    setTimeout(connect, reconnectTimeout);
}

function showReconnectMessage() {
    console.log('connection to server lost. Attempting to reconnect in ' + reconnectTimeout + ' ms');
}

function onConnect() {
    document.querySelector('.btnConn').disabled = true;
    console.log('onSuccess', 'connecting success.');

    // 訂閱訊息
    mqttClient.subscribe('online');
    mqttClient.subscribe('offline');

    mqttClient.subscribe('test');
}

function roomCreate() {
    const payload = new Paho.MQTT.Message(JSON.stringify({
        action: 'create',
        key: 'dadkfh'
    }));
    payload.destinationName = 'room';
    mqttClient.send(payload);

    mqttClient.subscribe('create/keyid');
}

function roomJoin() {
    const payload = new Paho.MQTT.Message(JSON.stringify({
        action: 'join',
        key: 'dadkfh'
    }));
    payload.destinationName = 'room';
    mqttClient.send(payload);

    mqttClient.subscribe('join/keyid');
}