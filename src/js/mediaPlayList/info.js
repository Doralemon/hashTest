define(['jquery', 'text!tpls/mediaManagement/mediaPlayInfo.html', 'artTemplate', 'common/amdApi',
        'mediaPlayList/tagSort', 'mediaPlayList/addTag', 'mediaPlayList/getData',
        'mediaPlayList/deleteCloumn'
    ],
    function($, mediaPlayInfoTpl, art, amdApi, tagSort, addTag, getData, deleteCloumn) {
        return function(id, m_type) {
            $('#playListAdd').remove();
            amdApi.ajax({ url: 'medias/playlists/' + m_type + '/' + id + '', type: 'get' }, function(res) {
                var mediaPlayInfo = art.render(mediaPlayInfoTpl, res.result);
                var $mediaPlayInfo = $(mediaPlayInfo)
                    .on('click', '.mediaPlayList,.goBack', function() { //回到播放列表
                        $('.playList').click();
                    })
                    .on('click', '.infoSave', function() { //保存
                        var name = $mediaPlayInfo.find('input[name="name"]').val();
                        var description = $mediaPlayInfo.find('textarea[name="description"]').val();
                        if (!$.trim(name)) {
                            alert('请输入名称！');
                            return;
                        }
                        var json = {
                            "name": name,
                            "description": description
                        }
                        amdApi.ajax({ url: 'medias/playlists/' + m_type + '/' + id + '/change', type: 'post', json: JSON.stringify(json) }, function() {
                            alert("保存成功！");
                            $('.playList').click(); //回到播放列表
                        })
                    })
                    .on('click', '.sort', function() { //排序
                        tagSort(id, m_type);
                    })
                    .on('click', '.addTag', function() { //添加栏目
                        addTag(id, m_type);
                    })
                    .on('click', '.infoDelete', function() { //从栏目移除
                        var clounm_id = $(this).parents('tr').attr('id');
                        deleteCloumn(id, m_type, clounm_id);
                    });
                $(".kandao-contentBody").html($mediaPlayInfo);
                getData.myInfoAjax(id, m_type);
            })
        }
    })