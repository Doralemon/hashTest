define(['jquery', 'text!tpls/mediaManagement/playListInfoSort.html', 'artTemplate', 'common/amdApi',
        'sortable', 'mediaPlayList/getData',
    ],
    function($, playListInfoSortTpl, art, amdApi, Sortable, getData) {
        return function(id, m_type) {
            var after_order = [];
            $('#playListSort').remove();
            amdApi.ajax({ url: 'medias/playlists/sortinfo', type: 'get' }, function(res) { //获取原始排序
                // console.log(res)
                var playListInfoSort = art.render(playListInfoSortTpl, res.result);
                var $playListInfoSort = $(playListInfoSort)
                    .on('submit', 'form', function(e) {
                        e.preventDefault();
                        ($playListInfoSort.find('.list-group-item')).each(function(i, v) {
                            after_order.push($(v).attr('id'));
                        });
                        var json = {
                            "after_order": after_order.join(",")
                        }
                        amdApi.ajax({ url: 'medias/playlists/sort_change', type: 'post', json: JSON.stringify(json) }, function(res) {
                            getData.myInfoAjax(id, m_type);
                            $playListInfoSort.modal('hide');
                        })
                    })
                    .appendTo('body').modal();
                var el = document.getElementById('items');
                new Sortable(el);
            })
        }
    })