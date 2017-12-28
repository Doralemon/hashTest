define(['jquery', 'artTemplate', 'common/amdApi'],
    function($, art, amdApi) {
        return function(id) {
            amdApi.ajax({ url: 'medias/columns/' + id + '/info', type: 'get' }, function(res) {
                $('#picID').val('');
                $('#cloumnManagement input[name="name"]').val(res.result.name);
                $('#cloumnManagement input[name="name_en"]').val(res.result.name_en);
                $('#cloumnManagement textarea[name="description"]').val(res.result.description);
                $('#cloumnManagement textarea[name="description_en"]').val(res.result.description_en);
                if (res.result.uri) {
                    $('#cloumnManagement .scaleImg img').attr("src", res.result.uri);
                } else {
                    $('.cloumnManagement-bottom').find('.scaleImg img').attr("src", "img/giveJpg.jpg");
                }
            })
        }
    })