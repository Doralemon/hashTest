define(['jquery', 'text!tpls/mediaManagement/mediaPlayList.html', 'artTemplate', 'common/amdApi',
        'mediaPlayList/add', 'mediaPlayList/info', 'mediaPlayList/getData',
        'mediaPlayList/delete', 'common/getPage',
        "bootstrap", "page"
    ],
    function($, mediaPlayListTpl, art, amdApi, palyAdd, playInfo, getData, deleteById, getPage) {
        return function(transition) {
            var id, m_type, selecttype, q, page;
            selecttype = transition.query.type || "";
            q = transition.query.q || "";
            if (sessionStorage.getItem("page") !== "null" || sessionStorage.getItem("page") !== null) {
                page = sessionStorage.getItem("page");
            } else {
                page = "1"
            }
            var json = {
                limit: 10,
                page: page || 1,
                q: q,
                type: selecttype
            }
            url = "#/media/playList?page=" + page + "&q=" + q + "&type=" + selecttype;
            sessionStorage.removeItem("playListhashUrl");
            sessionStorage.setItem("playListhashUrl", url); //存储url给详情页使用
            amdApi.ajax({ url: 'medias/playlists', type: 'get', json: json }, function(res) {
                var mediaPlayList = art.render(mediaPlayListTpl, {});
                var $mediaPlayList = $(mediaPlayList)
                    .on('click', '.palyListSearch', function() { //搜索
                        sessionStorage.setItem("page", 1);
                        q = $mediaPlayList.find('input[name="q"]').val();
                        selecttype = $mediaPlayList.find('select[name="type"]').val();
                        url = "#/media/playList?page=" + page + "&q=" + q + "&type=" + selecttype;
                        window.location.href = url;
                    })
                    .on('click', '.playAdd', function() { //新建
                        sessionStorage.setItem("page", 1);
                        palyAdd();
                    })
                    .on('click', '.btnDelete', function() { //删除播放列表
                        id = $(this).parents('tr').attr('id');
                        m_type = $(this).parents('tr').children().eq(2).text();
                        deleteById(id, m_type);
                    })
                    .on('keydown', 'input[name="q"]', function(e) {
                        if (e.keyCode == 13) {
                            e.preventDefault();
                            $mediaPlayList.find('.palyListSearch').trigger('click');
                        }
                    });
                $(".kandao-contentBody").html($mediaPlayList);
                getData.myAjax(json, res);
                $(".kandao-playList").find('input[name="q"]').val(q); //设置q
                $(".kandao-playList").find('select[name="type"]').val(selecttype); //设置关键词select
            });
        }
    })