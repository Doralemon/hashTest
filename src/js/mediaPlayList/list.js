define(['jquery', 'text!tpls/mediaManagement/mediaPlayList.html', 'artTemplate', 'common/amdApi',
        'mediaPlayList/add', 'mediaPlayList/info', 'mediaPlayList/getData', 'mediaPlayList/listSearch',
        'mediaPlayList/delete', 'common/getPage',
        "bootstrap", "page"
    ],
    function($, mediaPlayListTpl, art, amdApi, palyAdd, playInfo, getData, listSearch, deleteById, getPage) {
        return function(playListFlag) {
            var obj = getPage($('.kandao-playList'), 10, playListFlag.flag1);
            if ($('.playSearchContent table tbody tr').length == 1 && !playListFlag.flag2) {
                obj.json.page = obj.json.page - 1 || 1;
            }
            amdApi.ajax({ url: 'medias/playlists', type: 'get', json: obj.json }, function(res) {
                var mediaPlayList = art.render(mediaPlayListTpl, {});
                var $mediaPlayList = $(mediaPlayList)
                    .on('click', '.palyListSearch', function() { //搜索
                        // console.log(123)
                        var q = $mediaPlayList.find('input[name="q"]').val();
                        var type = $mediaPlayList.find('select[name="type"]').val();
                        listSearch(q, type);
                    })
                    .on('click', '.playAdd', function() { //新建
                        playListFlag.flag1 = false;
                        palyAdd();
                    })
                    .on('click', '.btnInfo', function() { //播放列表详情
                        var id = $(this).parents('tr').attr('id');
                        var m_type = $(this).parents('tr').children().eq(2).text();
                        playInfo(id, m_type);
                    })
                    .on('click', '.btnDelete', function() { //删除播放列表
                        playListFlag.flag2 = false;
                        var id = $(this).parents('tr').attr('id');
                        var m_type = $(this).parents('tr').children().eq(2).text();
                        deleteById(id, m_type);
                    })
                    .on('keydown', 'input[name="q"]', function(e) {
                        if (e.keyCode == 13) {
                            e.preventDefault();
                            $mediaPlayList.find('.palyListSearch').trigger('click');
                        }
                    });
                playListFlag.flag1 = true;
                playListFlag.flag2 = true;
                $(".kandao-contentBody").html($mediaPlayList);
                getData.myAjax(obj.json, res);
                $('.breadcrumb li').eq(0).on('click', function() { //回首页
                    $('.home').trigger('click');
                })
            });
        }
    })