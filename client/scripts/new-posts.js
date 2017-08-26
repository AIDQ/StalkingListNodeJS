$(function() {
    if (typeof (Storage) !== 'undefined') {
        function highlight(thumb) {
            $(thumb).addClass('new');
        }

        function clear(thumb) {
            $(thumb).removeClass('new');
        }

        function updateStorage(i) {
            var savedPostsCount = JSON.parse(localStorage.postsCount);
            savedPostsCount[i] = window.ctx.currentPostsCount[i];
            localStorage.postsCount = JSON.stringify(savedPostsCount);
        }

        if (localStorage.postsCount) {
            var savedPostsCount = JSON.parse(localStorage.postsCount);
            $('.thumb').each(function(i, thumb) {
                if (window.ctx.currentPostsCount[i] > savedPostsCount[i]) {
                    highlight(thumb);
                } else if (window.ctx.currentPostsCount[i] < savedPostsCount[i]) {
                    updateStorage(i);
                }
            });
        } else {
            localStorage.postsCount = JSON.stringify(window.ctx.currentPostsCount);
        }

        $('.thumb').on('click', function() {
            var i = $(this).index();
            updateStorage(i);
            clear(this);
        });
    }
});
