$(function() {
    $(window).on('resize', function() {
        window.recentPosts.close();
    });

    $('.show-posts').on('click', function() {
        var thumb = $(this).parents('.thumb');
        if (thumb.hasClass('previews-open')) {
            window.recentPosts.close();
            return;
        }
        window.recentPosts.close();
        thumb.addClass('previews-open');
        window.recentPosts.open(thumb);
    });
});


window.recentPosts = {
    open: function(thumb) {
        var nodes = thumb.data('media').nodes;
        nodes.map(function(n) {
            n.likesCount = n.likesCount.toLocaleString();
            n.commentsCount = n.commentsCount.toLocaleString();
            return n;
        });

        $.get('/templates/preview-recent.mustache')
            .then(function(template) {
                var rendered = Mustache.render(template, {
                    nodes: nodes,
                });

                var nextAll = $(thumb).nextAll('.thumb:visible');
                if (nextAll.length === 0) {
                    $(thumb).after(rendered);
                } else {
                    nextAll.each(function(i) {
                        var currOffsetTop = $(this).offset().top;
                        var thumbOffsetTop = thumb.offset().top;
                        if (currOffsetTop > thumbOffsetTop) {
                            $(this).before(rendered);
                        } else if (i === nextAll.length - 1) {
                            $(this).after(rendered);
                        } else {
                            return true;
                        }
                        return false;
                    });
                }
                $('.recent-posts').delay(25).slideDown(100, function() {
                    var arrowPostion = thumb.offset().left -
                        $(this).offset().left +
                        (thumb.outerWidth() / 2);
                    $('.arrow-up').css('left', arrowPostion - 10);
                });
            });
    },
    close: function() {
        $('.recent-posts').slideUp(75, function() {
            $(this).remove();
        });
        $('.previews-open').removeClass('previews-open');
    },
};
