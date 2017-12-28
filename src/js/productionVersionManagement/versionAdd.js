define(["jquery", "text!tpls/productionVersionAdd.html", 'artTemplate', 'common/amdApi',
        'productionVersionManagement/getData', 'productionVersionManagement/toggleLanguage', 'upload'
    ],
    function($, productionVersionAddTpl, art, amdApi, getData, toggleLanguage) {
        return function(id, usePlat) {
            $('#addVersionSon').remove();

            var json = {},
                extension_name, platName;
            switch (usePlat) {
                case "android":
                    platName = "apk";
                    break;
                case "android TV":
                    platName = "apk";
                    break;
                case "tablet":
                    platName = "7z";
                    break;
                case "camera":
                    platName = "yak";
                    break;
            };
            $productionVersionAdd = $(productionVersionAddTpl)
                .on('submit', 'form', function(e) {
                    e.preventDefault();
                    $('.kandao-versionManagement')
                    var version_name = $('#addVersionSon input[name="version_name"]').val();
                    var version_code = $('#addVersionSon input[name="version_code"]').val();
                    version_code = parseInt(version_code);
                    var regCode = /^[0-9]*$/;
                    if(!$.trim(version_name)||!$.trim(version_code)){
                        alert("请输入版本名称/版本代号等信息！");
                        return;
                    }
                    if (!regCode.test(version_code)) {
                        alert('版本代号必须为数字！');
                        return;
                    }
                    var description = $('#addVersionSon textarea.textCh').val();
                    var description_en = $('#addVersionSon textarea.textEn').val();
                    json.version_name = version_name;
                    json.version_code = version_code;
                    json.description = description;
                    json.description_en = description_en;
                    var str = json.file_name;
                    if (!json.file_name||$("#uploadifive-sourceFile-queue .fileinfo").text().indexOf("Error")>-1) {
                        alert("请先上传程序包！");
                        return;
                    }
                    json.extension_name = str.substring(str.lastIndexOf(".") + 1, str.length);
                    // console.log(json)
                    if (platName !== json.extension_name) {
                        alert(usePlat + "平台只支持后缀为." + platName + "的文件");
                        return;
                    }
                    amdApi.ajax({ url: "softwares/" + id + "/versions/add", type: "post", json: JSON.stringify(json) }, function(res) { // 请求添加接口
                        var json = {
                            limit: 10,
                        }
                        amdApi.ajax({ url: "softwares/" + id + "/versions", type: "get", json: JSON.stringify(json) }, function(res) { // 刷新所有版本信息   
                            getData.getInfoData(res);
                            $productionVersionAdd.modal("hide");
                        })
                    })

                })
                .appendTo("body").modal();
            $(function() { // 初始化上传文件插件
                $('#versionUpload').uploadifive({
                    'auto': true,
                    'method': 'post',
                    'uploadScript': amdApi.getFileUrl() + 'upload_action/',
                    'fileObjName': 'upload',
                    'buttonText': '选择文件',
                    // 'queueID': 'tip-queue1',
                    'fileType': false,
                    // 'multi': false,
                    // 'fileSizeLimit': 5242880,
                    'uploadLimit': 1,
                    'queueSizeLimit': 1,
                    'onUploadComplete': function(file, data) {
                        // console.log(data)
                        var data = JSON.parse(data);
                        json.file_name = data.file_name;
                        json.file_url = data.file_url;
                        json.file_hash = data.file_hash;
                        json.file_type = data.file_type;
                        json.file_size = data.file_size;
                    },
                    onCancel: function(file) {
                        $('#uploadifive-versionUpload input').eq(2).val("");
                        $("#frontSide").val("");
                        /* 注意：取消后应重新设置uploadLimit */
                        $data = $(this).data('uploadifive'),
                            settings = $data.settings;
                        settings.uploadLimit++;
                        // alert(file.name + " 已取消上传~!");
                    },
                    onFallback: function() {
                        alert("该浏览器无法使用!");
                    }
                });
            });
            toggleLanguage($productionVersionAdd);
            $("#addVersionSon").find('.fileType').text("(文件类型仅支持." + platName + ")");
        };
    });