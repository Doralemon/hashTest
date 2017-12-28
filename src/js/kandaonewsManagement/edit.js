define(['jquery', 'text!tpls/websiteManagement/kandaoNewsManagementEdit.html', 'artTemplate', 'common/amdApi'
,'common/getPage','kandaonewsManagement/getData'],
    function($, kandaoNewsManagementEditTpl, art, amdApi,getPage,getData) {
        return function(headFlag,id,newsType,category_id,q,language) {
            $('#kandaoNewsEdit').remove();
            var language,context,json={};
            var flag = true;
            var obj = getPage($('.kandao-news'), 10,flag );
            obj.json.q = q;
            obj.json.language = language;
            obj.json.category_id = category_id;
            amdApi.ajax({ url: 'official/kd_news/'+id+'/info', type: 'get' },function(res){
                // console.log(res.result);
                res.result.testText = res.result.abstract;
                res.result.newsType = newsType.result;
                language = res.result.language;
                var kandaoNewsManagementEdit = art.render(kandaoNewsManagementEditTpl,res.result);
                var $kandaoNewsManagementEdit = $(kandaoNewsManagementEdit)
                    .on('click', '.btnSave', function(e) {
                        e.preventDefault();
                        if (language == "ZH-CN") {
                            context = editor[0].html();
                            sendData("#kandaoNewsEditFromCn","#kandaoNewsEditImgCn");
                        } else{
                            context =  editor[1].html();
                            sendData("#kandaoNewsEditFromEn","#kandaoNewsEditImgEn");                        
                        }
                        function sendData(lanSel,selId){
                            var title = $('#kandaoNewsEdit '+lanSel+' input[name = "title"]').val();
                            var abstract = $('#kandaoNewsEdit '+lanSel+' input[name = "abstract"]').val();
                            var category_id = $('#kandaoNewsEdit '+lanSel+' select[name = "category_id"]').val();
                            json.title = title;
                            json.abstract = abstract;
                            json.context = context;
                            json.category_id = category_id;
                            if (!$.trim(title)| !$.trim(context)) {
                                alert("请填写新闻标题/新闻内容后再提交！");
                                return;
                            }
                            if ($("#addMedia .thumbnail img").length > 0 && $("#addMedia #picID").val().indexOf(".jpg") == -1) {
                                alert("缩略图请使用后缀为.jpg的图片！");
                                return;
                            }
                            amdApi.ajax({ url: "official/kd_news/"+id+"/change", type: 'post', json: JSON.stringify(json) }, function() {
                                if ($kandaoNewsManagementEdit.find('.fileinput-exists img').length > 0) {
                                    headFlag.flag = false;
                                    var data = new FormData($kandaoNewsManagementEdit.find(selId)[0]);
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
                                                "pk":id
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
                                amdApi.ajax({ url: 'official/kd_news/list', type: 'get', json:obj.json },function(res){
                                    getData.getListData(res);
                                    setTimeout(function() {
                                        $kandaoNewsManagementEdit.modal('hide');
                                        $('.modal-backdrop').css('display', "none");
                                    }, 300);
                                })
                            })
                            }
                    })
                    .appendTo("body").modal();
                    if (language == "ZH-CN") {
                        $("#kandaoNewsEditFromCn").show();
                        $("#kandaoNewsEditFromEn").hide();
                    } else{
                        $("#kandaoNewsEditFromCn").hide();
                        $("#kandaoNewsEditFromEn").show();
                    }
                    $('#kandaoNewsEdit select[name="category_id"] option').each(function(i,v){
                        if($(v).val()==res.result.category_id){
                            $(this).prop('selected', true);
                        }
                    });
                    var editor = new Array();
                    editor[0] = KindEditor.create('#kandaoNewsEditFromCn textarea[name="context"]', {
                        filterMode :false,
                        allowFileManager: true,
                        resizeType: 0,
                        urlType:'domain',
                        // uploadJson: amdApi.getFileUrl() + 'upload_action/',
                        afterCreate: function() {
                            // getImgStyle()
                        }
                    });
                    editor[1] = KindEditor.create('#kandaoNewsEditFromEn textarea[name="context"]', {
                        filterMode :false,
                        allowFileManager: true,
                        resizeType: 0,
                        urlType:'domain',
                        afterCreate: function() {
                            // getImgStyle()
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
                $('#kandaoNewsEdit').off('shown.bs.modal').on('shown.bs.modal', function(e) {
                    $(document).off('focusin.modal'); //解决编辑器弹出层文本框不能输入的问题
                });
                if (language == "ZH-CN") {
                    editor[0].html(res.result.context);
                } else{
                    editor[1].html(res.result.context);
                }
            });
              
        }
    })