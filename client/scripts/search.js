$(function() {
    $('.thumbs').append(
        '<p class="add-person" style="display:none"></p>'
    );

    var $searchBox = $('.search');
    $searchBox.focus();
    $searchBox.on('keyup', function() {
        var input = $searchBox.val().trim();
        window.recentPosts.close();
        if (input) {
            $('.thumb').hide();
            window.scrollTo(0, 0);

            var fullUsernameMatch = false;
            $('.thumb').filter(function() {
                var matchRegex = new RegExp(input, 'i');
                var username = $(this).data('username');
                var name = $(this).find('.name').html();

                if (username.match(matchRegex) || name.match(matchRegex)) {
                    if (username === input) {
                        fullUsernameMatch = true;
                    }
                    return true;
                } else {
                    return false;
                }
            }).show();

            if (input === 'new') {
                $('.thumb.new').show();
                fullUsernameMatch = true;
            }

            if (!fullUsernameMatch) {
                $('.add-person').show().html(
                    'User <b>' + input + '</b> not found.<br>' +
                    '<a href="add?username=' + input + '">Add <b>' + input + '</b></a>'
                );
            } else {
                $('.add-person').hide();
            }
        } else {
            $('.thumb').show();
            $('.add-person').hide();
        }
    });
});
