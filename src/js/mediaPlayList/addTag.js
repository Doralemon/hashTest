define(['jquery', 'text!tpls/mediaManagement/mediaPlayAddTag.html', 'artTemplate', 'common/amdApi',
        'mediaPlayList/infoCloumnSearch', 'mediaPlayList/getData',
    ],
    function($, mediaPlayAddTagTpl, art, amdApi, infoCloumnSearch, getData) {
        return function(id, m_type) {
            var before_column = [],
                after_column = [];
            $('#PlayAddTag').remove();
            amdApi.ajax({ url: 'medias/playlists/' + m_type + '/' + id + '/members_columns', type: 'get' }, function(res) {
                // console.log(res)
                var has_selected_info = res.result.has_selected_info
                has_selected_info.forEach(function(v, i) {
                    before_column.push(v.id);
                });
                // console.log(before_column);
                var mediaPlayAddTag = art.render(mediaPlayAddTagTpl, res.result);
                $mediaPlayAddTag = $(mediaPlayAddTag)
                    .on('submit', 'form', function(e) {
                        e.preventDefault();
                        ($mediaPlayAddTag.find('.selCloumn .sBox')).each(function(i, v) {
                            after_column.push($(v).attr('id'));
                        });
                        var json = {
                            "before_column": before_column.join(","),
                            "after_column": after_column.join(",")
                        }
                        amdApi.ajax({ url: 'medias/playlists/' + m_type + '/' + id + '/members_add', type: 'post', json: JSON.stringify(json) }, function(res) {
                            getData.myInfoAjax(id, m_type);
                            $mediaPlayAddTag.modal('hide');
                        })
                    })
                    .appendTo('body').modal();
                infoCloumnSearch.search();
                infoCloumnSearch.moveCloumn();
            })
        }
    })