const fs = require('fs');
const request = require('request');

class UserData {
    constructor(dataFile) {
        this._dataFile = dataFile;
    }

    getAll() {
        return this._load()
            .then((users) => {
                users = this._mapDetails(users);
                return Promise.resolve(users);
            });
    }

    add(username) {
        return this._load()
            .then((users) => {
                const exists = users.find((u) => u.username === username);
                if (exists) {
                    return Promise.reject('User already exists.');
                }
                users.push({ username: username });
                return this._save(users, this._dataFile);
            })
            .then(() => this.update());
    }

    update() {
        let users;
        return this._load()
            .then((_users) => {
                users = _users;
                const requests = users.map(this._makeRequest);
                return Promise.all(requests);
            })
            .then((responses) => {
                const newUsers = responses.map((r) => r.user);

                for (let i = 0; i < users.length; i += 1) {
                    if (newUsers[i]) {
                        users[i] = this._updateOne(users[i], newUsers[i]);
                    }
                }

                return this._save(users);
            });
    }

    delete(username) {
        return this._load()
            .then((users) => {
                const newUsers = users.filter((u) => u.username !== username);
                return this._save(newUsers);
            });
    }

    edit(username, newUsername) {
        return this._load()
            .then((users) => {
                users.forEach((u) => {
                    if (u.username === username) {
                        u.username = newUsername;
                    }
                });
                return this._save(users);
            })
            .then(() => this.update());
    }

    _updateOne(curr, updated) {
        curr.username = updated.username;
        curr.name = updated.full_name;
        curr.profilePicUrl = updated.profile_pic_url;
        curr.biography = updated.biography;
        if (curr.biography) {
            curr.biography = curr.biography.replace(/[\n\r]/, '');
        }
        curr.isPrivate = updated.is_private;
        curr.media = {};
        curr.media.count = updated.media.count;

        if (!curr.isPrivate) {
            curr.media.nodes = [];
            for (let j = 0; j < 3; j += 1) {
                if (updated.media.nodes[j]) {
                    curr.media.nodes[j] = {};

                    curr.media.nodes[j]
                        .thumbnailSrc = updated.media.nodes[j]
                            .thumbnail_src.replace(/jpg.+/, 'jpg');

                    curr.media.nodes[j]
                        .code = updated.media.nodes[j]
                            .code;

                    curr.media.nodes[j]
                        .likesCount = updated.media.nodes[j]
                            .likes.count;

                    curr.media.nodes[j]
                        .commentsCount = updated.media.nodes[j]
                            .comments.count;
                }
            }
        } else {
            curr.media.nodes = null;
        }
        return curr;
    }

    _makeRequest(user) {
        return new Promise((resolve, reject) => {
            request.get({
                url: `https://www.instagram.com/${user.username}/?__a=1`,
                json: true,
            }, (err, res, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    _load() {
        return new Promise((resolve, reject) => {
            fs.readFile(this._dataFile, (err, data) => {
                const users = JSON.parse(data.toString());
                resolve(users);
            });
        });
    }

    _save(newUsers) {
        return new Promise((resolve, reject) => {
            const fileContent = JSON.stringify(newUsers, null, 1);
            fs.writeFile(this._dataFile, fileContent, (err) => {
                resolve();
            });
        });
    }

    _mapDetails(users) {
        return users.map((u) => {
            u.profileUrl = `https://www.instagram.com/_u/${u.username}`;
            if (u.profilePicUrl) {
                u.profilePicZoomUrl = u.profilePicUrl
                    .replace('/s150x150/', '/');
            }
            return u;
        });
    }
}


function init(dataFile) {
    return {
        users: new UserData(dataFile),
    };
}

module.exports = init;
