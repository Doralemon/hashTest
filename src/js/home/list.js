define(['jquery', 'text!tpls/home.html', "artTemplate", "bootstrap", "page"],
    function($, homeTpl, art) {
        return function() {
            var home = art.render(homeTpl, {});
            var $home = $(home)
            $(".kandao-contentBody").html($home);
        }
    })