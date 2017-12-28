define(['jquery', 'text!tpls/mediaManagement/cloumnMenagement.html', 'artTemplate', 'common/amdApi',
        'mediaManagement/addColumn', 'mediaManagement/deleteCloumn', 'mediaManagement/showClounmInfo',
        'mediaManagement/showClounmSort', 'mediaManagement/saveCloumnInfo', 'mediaManagement/cloumnMenagSearch',
        'sortable', 'mediaManagement/uploadFileRms',
        "bootstrap", "page"
    ],
    function($, cloumnMenagementTpl, art, amdApi, addColumn, deleteCloumn, showClounmInfo, showClounmSort,
        saveCloumnInfo, cloumnMenagSearch, Sortable, uploadFileRms) {
        return function(resTag, headFlag) {
            $('#cloumnManagement').remove();
            var date_desc = "1";
            var id, type;
            var cloumnMenagement = art.render(cloumnMenagementTpl, resTag.result);
            var $cloumnMenagement = $(cloumnMenagement)
                .on('input', '.cloumnSearch', function() { //搜索框
                    var text = $(this).val();
                    cloumnMenagSearch(text);
                })
                .on('click', '.cloumnAdd', function() { //新增栏目
                    addColumn();
                })
                .on('click', '.orderByTime', function() { //按时间排序
                    if ($cloumnMenagement.find('p').hasClass('glyphicon-sort-by-attributes')) {
                        date_desc = "1";
                        $cloumnMenagement.find('p').removeClass('glyphicon-sort-by-attributes').addClass('glyphicon-sort-by-attributes-alt');
                        $cloumnMenagement.find('p').text("按时间降序");
                        showClounmSort(id, type, date_desc);
                    } else if ($cloumnMenagement.find('p').hasClass('glyphicon-sort-by-attributes-alt')) {
                        date_desc = "0";
                        $cloumnMenagement.find('p').addClass('glyphicon-sort-by-attributes').removeClass('glyphicon-sort-by-attributes-alt');
                        $cloumnMenagement.find('p').text("按时间升序");
                        showClounmSort(id, type, date_desc);
                    }
                })
                .on('click', '.btnDelete', function() { //删除
                    var id;
                    $cloumnMenagement.find('.tagstoAdd .sBox').each(function(i, v) {
                        if ($(v).hasClass('active')) {
                            id = $(v).attr('id');
                        }
                    })
                    if (!id) {
                        alert("请选择你要删除的栏目！");
                        return;
                    }
                    deleteCloumn(id);
                })
                .on('click', '.tagstoAdd .sBox', function() { //查看一个栏目
                    $('.tagstoAdd').children().removeClass('active');
                    $(this).addClass('active');
                    id = $(this).attr('id');
                    showClounmInfo(id); //左边信息
                    type = $cloumnMenagement.find('.resorce').val();
                    showClounmSort(id, type, date_desc); //右边素材
                })
                .on('change', '.resorce', function() { //改变类型去获取素材
                    type = $(this).val();
                    showClounmSort(id, type, date_desc); //右边素材
                })
                .on('click', '.btnSave', function() { //保存栏目修改
                    ($cloumnMenagement.find('.tagstoAdd .sBox')).each(function(i, v) {
                        if ($(v).hasClass('active')) {
                            id = $(this).attr('id');
                        }
                    })
                    if (!id) {
                        alert("请选择栏目！")
                    }
                    saveCloumnInfo(id);
                })
                .appendTo('body').modal();
            $('.tagstoAdd .sBox').first().click(); //获取第一个栏目信息
            var el = document.getElementById('items'); //素材拖动排序
            var sortable = new Sortable(el, {
                draggable: ".list-item",
            });

            uploadFileRms($('#cloumnManagement'), $('#cloumnManagement #clomunImg'), headFlag, function(res) { //调用rms上传图片
                // console.log(res)
                var json = {
                    "file_hash": res.file_hash,
                    "file_url": res.file_url,
                    "type": "column",
                    "pk": id,
                    "file_name": res.file_name,
                    "file_size": res.file_size,
                    "file_type": res.file_type,
                };
                // console.log(json);
                amdApi.ajax({ url: 'medias/upload/thumbnail', type: 'post', json: JSON.stringify(json) }, function(res) {
                    alert('缩略图上传成功!');
                })
            });
        }
    })