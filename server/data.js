const fs = require('fs');

function init(dataFile) {
    const igBaseUrl = 'https://www.instagram.com/_u/';

    const fileContent = fs.readFileSync(dataFile, 'utf-8');
    const users = JSON.parse(fileContent);
    users.map((u) => {
        u.profile_url = igBaseUrl + u.username;
        if (u.profile_pic_url) {
            u.profile_pic_zoom_url = u.profile_pic_url
                .replace('/s150x150/', '/');
        }
        return u;
    });

    return {
        users: {
            getAll: () => users,
        },
    };
}

module.exports = init;
