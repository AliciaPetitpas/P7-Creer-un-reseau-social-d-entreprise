const http = require('http');
const express = require('express');
const app = require('./app');

const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Listening at: http://localhost:${port}`);
    })
});

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port' + port;

    switch (error.code) {
        case 'EACCESS':
            console.error(bind + 'require elevated privilages');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + 'is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);

server.on('error', errorHandler);
// server.on('listening', () => {
//     const address = server.address();
//     const bind = typeof address === 'string' ? 'pipe' + address : 'port ' + port;
//     console.log('Listening on ' + bind);
// });

// server.listen(port);