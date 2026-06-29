const server = require('./src/app');
const ConnectDB = require('./src/db/db');

ConnectDB();

server.listen(3000, () => {
    console.log('server is running on port 3000')
})

