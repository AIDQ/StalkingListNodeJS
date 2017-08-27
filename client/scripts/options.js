$(function() {
    // Thumb options action
    $('.opt').on('click', function() {
        window.options.opened = $(this);
        window.options.toggleOpen();
    });
    $('.thumb .opt a').on('click', function(e) {
        var $this = $(this);
        var username = $this.parents('.thumb').data('username');
        window.options.toggleOpen();

        if ($this.attr('href') === '#edit') {
            window.editForm.open(username, $this);
            e.preventDefault();
        }
        if ($this.attr('href') === '#remove') {
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

// popUp object
window.popUp = {
    opened: false,
    overlay: function() {
        this.opened = true;
        $('main').addClass('blur');
        $('main').after('<div class="overlay"><div>&times</div></div>');
        window.scrollPosition = $('body').scrollTop();
        $('.overlay').fadeIn(250, function() {
            $('body').addClass('no-scroll');
            $('body').css('top', -window.scrollPosition);
        });
    },
    openDialog: function(username) {
        this.overlay();
        $('.overlay').after(
            '<div class="pop-up dialog">' +
            '<p>Are you sure you want to remove<br><b>' + username + '?</b></p>' +
            '<a class="yes" href="/delete?username=' + username + '">Yes</a>' +
            '<a class="no" href="#">No</a>' +
            '</div>'
        );
        $('.pop-up').fadeIn(250);
        $('.pop-up a.no').on('click', function(e) {
            window.popUp.close();
            e.preventDefault();
        });
    },
    openImage: function(imgurl) {
        this.overlay();
        $('.overlay').after('<img class="pop-up image" src="' + imgurl + '">');
        $('.pop-up').fadeIn(250);
    },
    close: function() {
        $('body').removeClass('no-scroll');
        $('body').removeAttr('style');
        $('body').scrollTop(window.scrollPosition);
        $('main').removeClass('blur');
        $('.overlay').fadeOut(250, function() {
            $('.overlay').remove();
        });
        $('.pop-up').fadeOut(250, function() {
            $(this).remove();
        });
        this.opened = false;
    },
};

// editForm object
window.editForm = {
    opened: null, // .thumb
    open: function(username, $this) {
        this.opened = $this.parents('.thumb');
        this.opened.addClass('edit');
        this.opened.children('.username').after(
            '<form action="/edit" method="GET">' +
            '<input type="hidden" name="username" value="' + username + '">' +
            '<input type="text" name="newUsername" autocomplete="off">' +
            '<input type="submit" value="&#10003;">' +
            '</form>'
        );
        var nameInput = this.opened.find('input[name=newUsername]');
        nameInput.focus();
        nameInput.val(username);
        this.opened.children('form').on('submit', function(e) {
            if (!nameInput.val() || nameInput.val() === username) {
                e.preventDefault();
                window.editForm.close();
            }
        });
    },
    close: function() {
        this.opened.removeClass('edit');
        this.opened.children('form').remove();
    },
};

// Thumb options object
window.options = {
    opened: null, // .thumb .opt
    toggleOpen: function() {
        this.opened.children().toggle();
        this.opened.toggleClass('opened');
    },
    close: function() {
        this.opened.children().hide();
        this.opened.removeClass('opened');
    },
};
