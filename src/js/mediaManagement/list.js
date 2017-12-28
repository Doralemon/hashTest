define(['jquery', 'text!tpls/mediaManagement/mediaLibrary.html', 'artTemplate', 'common/amdApi',
        'mediaManagement/add', 'mediaManagement/cloumnManagement', 'mediaManagement/transCoding',
         'mediaManagement/getData', 'mediaManagement/mediaSeach',
        'mediaManagement/allSelected', 'mediaManagement/cloumnListAdd', 'mediaManagement/cloumnListremove',
        'mediaManagement/clearAll', 
        "bootstrap", "page"
    ],
    function($, mediaLibraryTpl, art, amdApi, add, cloumnManagement, transCoding, getData, mediaSeach,
        allSelected, cloumnListAdd, cloumnListremove, clearAll) {
        return function(headFlag,transition ) {
            var page, id,q,selectWord,column,m_type,url;
            m_type = transition.query.type
            page = sessionStorage.getItem("page");;
            selectWord = transition.query.selectWord;
            q = transition.query.q;
            column = transition.query.column;
            var json = {
                limit:8,
                page:page||1,
                q:q||"",
                type:m_type||"",
                column:column
            }
            amdApi.ajax({ url: 'medias/columns', type: 'get', json: json }, function(resTag) {
                amdApi.ajax({ url: 'medias', type: 'get', json: json }, function(res) {
                    sessionStorage.setItem("resTag",JSON.stringify(resTag.result));
                    if (!res.result.data.length) {
                        json.page = json.page - 1 || 1;
                        amdApi.ajax({ url: 'medias', type: 'get', json: json }, function(res2) {
                            afterAjax(resTag, res2);
                        })
                        return;
                    }
                    afterAjax(resTag, res);
                })
            });

            function afterAjax(resTag, res) {
                if (res.result.data.length < 1) {
                    $('.kandao-mediaManagement').find('.mediaContainer p').css('display', 'none');
                    $('.kandao-mediaManagement').find('.mediaContainer .mediaInfo-bottom').css('display', 'none');
                    $('.kandao-mediaManagement').find('.mediaInfoBody').html('暂无数据');
                } else {
                    $('.kandao-mediaManagement').find('.mediaContainer p').css('display', 'block');
                    $('.kandao-mediaManagement').find('.mediaContainer .mediaInfo-bottom').css('display', 'block');
                }
                res.result.tags = resTag.result;
                var mediaLibrary = art.render(mediaLibraryTpl, res.result);
                var $mediaLibrary = $(mediaLibrary)
                    .on('click', '.firstColumn .sBox', function() { //栏目分类
                        $('.firstColumn .sBox').removeClass('active');
                        $(this).addClass('active');
                        column = $(this).attr('id');
                    })
                    .on('click', '.secondColumn .sBox', function() { //类型分类
                        $('.secondColumn .sBox').removeClass('active');
                        $(this).addClass('active');
                        m_type = $(this).attr('type');
                    })
                    .on('click', '.columnManagament', function() { //栏目管理
                        cloumnManagement(resTag, headFlag);
                    })
                    .on('click', '.selectAll', function() { //全选
                        allSelected.getSel($mediaLibrary);
                        getData.getSelMedia();
                    })
                    .on('click', '.clear', function() { //清空
                        allSelected.getSelNot($mediaLibrary);
                        getData.getSelMedia();
                    })
                    .on('click', '.mediaSearch', function() { //查询
                        var _self = $(this);
                         q = $mediaLibrary.find('input[name="q"]').val();
                         selectWord = $mediaLibrary.find('select[name="type"] option:selected').val();
                        url = "#/media/mediaLibrary?page="+page+"&q="+q+"&type="+m_type+"&column="+column+"&selectWord="+selectWord;
                        $('kandao-aside a[href="#/media/mediaLibrary"]').attr("href",url);
                        location.href= url;
                        mediaSeach(q, m_type,column,_self);
                    })
                    .on('keydown', 'input[name="q"]', function(e) { //enter键查询
                        if (e.keyCode == 13) {
                            e.preventDefault();
                            $mediaLibrary.find('.mediaSearch').trigger('click');
                        } else {
                            return;
                        }
                    })
                    .on('click', '.meadiaAdd', function() { //新增
                        sessionStorage.setItem("page",1);
                        add(resTag, headFlag);
                    })
                    .on('click', '.transCode', function() { //转码
                        var data = getData.getSelMedia();
                        if (data.length > 1) {
                            alert('当前版本暂不支持批量转码！');
                            return;
                        }
                        transCoding(data[0].id, data[0].type);
                    })
                    .on('click', '.addToCloumn', function() { //添加至栏目                          
                        cloumnListAdd($mediaLibrary);
                        return false;
                    })
                    .on('click', '.removeFromCloumn', function() { //从栏目移出
                        cloumnListremove($mediaLibrary);
                        return false;
                    })
                    .on('click', '.cloumnTwo', function() { //栏目操作-栏目管理
                        $('.columnManagament').click();
                    })
                    .on('click', '.mediaDelete', function() { //批量删除素材
                        clearAll();
                    })
                    .on('click', '.thumbnail input', function(e) { //单个选中
                        e.stopPropagation();
                        getData.getSelMedia();
                        if ($(this).prop('checked') == true) {
                            $(this).parents('.mediaBigBox').find('.coverBox').css('display', 'block');
                        } else {
                            $(this).parents('.mediaBigBox').find('.coverBox').css('display', 'none');
                        }
                    });
                $(".kandao-contentBody").html($mediaLibrary);
                getData.myAjax(json, res);
                getData.getSelMedia();
                $(".kandao-mediaManagement").find('input[name="q"]').val(q); //设置q
                $(".kandao-mediaManagement").find('select[name="type"]').val(selectWord);//设置关键词select
                $(".kandao-mediaManagement").find(".firstColumn .sBox").each(function(i,v){
                    if($(v).attr("id")==column){
                        $(".kandao-mediaManagement").find(".firstColumn .sBox").removeClass("active");
                        $(this).addClass("active")
                    }
                })
                $(".kandao-mediaManagement").find('.secondColumn .sBox').each(function(i,v){
                    if($(v).attr("type")==m_type){
                        $(".kandao-mediaManagement").find('.secondColumn .sBox').removeClass("active");                        
                        $(this).addClass("active")
                    }
                }) 
            };
        }
    })