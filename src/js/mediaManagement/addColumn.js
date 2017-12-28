define(['jquery', 'artTemplate', 'common/amdApi',
        "bootstrap", "page"
    ],
    function($, art, amdApi) {
        return function() {
            amdApi.ajax({ url: 'medias/columns/add', type: 'post' }, function(res) {
                // console.log(res);
                $('#cloumnManagement').find('.tagstoAdd').children().removeClass('active');
                var str = ' <span class="sBox active" id="' + res.result.id + '">' + res.result.name + '</span>';
                $('#cloumnManagement').find('.tagstoAdd').append(str);
                $('.cloumnManagement-bottom').find('input[name="name"]').val(res.result.name);
                $('.cloumnManagement-bottom').find('input[name="name_en"]').val('');
                $('.cloumnManagement-bottom').find('textarea[name="description"]').val('');
                $('.cloumnManagement-bottom').find('textarea[name="description_en"]').val('');
                $('.cloumnManagement-bottom').find('.scaleImg img').attr("src", "img/giveJpg.jpg");
                $('.bottomMateial-bottom>ul').html('');
            })
        }
    })