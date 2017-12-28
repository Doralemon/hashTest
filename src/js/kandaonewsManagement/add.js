define(['jquery', 'text!tpls/websiteManagement/kandaoNewsManagementAdd.html', 'artTemplate',
        'common/amdApi', "kindEditor", "lang"
    ],
    function($, kandaoNewsManagementAddTpl, art, amdApi) {
        return function(headFlag,newsType) {
            $('#newsAdd').remove();
            var  language,json={},contextCN,contexEN;
            var kandaoNewsManagementAdd = art.render(kandaoNewsManagementAddTpl,newsType.result);
            var $kandaoNewsManagementAdd = $(kandaoNewsManagementAdd)
                .on('change', '.language  select', function() {
                    language = $(this).val();
                    if (language == "ZH-CN") {
                        $("#newsAddFromCn").show();
                        $("#newsAddFromEn").hide();
                    } else {
                        $("#newsAddFromCn").hide();
                        $("#newsAddFromEn").show();
                    }
                })
                .on('click', '.btnAdd', function(e) {
                    e.preventDefault();
                    language = $("#newsAdd .language select").val();
                    if (language == "ZH-CN") {
                        contextCN = (editor[0].html());
                        sendData('#newsAddFromCn',contextCN,"#newsAddImgCn");
                    } else {
                        contexEN = (editor[1].html());
                        sendData('#newsAddFromEn',contexEN,"#newsAddImgEn");
                    }
                    function sendData(lanSel,context,tumFromId){
                        var title = $('#newsAdd '+lanSel+' input[name = "title"]').val();
                        var category_id = $('#newsAdd '+lanSel+' select[name = "category_id"]').val();
                        var abstract = $('#newsAdd '+lanSel+' textarea[name = "abstract"]').val();
                        var context = context;
                        var description = $('#newsAdd '+lanSel+' textarea[name = "description"]').val();
                        json.title = title;
                        json.abstract = abstract;
                        json.category_id = category_id;
                        json.context = context;
                        json.language = language;
                        if (!$.trim(title) || !$.trim(context) || !$.trim(category_id+"")) {
                            alert("新闻标题(title)/新闻内容(context)/新闻类型(News Style)是必填项！");
                            return;
                        }
                        if ($("#addMedia .thumbnail img").length > 0 && $("#addMedia #picID").val().indexOf(".jpg") == -1) {
                            alert("缩略图请使用后缀为.jpg的图片！");
                            return;
                        }
                        amdApi.ajax({ url: "official/kd_news/add", type: 'post', json: JSON.stringify(json) }, function(pk) {
                            // console.log(pk)
                            if ($kandaoNewsManagementAdd.find(''+lanSel+' .fileinput-exists img').length > 0) {
                                headFlag.flag = false;
                                var data = new FormData($kandaoNewsManagementAdd.find(tumFromId)[0]);
                                $.ajax({
                                    url: amdApi.getFileUrl() + 'upload_action/',
                                    type: 'post',
                                    data: data,
                                    cache: false,
                                    contentType: false,
                                    processData: false,
                                    success: function(datas) {
                                        if (datas.msg) {
                                            console.log('upload success');
                                        } else {
                                            console.log(datas.msg);
                                        }
                                        headFlag.flag = true;
                                        var json = {
                                            "file_hash": datas.file_hash,
                                            "file_url": datas.file_url,
                                            "file_name": datas.file_name,
                                            "file_size": datas.file_size,
                                            "file_type": datas.file_type,
                                            "type":"news",
                                            "pk":pk.result.id
                                        };
                                        amdApi.ajax({ url: 'medias/upload/thumbnail', type: 'post', json: JSON.stringify(json) }, function(resp) {
                                            // alert('提交成功!');
                                        })
                                    },
                                    error: function(res) {
                                        headFlag.flag = true;
                                        console.log(res.msg);
                                    }
                                });
                            }
                            headFlag.flag = true;
                             setTimeout(function() {
                                $('.kandaoNewsManagement').trigger('click');
                            }, 500);
                            $kandaoNewsManagementAdd .modal('hide');
                        })
                    }
                })
                .appendTo("body").modal();
            //初始化kindEditor设置
            var editor = new Array();
            editor[0] = KindEditor.create('#newsAddFromCn textarea[name="context"]', {
                filterMode :false,
                allowFileManager: true,
                resizeType: 0,
                urlType:'domain',
                afterCreate: function() {
                    // getImgStyle();
                }
            });
            editor[1]= KindEditor.create('#newsAddFromEn textarea[name="context"]', {
                filterMode :false,
                allowFileManager: true,
                resizeType: 0,
                urlType:'domain',
                afterCreate: function() {
                    // getImgStyle();
                }
            });
            function getImgStyle(){
                var styleEle = document.createElement('style');
                styleEle.innerText = "img {height:90px}";
                var ele = document.getElementsByClassName('ke-edit-iframe');
                for(var i =0;i<ele.length;i++){
                    ele[i].contentDocument.head.appendChild(styleEle)
                }
            }
            $('#newsAdd').off('shown.bs.modal').on('shown.bs.modal', function(e) {
                $(document).off('focusin.modal'); //解决编辑器弹出层文本框不能输入的问题
            });
        }
    })