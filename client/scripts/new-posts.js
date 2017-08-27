$(function() {
    window.currentPostsCount = getCurrentPostsCount();

    if (typeof (Storage) !== 'undefined') {
        if (localStorage.postsCount) {
            var savedPostsCount = JSON.parse(localStorage.postsCount);
            $('.thumb').each(function(i, el) {
                var username = $(el).data('username');

                if (window.currentPostsCount[username] > savedPostsCount[username]) {
                    highlight(el);
                } else {
                    updateStorage(username);
                }
            });
        } else {
            createStorage();
        }

        $('.thumb').on('click', function(e) {
            var username = $(this).data('username');
            updateStorage(username);
            clear(this);
        });
    }
});

function getCurrentPostsCount() {
    var currentPostsCount = {};
    $('.thumb').each(function(i, el) {
        var username = $(el).data('username');
        var postsCount = $(el).data('media').count;
        currentPostsCount[username] = postsCount;
    });
    return currentPostsCount;
}

function highlight(thumb) {
    $(thumb).addClass('new');
}

function clear(thumb) {
    $(thumb).removeClass('new');
}

function updateStorage(username) {
    var savedPostsCount = JSON.parse(localStorage.postsCount);
    savedPostsCount[username] = window.currentPostsCount[username];
    localStorage.postsCount = JSON.stringify(savedPostsCount);
}

function createStorage() {
    localStorage.postsCount = JSON.stringify(window.currentPostsCount);
}
