const path = require('path');

module.exports = {
    port: process.env.PORT || 80,
    dataFile: path.join(__dirname, '../data/list.json'),
};
