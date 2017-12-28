define(['jquery', 'text!tpls/mediaManagement/transCodeInitSet.html','text!tpls/mediaManagement/mediatranscoding.html',
 'artTemplate', 'common/amdApi','../common/getPage',
    ],
    function($, transCodeInitSetTpl,mediatranscodingTpl, art, amdApi,getPage) {
        return function() {
            $('#codeInit').remove();
            var type;
            var $transCodeInitSet = $(transCodeInitSetTpl)
                .on('click', '.playAdd', function() { //添加
                    type = $transCodeInitSet.find("#selTpye").val();
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
                                    if (!$.trim(warping) || !$.trim(resolution) || !$.trim(codec) || !$.trim(vbr)) {
                                        alert("请选择完整的转码信息！");
                                        return;
                                    }
                                    json = {
                                            "warping": warping,
                                            "resolution": resolution,
                                            "codec": codec,
                                            "vbr": vbr
                                        }
                                        // console.log(json)
                                    myAjax(function() {
                                        alert('转码任务已经创建，可以去转码管理页面查看详情!');                                                    
                                        $mediatranscoding.modal('hide');
                                    });
                                })
                                .appendTo('body').modal();
                        })
                    function myAjax(callback) {
                        amdApi.ajax({ url: "", json: JSON.stringify(json), type: 'post' }, function(res) {
                            callback && callback(res);
                        })
                    }
                })
                .on("click",".btnEdit",function(){ //列表编辑
                    var flag = true;
                    var obj = getPage($('#codeInit'), 10,flag );
                    console.log("bianji")
                })
                .on("click",".btnDelete",function(){ //列表删除
                    console.log("删除")
                })
                .appendTo('body').modal();
        }
    })