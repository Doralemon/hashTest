define(['jquery', 'text!tpls/mediaManagement/playListAdd.html', 'artTemplate', 'common/amdApi'],
    function($, playListAddTpl, art, amdApi) {
        return function() {
            $('#playListAdd').remove();
            var $playListAdd = $(playListAddTpl)
                .on('submit', 'form', function(e) {
                    e.preventDefault();
                    var name = $('#playListAdd input[name="name"]').val();
                    var description = $('#playListAdd textarea[name="description"]').val();
                    var m_type = $('#playListAdd select[name="type"]').val();
                    if (!$.trim(name) || !m_type) {
                        alert("名称和类型是必填的！");
                        return;
                    }
                    var json = {
                        "name": name,
                        "description": description,
                        "m_type": m_type
                    }
                    amdApi.ajax({ url: 'medias/playlists/add', type: 'POST', json: JSON.stringify(json) }, function(res) {
                        $playListAdd.modal('hide');
                        $('.playList').click();
                    })
                })
                .appendTo('body').modal();
        }
    })