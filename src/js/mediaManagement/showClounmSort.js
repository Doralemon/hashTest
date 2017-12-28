define(['jquery', 'artTemplate', 'common/amdApi'],
    function($, art, amdApi) {
        return function(id, type, date_desc) {
            var json = {
                type: type,
                date_desc: date_desc
            }
            amdApi.ajax({ url: 'medias/columns/' + id + '/medias', type: 'get', json: json }, function(res) {
                if (res.result.length == 0) {
                    $('.bottomMateial-bottom>ul').html('暂时没有素材哦~~');
                } else {
                    var arr = ['<li class="list-group-item">' +
                        '<span>素材</span>' +
                        '<span>类型</span>' +
                        '<span>创建时间</span>' +
                        '</li>'
                    ]
                    for (var i = 0; i < res.result.length; i++) {
                        var obj = res.result[i];
                        var str = '<li class="list-group-item list-item" id="' + obj.id + '">' +
                            '<span>' + obj.name + '</span><span>' + obj.m_type + '</span>' +
                            '<span>' + obj.date_created + '</span>' +
                            '<span class="glyphicon glyphicon-align-justify"></span>' +
                            '</li>';
                        arr.push(str);
                    }
                    var mediaStr = arr.join("");
                    $('.bottomMateial-bottom>ul').html(mediaStr);
                }
            })
        }
    })