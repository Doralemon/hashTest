define(['jquery', 'text!tpls/mediaManagement/mediaLibraryAdd.html', 'artTemplate', 'common/amdApi',
        'mediaManagement/getCloumnId', 'mediaManagement/getTagName', 'mediaManagement/uploadFileRms',
        "bootstrap", "page", 'upload'
    ],
    function($, mediaLibraryAddTpl, art, amdApi, getCloumnId, getTagName, uploadFileRms) {
        return function(resTag, headFlag) {
            $('#addMedia').remove();
            var type, extension_name, json = {},
                add_column = [],
                add_tag = [];
            var mediaLibraryAdd = art.render(mediaLibraryAddTpl, resTag.result);
            var $mediaLibraryAdd = $(mediaLibraryAdd)
                .on('click', '.cloumnAdd', function() { //栏目添加/删除前端验证
                    var id = $(this).prev("#tagSel").val();
                    var text = $("#tagSel option:selected").text();
                    getCloumnId(id, text, $mediaLibraryAdd, ".cloumnAddBox", add_column);
                })
                .on('click', '.tagAdd', function() { //标签添加/删除前端验证
                    var text = $(this).prev().val();
                    getTagName(text, $mediaLibraryAdd, ".tagAddBox", add_tag);
                })
                .on('click', '.uploadSubmit', function(e) {
                    e.preventDefault();
                    var name = $('#addMedia input[name="name"]').val();
                    var description = $('#addMedia textarea[name="description"]').val();
                    type = $('#addMedia select[name="type"]').val();
                    if (!$.trim(name) || !$.trim(description) || !$.trim(type)) {
                        alert('请输入名称/描述/类型等信息！');
                        return;
                    }
                        json.name = name,
                        json.description = description,
                        json.type = type,
                        json.add_column = add_column.join(","),
                        json.add_tag = add_tag.join(","),
                        json.del_colum = '',
                        json.del_tag = ''
                        // console.log(json)
                    if (!json.file_name||$("#uploadifive-sourceFile-queue .fileinfo").text().indexOf("Error")>-1) {
                        alert("请正确上传源文件(视频仅支持.mp4格式，图片支持.jpg格式)！");
                        return;
                    }
                    var str = json.file_name;
                    json.extension_name = str.substring(str.lastIndexOf(".") + 1, str.length).toLowerCase();
                    switch(type){
                        case "video":if(json.extension_name!=="mp4"){
                         alert("视频仅支持.mp4后缀的文件！");
                        return;};
                        break;
                        case "photo":if(json.extension_name!=="jpg"){
                        alert("图片仅支持.jpg后缀的文件！");
                        return;};
                        break;
                    }
                    if ($("#addMedia .thumbnail img").length > 0 && $("#addMedia #picID").val().indexOf(".jpg") == -1) {
                        alert("缩略图请使用后缀为.jpg的图片！");
                        return;
                    }
                    amdApi.ajax({ url: 'medias/add', type: 'post', json: JSON.stringify(json) }, function(res) {
                        // console.log(res)
                        $mediaLibraryAdd.modal('hide');
                        $('.modal-backdrop').hide();
                        if ($mediaLibraryAdd.find('.fileinput-exists img').length > 0) {
                            headFlag.flag = false;
                            var data = new FormData($mediaLibraryAdd.find('#mediaAddImg')[0]);
                            $.ajax({
                                url: amdApi.getFileUrl() + 'upload_action/',
                                type: 'post',
                                data: data,
                                cache: false,
                                contentType: false,
                                processData: false,
                                success: function(datas) {
                                    // console.log(datas)
                                    if (datas.msg) {
                                        console.log('upload success');
                                    } else {
                                        console.log(datas.msg);
                                    }
                                    headFlag.flag = true;
                                    var json = {
                                        "file_hash": datas.file_hash,
                                        "file_url": datas.file_url,
                                        "type": type,
                                        "pk": res.result.id,
                                        "file_name": datas.file_name,
                                        "file_size": datas.file_size,
                                        "file_type": datas.file_type
                                    };
                                    // console.log(json);
                                    amdApi.ajax({ url: 'medias/upload/thumbnail', type: 'post', json: JSON.stringify(json) }, function(resp) {
                                        // console.log(resp);
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
                            window.location.reload(true); 
                        }, 500);
                    })
                })
                .appendTo('body').modal();
            getType(); //点开新增就去判断一次
            $('select.resorce').on('change', function() { //类型不同输入框不同
                getType();
            });

            function getType() { //判断用户选择的类型
                if ($('select.resorce').val() == "live") {
                    $('div.resourceFile').css('display', "none");
                    $('div.streamAddress').css('display', "block");
                } else if ($('select.resorce').val() == "video") {
                    $('div.streamAddress').css('display', "none");
                    $('div.resourceFile').css('display', "block");
                } else {
                    $('div.streamAddress').css('display', "none");
                    $('div.resourceFile').css('display', "block");
                }
            }
            getSourceFile(); //上传源文件

            function getSourceFile() {
                $(function() { // 初始化上传文件插件
                    $('#sourceFile').uploadifive({
                        'auto': true,
                        'method': 'post',
                        'uploadScript': amdApi.getFileUrl() + 'upload_action/',
                        'fileObjName': 'upload',
                        'buttonText': '选择文件',
                        // 'queueID': 'uploadifive-sourceFile-queue',
                        'fileType': false,
                        // 'multi': false,
                        // 'fileSizeLimit': 5242880,
                        'uploadLimit': 1,
                        'queueSizeLimit': 1,
                        // 'removeCompleted': true,
                        'fileTypeExts': '*.mp4; *.jpg', 
                        'onUploadComplete': function(file, data) {
                            // console.log(data)
                            var data = JSON.parse(data);
                            json.file_hash = data.file_hash;
                            json.file_name = data.file_name;
                            json.file_url = data.file_url;
                            json.file_type = data.file_type;
                            json.file_size = data.file_size;
                        },
                        onCancel: function(file) {
                            $("#addMedia #picID").val("");
                            $("#frontSide").val("");
                            /* 注意：取消后应重新设置uploadLimit */
                            $data = $(this).data('uploadifive'),
                                settings = $data.settings;
                            settings.uploadLimit++;
                            // alert(file.name + " 已取消上传~!");
                        },
                        onFallback: function() {
                            alert("该浏览器无法使用!");
                        },
                        onUploadError: function() {
                            alert("文件上传失败，请检查文件类型重新上传！")
                        }
                    });
                });
            }

        }
    })