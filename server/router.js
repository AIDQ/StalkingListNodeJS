function init(app, data) {
    app.get('/', (req, res) => {
        data.users.getAll()
            .then((users) => {
                const postsCount = users
                    .map((u) => u.media ? u.media.count : 0);

                res.render('home', {
                    users: users,
                    ctx: {
                        currentPostsCount: postsCount,
                    },
                });
            });
    });

    app.get('/add', (req, res) => {
        const username = req.query.username;

        data.users.add(username)
            .then(() => res.redirect('/'))
    });

    app.get('/update', (req, res) => {
        data.users.update()
            .then(() => res.redirect('/'));
    });

    app.get('/delete', (req, res) => {
        const username = req.query.username;

        data.users.delete(username)
            .then(() => res.redirect('/'));
    });

    app.get('/edit', (req, res) => {
        const username = req.query.username;
        const newUsername = req.query.newUsername;

        data.users.edit(username, newUsername)
            .then(() => res.redirect('/'));
    });
}

module.exports = init;
