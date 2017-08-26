function init(app, data) {
    app.get('/', (req, res) => {
        res.render('home', {
            users: data.users.getAll(),
        });
    });
}

module.exports = init;
