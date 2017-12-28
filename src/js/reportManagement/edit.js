define(['jquery', 'text!tpls/websiteManagement/reportManagementEdit.html', 'artTemplate', 'common/amdApi',
'reportManagement/getData','../common/getPage'],
    function($, reportManagementEditTpl, art, amdApi,getData,getPage) {
        return function(id,headFlag,q,language) {
            $('#reportEdit').remove();
            var text;
            var flag = true;
            var obj = getPage($('.kandao-report'), 10,flag );
            obj.json.q = q;
            obj.json.language = language;
            amdApi.ajax({ url: "official/media_report/"+id+"/info", type: 'get' }, function(res) {
                var reportManagementEdit = art.render(reportManagementEditTpl,res.result);
                var $reportManagementEdit = $(reportManagementEdit)
                .on('change', '.language select', function() {
                    text = $(this).val();
                    if (text == "ZH-CN") {
                        $("#reportEditFromCn").show();
                        $("#reportEditFromEn").hide();
                    } else {
                        $("#reportEditFromCn").hide();
                        $("#reportEditFromEn").show();
                    }
                })
                .on('click', '.btnSave', function(e) {
                    e.preventDefault();
                    if (res.result.language == "ZH-CN") {
                        sendData("#reportEditFromCn","#reportEditImgCn");
                    } else {
                        sendData("#reportEditFromEn","#reportEditImgEn");
                    }
                    function sendData(lanSel,tumFromId){
                        var title = $('#reportEdit '+lanSel+' input[name = "title"]').val();
                        var source = $('#reportEdit '+lanSel+' input[name = "source"]').val();
                        var source_url = $('#reportEdit '+lanSel+' input[name = "source_url"]').val();
                        var description = $('#reportEdit '+lanSel+' textarea[name = "description"]').val();
                        var json = {
                            "title": title,
                            "source": source,
                            "source_url":source_url,
                            "description": description,
                            "language":res.result.language
                        }
                        if (!$.trim(title) || !$.trim(source)||!$.trim(source_url)) {
                            alert("请输入新闻标题(Name)/新闻来源(News sources)/链接(URL)信息后提交！");
                            return;
                        }
                        if ($("#addMedia .thumbnail img").length > 0 && $("#addMedia #picID").val().indexOf(".jpg") == -1) {
                            alert("缩略图请使用后缀为.jpg的图片！");
                            return;
                        }
                        amdApi.ajax({ url: "official/media_report/"+id+"/change", type: 'post', json: JSON.stringify(json) }, function() {
                            if ($reportManagementEdit.find('.fileinput-exists img').length > 0) {
                                headFlag.flag = false;
                                var data = new FormData($reportManagementEdit.find(tumFromId)[0]);
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
                                            "type":"report",
                                            "pk":id
                                        };
                                        // console.log(json);
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
                            amdApi.ajax({ url: "official/media_report/list", type: 'get', json:obj.json }, function(res) {
                                getData.getListData(res);
                                setTimeout(function() {
                                    $reportManagementEdit.modal('hide');
                                    $('.modal-backdrop').css('display', "none");
                                }, 300);
                            })
                        })
                    }
                })
                .appendTo("body").modal();
                $('#reportEdit select[name="language"] option').each(function(i,v){
                    if($(v).val()==res.result.language){
                        $(this).prop('selected', true);
                        $reportManagementEdit.find(".language select").trigger("change");
                    }
                })
            }) 
        }
    })