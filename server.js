const config = require('./server/config');

Promise.resolve()
    .then(() => require('./server/data')(config.dataFile))
    .then((data) => require('./server/app')(data))
    .then((app) => {
        app.listen(config.port, () =>
            console.log(`Server running at port ${config.port}...`)
        );
    })
    .catch(console.error);
