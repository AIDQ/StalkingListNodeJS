window.editForm = {
    opened: null,
    open: function(username, $thumb) {
        var self = this;
        this.opened = $thumb;
        this.opened.addClass('edit');
        $.get('/templates/edit-form.mustache')
            .then(function(template) {
                var rendered = Mustache.render(template, {
                    username: username,
                });
                self.opened.children('.username').after(rendered);
                var nameInput = self.opened.find('input[name=newUsername]');
                nameInput.focus();
                nameInput.val(username);
                self.opened.children('form')
                    .on('submit', function(e) {
                        if (!nameInput.val() || nameInput.val() === username) {
                            e.preventDefault();
                            self.close();
                        }
                    });
            });
    },
    close: function() {
        this.opened.removeClass('edit');
        this.opened.children('form').remove();
        this.opened = null;
    },
};
