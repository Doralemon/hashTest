define(['jquery', 'text!tpls/mediaManagement/mediaLibraryInfo.html', 'artTemplate', 'common/amdApi',
        'mediaManagement/getCloumnId', 'mediaManagement/getInfoData', 'mediaManagement/deleteLink',
        'mediaManagement/deleteMedia', 'mediaManagement/getCloumnId', 'mediaManagement/getTagName',
        'mediaManagement/saveInfo', 'mediaManagement/transCoding', 'mediaManagement/uploadFileRms',
        "bootstrap", "page"
    ],
    function($, mediaLibraryInfoTpl, art, amdApi, getCloumnById, getInfoData, deleteLink,
        deleteMedia, getCloumnId, getTagName, saveInfo, transCoding, uploadFileRms) {
        return function(headFlag, transition) {
            var pageInfo = sessionStorage.getItem("pageInfo");
            var resTag = JSON.parse((sessionStorage.getItem("resTag")));
            var media_id = transition.query.num;
            var resourceTpye = transition.query.type;
            var json = {
                limit: 10,
                page: pageInfo || 1
            }
            amdApi.ajax({ url: 'medias/' + resourceTpye + '/' + media_id + '/links', type: 'get', json: json }, function(resType) { //格式链接
                // console.log(resType)
                amdApi.ajax({ url: 'medias/' + resourceTpye + '/' + media_id, type: 'get' }, function(res) { //获取基本信息
                    // console.log(res);
                    var before_column = [], //by id
                        after_column = [],
                        before_tag = [],
                        after_tag = []; //by name
                    res.result.resTags = resTag;
                    var cloumns = res.result.columns;
                    var tags = res.result.tags;
                    cloumns.forEach(function(v, i) { //获取栏目id
                        before_column.push(v[1] + '');
                        after_column.push(v[1] + '');
                    })
                    tags.forEach(function(v, i) { //获取标签名称
                        before_tag.push(v[0]);
                        after_tag.push(v[0]);
                    })
                    var mediaLibraryInfo = art.render(mediaLibraryInfoTpl, res.result);
                    $mediaLibraryInfo = $(mediaLibraryInfo)
                        .on('click', '.infoDelete', function() { //删除详情
                            deleteMedia(media_id, resourceTpye);
                        })
                        .on('click', '.infoSave', function() { //保存详情
                            saveInfo(resourceTpye, media_id, before_column, after_column, before_tag, after_tag);
                        })
                        .on('click', '.cloumnAdd', function() { //添加栏目
                            var id = $(this).prev('#columnSel').val();
                            var text = $("#columnSel option:selected").text();
                            getCloumnById(id, text, $mediaLibraryInfo, ".bigCloumnBox", after_column);
                        })
                        .on('click', '.tagAdd', function() { //添加标签
                            var text = $(this).prev().val();
                            getTagName(text, $mediaLibraryInfo, ".bigTagBox", after_tag);
                        })
                        .on('click', '.bigCloumnBox .glyphicon-remove-circle', function() { //栏目移除
                            $(this).parent().remove();
                            var delId = $(this).parent().attr('id');
                            after_column.forEach(function(v, i) { //删除
                                if (v == delId) {
                                    after_column.splice(i, 1);
                                }
                                return false;
                            })
                        })
                        .on('click', '.bigTagBox  .glyphicon-remove-circle', function() { //标签移除
                            $(this).parent().remove();
                            var delText = $(this).parent().text();
                            after_tag.forEach(function(v, i) { //删除
                                if ($.trim(v) == $.trim(delText)) {
                                    after_tag.splice(i, 1);
                                }
                                return false;
                            })
                        })
                        .on('click', '.transCode', function() { //转码
                            transCoding(media_id, resourceTpye);
                        })
                        .on('click', '.linkDelete', function() { //删除链接
                            var link_id = $(this).parents('tr').attr('id');
                            deleteLink(media_id, link_id, resourceTpye);
                        });
                    if ((resType.result.data).length < 1) {
                        $mediaLibraryInfo.find('.transCode').prop("disabled", true);
                    } else {
                        $mediaLibraryInfo.find('.transCode').prop("disabled", false);
                    }
                    if (resourceTpye !== "live") { //如果不是直播(live),无流地址
                        $mediaLibraryInfo.find('.mediaFluid').hide();
                    };
                    $(".kandao-contentBody").html($mediaLibraryInfo);
                    sessionStorage.removeItem("resTag");
                    uploadFileRms($('#kandaoMediaLibraryInfo'), $('#kandaoMediaLibraryInfo #mediaInfoImg'), headFlag, function(res) { //调用rms上传图片
                        // console.log(res)
                        var json = {
                            "file_hash": res.file_hash,
                            "file_url": res.file_url,
                            "type": resourceTpye,
                            "pk": media_id,
                            "file_name": res.file_name,
                            "file_size": res.file_size,
                            "file_type": res.file_type
                        };
                        // console.log(json);
                        amdApi.ajax({ url: 'medias/upload/thumbnail', type: 'post', json: JSON.stringify(json) }, function(res) {
                            alert('提交成功!');
                        })
                    });
                    if (!resType.result.data.length) {
                        $('.kandao-mediaLibraryInfo').find('.linkContainer').html('暂时还没有数据哦~~');
                        return;
                    }
                    getInfoData.myAjax(json, resType, resourceTpye, media_id); //渲染格式与链接
                })
            })
        }
    })