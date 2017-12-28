define(['jquery', 'text!tpls/mediaManagement/mediatranscoding.html', 'artTemplate', 'common/amdApi',
        "bootstrap", "page"
    ],
    function($, mediatranscodingTpl, art, amdApi) {
        return function(id, type) {
            var json = {
                "warping": "",
                "resolution": "",
                "codec": "",
                "vbr": ""
            };
            if (type == "photo") { //图片转码
                // console.log(json)
                myAjax(function(){
                    alert('转码任务已经创建，可以去转码管理页面查看详情!');                    
                });
            } else { //视频转码
                $('#transCoding').remove();
                amdApi.ajax({ url: 'medias/video/format/parameter', type: 'get' }, function(res) {
                    // console.log(res);
                    var mediatranscoding = art.render(mediatranscodingTpl, res.result);
                    var $mediatranscoding = $(mediatranscoding)
                        .on('submit', 'form', function(e) {
                            e.preventDefault();
                            var warping = $mediatranscoding.find('select[name="warping"]').val();
                            var resolution = $mediatranscoding.find('select[name="resolution"]').val();
                            var codec = $mediatranscoding.find('select[name="codec"]').val();
                            var vbr = $mediatranscoding.find('select[name="vbr"]').val();
                            var container = $mediatranscoding.find('select[name="container"]').val();
                            var fov = $mediatranscoding.find('select[name="fov"]').val();
                            var layout = $mediatranscoding.find('select[name="layout"]').val();
                            if (!$.trim(warping) || !$.trim(resolution) || !$.trim(codec) || !$.trim(vbr)) {
                                alert("请选择完整的转码信息！");
                                return;
                            }
                            json = {
                                    "warping": warping,
                                    "resolution": resolution,
                                    "codec": codec,
                                    "vbr": vbr,
                                    "container":container,
                                    "fov":fov,
                                    "layout":layout
                                }
                                // console.log(json)
                            myAjax(function() {
                                alert('转码任务已经创建，可以去转码管理页面查看详情!');                                                    
                                $mediatranscoding.modal('hide');
                            });
                        })
                        .appendTo('body').modal();
                })
            }

            function myAjax(callback) {
                amdApi.ajax({ url: 'medias/' + type + '/' + id + '/transcode', json: JSON.stringify(json), type: 'post' }, function(res) {
                    callback && callback(res);
                })
            }
        }
    })