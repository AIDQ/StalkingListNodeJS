function init(app, data) {
    app.get('/', (req, res) =>{
        res.render('home');
    });
}

module.exports = init;
