require('dotenv').config();

// koa
import Koa from 'koa';
import views from 'koa-views';
import mount from 'koa-mount';
import serve from 'koa-static';
import logger from 'koa-logger';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';
import open from 'open';

// mqtt
import mosca from 'mosca';
import mqtt from 'mqtt';

// unit
import middleware from './middleware';
import routes from './routes';

const app = new Koa();

app.use(logger());
app.use(bodyParser());

app.use(mount('/', convert(serve(`${__dirname}/public/`))));

app.use(views(`${__dirname}/view/`, {
    // extension: 'ejs'
    // extension: 'pug'
    extension: 'html' // use Angular4
}));

app.use(middleware())
app.use(routes());


// mqtt broker

const wsAddress = 'ws://localhost:1994';
const topicKeywords = ['online', 'offline'];

const options = {
    type: 'mongo',
    url: 'mongodb://localhost:27017/mosca',
    pubsubCollection: 'messages',
    mongo: {}
};

// Mosca Broker
const settings = {
    port: 1993,
    stats: false,
    logger: {},
    http: {
        port: 1994,
        static: `${__dirname}/view/index.html`,
        bundle: true
    },
    backend: options
};

const mqttServer = new mosca.Server(settings);
let mqttClient = mqtt.connect(wsAddress, {
    keepalive: 0
});

// fired when a message is received
mqttServer.on('published', function (packet, client) {
    if (topicKeywords.indexOf(packet.topic) === -1 && !packet.topic.includes('$SYS')) {
        const messageJson = JSON.parse(packet.payload.toString('utf-8'));
        console.log(`${packet.topic} payload:`, messageJson);
    }
});

mqttServer.on('subscribed', function (topic, client) {
    if (topicKeywords.indexOf(topic) === -1) {

        switch (topic) {
            case 'create/keyid':
                getMqttClient().publish('create/keyid', JSON.stringify({
                    result: 'success',
                    url: 'https://www.patreon.com/nobu_game/posts',
                }));
                break;
            case 'join/keyid':
                getMqttClient().publish('join/keyid', JSON.stringify({
                    result: 'success',
                    id: 'client6451',
                    map: 'nobu_01'
                }));
                break;
        }


    }
});

mqttServer.on('unsubscribed', function (topic, client) {
    if (topicKeywords.indexOf(topic) === -1) {
        getMqttClient().publish('online', JSON.stringify({
            topic: String(topic),
            client: client.id,
        }));
    }
});

// Mosca Persistence
const onPersistenceReady = function () {
    persistence.wire(app);
}

let getMqttClient = function () {
    if (!mqttClient || !mqttClient.connected) {
        mqttClient = mqtt.connect(wsAddress, {
            keepalive: 0
        });
    }
    return mqttClient;
}

let persistence = mosca.persistence.Mongo(options, onPersistenceReady);


app.listen(
    process.env.SRV_PORT,
    () => {
        console.log(`✅  The server is running at http://localhost:${process.env.SRV_PORT}/`);
        // open(`http://localhost:${env.port}/`);
    }
)

export default app;