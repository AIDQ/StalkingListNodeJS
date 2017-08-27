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
        var content = '<div class="recent-posts"><span class="arrow-up"></span>';
        for (var j = 0; j < nodes.length; j += 1) {
            var node = nodes[j];
            content +=
                '<div class="img-container">' +
                '<a href="https://www.instagram.com/p/' + node.code + '" target="_blank">' +
                '<img src="' + node.thumbnailSrc + '">' +
                '<div class="img-overlay">' +
                '<span class="img-overlay-text">' +
                '<span class="overlay-icon likes">' + node.likesCount + '</span>' +
                '<span class="overlay-icon comments">' + node.commentsCount + '</span>' +
                '</span>' +
                '</div>' +
                '</a>' +
                '</div>';
        }
        content += '</div>';

        var nextAll = $(thumb).nextAll('.thumb:visible');
        if (nextAll.length === 0) {
            $(thumb).after(content);
        } else {
            nextAll.each(function(i) {
                var currOffsetTop = $(this).offset().top;
                var thumbOffsetTop = thumb.offset().top;
                if (currOffsetTop > thumbOffsetTop) {
                    $(this).before(content);
                } else if (i === nextAll.length - 1) {
                    $(this).after(content);
                } else {
                    return true;
                }
                return false;
            });
        }
        $('.recent-posts').delay(25).slideDown(100, function() {
            $('.arrow-up').css(
                'left', thumb.offset().left - $(this).offset().left + thumb.outerWidth() / 2 - 10
            );
        });
    },
    close: function() {
        $('.recent-posts').slideUp(75, function() {
            $(this).remove();
        });
        $('.previews-open').removeClass('previews-open');
    },
};
