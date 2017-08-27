const config = require('./config');

Promise.resolve()
    .then(() => require('./data')(config.dataFile))
    .then((data) => require('./app')(data))
    .then((app) => {
        app.listen(config.port, () =>
            console.log(`Server running at port ${config.port}...`)
        );
    })
    .catch(console.error);
