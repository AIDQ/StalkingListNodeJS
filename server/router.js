function init(app, data) {
    app.get('/', (req, res) => {
        const users = data.users.getAll();
        const postsCount = users.map((u) => u.media.count);

        res.render('home', {
            users: users,
            ctx: {
                current_posts_count: postsCount,
            },
        });
    });
}

module.exports = init;
