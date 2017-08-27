window.popUp = {
    opened: false,
    overlay: function() {
        this.opened = true;
        $('main').addClass('blur');
        $('.overlay').show();
        window.scrollPosition = $('body').scrollTop();
        $('.overlay').fadeIn(250, function() {
            $('body').addClass('no-scroll');
            $('body').css('top', -window.scrollPosition);
        });
    },
    openDialog: function(username) {
        this.overlay();
        $.get('/templates/dialog-box.mustache')
            .then(function(template) {
                var rendered = Mustache
                    .render(template, {
                        username: username,
                    });
                $('.overlay').after(rendered);
                $('.pop-up').fadeIn(250);
                $('.pop-up a.no').on('click', function(e) {
                    window.popUp.close();
                    e.preventDefault();
                });
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
            $('.overlay').hide();
        });
        $('.pop-up').fadeOut(250, function() {
            $(this).remove();
        });
        this.opened = false;
    },
};
