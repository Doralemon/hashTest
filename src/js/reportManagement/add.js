define(['jquery', 'text!tpls/websiteManagement/reportManagementAdd.html', 'artTemplate', 'common/amdApi'
, '../mediaManagement/uploadFileRms'],
    function($, reportManagementAddTpl, art, amdApi,uploadFileRms) {
        return function(headFlag) {
            $('#reportAdd').remove();
            var text,json={};
            var $reportManagementAdd = $(reportManagementAddTpl)
                .on('change', '.language  select', function() {
                    text = $(this).val();
                    if (text == "ZH-CN") {
                        $("#reportAddFromCn").show();
                        $("#reportAddFromEn").hide();
                    } else {
                        $("#reportAddFromCn").hide();
                        $("#reportAddFromEn").show();
                    }
                })
                .on('click', '.uploadSubmit', function(e) {
                    e.preventDefault();
                    text = $("#reportAdd .language select").val();
                    if (text == "ZH-CN") {
                        sendData("#reportAddFromCn","#reportAddImgCn");
                    } else {
                        sendData("#reportAddFromEn","#reportAddImgEn");
                    }
                    function sendData(lanSel,selId){
                    var title = $('#reportAdd '+lanSel+' input[name = "title"]').val();
                    var source = $('#reportAdd '+lanSel+' input[name = "source"]').val();
                    var source_url = $('#reportAdd '+lanSel+' input[name = "source_url"]').val();
                    var description = $('#reportAdd '+lanSel+' textarea[name = "description"]').val();
                    json.title = title;
                    json.source = source;
                    json.source_url = source_url;
                    json.description = description;
                    json.language = text;
                    if (!$.trim(title) || !$.trim(source) || !$.trim(description)|| !$.trim(source_url)) {
                        alert("请完成所有信息后再提交！");
                        return;
                    }
                    if ($("#addMedia .thumbnail img").length > 0 && $("#addMedia #picID").val().indexOf(".jpg") == -1) {
                        alert("缩略图请使用后缀为.jpg的图片！");
                        return;
                    }
                    amdApi.ajax({ url: "official/media_report/add", type: 'post', json: JSON.stringify(json) }, function(pk) {
                        if ($reportManagementAdd.find('.fileinput-exists img').length > 0) {
                            headFlag.flag = false;
                            var data = new FormData($reportManagementAdd.find(selId)[0]);
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
                            $('.reportManagement').trigger('click');
                        }, 500);
                        $reportManagementAdd .modal('hide');
                    })
                    }
                })
                .appendTo("body").modal();
               
        }
    })