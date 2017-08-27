window.options = {
    opened: null,
    toggleOpen: function() {
        this.opened.children().toggle();
        this.opened.toggleClass('opened');
    },
    close: function() {
        this.opened.children().hide();
        this.opened.removeClass('opened');
    },
};

$(function() {
    // Thumb options action
    $('.opt').on('click', function() {
        window.options.opened = $(this);
        window.options.toggleOpen();
    });
    $('.thumb .opt a').on('click', function(e) {
        var $link = $(this);
        var $thumb = $link.parents('.thumb');
        var username = $thumb.data('username');

        window.options.toggleOpen();

        if ($link.attr('href') === '#edit') {
            window.editForm.open(username, $thumb);
            e.preventDefault();
        }
        if ($link.attr('href') === '#remove') {
            window.popUp.openDialog(username);
            e.preventDefault();
        }
    });

    // Zoom profile-pic action
    $('.thumb .zoom-in-img').parent().on('click', function(e) {
        var imgurl = $(this).attr('href');
        window.popUp.openImage(imgurl);
        e.preventDefault();
    });

    // Recent posts
    $('.thumb .username a, .thumb .posts').on({
        mouseenter: function() {
            $(this).parents('.thumb').children('.posts').show();
        },
        mouseleave: function() {
            $(this).parents('.thumb').children('.posts').hide(0);
        },
    });

    // Outside click listener
    $(document).mouseup(function(e) {
        if (window.options.opened !== null) {
            if (!window.options.opened.is(e.target)) {
                window.options.close();
            }
        }
        if (window.popUp.opened) {
            if (!($('.pop-up').find('*').addBack().is(e.target))) {
                window.popUp.close();
            }
        }
    });

    $(document).mousedown(function(e) {
        if (window.editForm.opened != null) {
            if (!window.editForm.opened.find('input').is(e.target)) {
                window.editForm.close();
            }
        }
    });

    // Esc key listener
    $(document).keyup(function(e) {
        if (e.keyCode === 27) {
            if (window.popUp.opened) {
                window.popUp.close();
            }
            if (window.options.opened !== null) {
                window.options.close();
            }
            if (window.editForm.opened !== null) {
                window.editForm.close();
            }
        }
    });
});
