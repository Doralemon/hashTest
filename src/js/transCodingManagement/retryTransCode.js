define(['jquery', 'common/amdApi', 'common/getPage', 'transCodingManagement/getData'],
    function($, amdApi, getPage, getData) {
        return function(id, line_id) {
            amdApi.ajax({ url: 'medias/transcode/' + id + '/' + line_id + '/restart', type: 'post' }, function() {
                alert("开始重新转码！");
                $('#transCodeInfo').modal('hide');
                $('.transcodingManagement').click();
            })
        }
    })