require.config({
    urlArgs: "r=2.0.0",
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-2.1.4',
        cookie: 'lib/jquery.cookie',
        text: 'lib/text',
        tpls: '../tpls',
        artTemplate: 'lib/template-web',
        bootstrap: '../assets/bootstrap/js/bootstrap',
        // 配置图片上传url
        upload: '../assets/uploadifive/jquery.uploadifive.min',
        datetime: '../assets/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker',
        page: 'lib/jBootstrapPage',
        sortable: 'lib/Sortable',
        fileinput: 'lib/fileinput',
        kindEditor: "../assets/kindeditor/kindeditor-all",
        lang: "../assets/kindeditor/lang/zh-CN"
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        },
        datetime: {
            deps: ['bootstrap']
        },
        upload: {
            deps: ['jquery']
        },
        page: {
            deps: ['jquery']
        },
        fileinput: {
            deps: ['jquery']
        },
        kindEditor: {
            deps: ['jquery']
        },
        lang: {
            deps: ['kindEditor']
        }
    }
})
require(['jquery', 'common/api', 'cameraManagement/list', 'projectManagement/list', 'factoryManagement/list',
        'accoutManagement/list', 'secretKeyManagement/list', 'productionVersionManagement/list', 'userCenter/userBasic',
        'userCenter/changePass', 'systemUserManagement/list', 'systemRolesManagement/list', 'systemLog/list',
        'mediaManagement/list', 'mediaPlayList/list', 'transCodingManagement/list',
        'reportManagement/list', 'kandaonewsManagement/list', 'FAQmanagement/list', 'home/list', 'mediaManagement/mediaInfo',
        'text!../tpls/loading.html', 'common/amdApi', 'common/route', 'cookie'
    ],
    function($, api, cameraManagementList, projectManagementList, factoryManagementList,
        accoutManagementList, secretKeyManagementList, productionVersionManagementList, userCenterUserBasic, userCenterChangePass,
        systemUserManagementList, systemRolesManagementList, systemLogList, mediaManagementList, mediaPlayList,
        transCodingManagementList, reportManagementList, kandaonewsManagementList, FAQmanagementList,
        homeList, mediaManagementInfo,
        loadingTpl, amdApi) {
        // 验证用户登录
        var usernameStr = $.cookie('username');
        var tokenStr = $.cookie('token');
        if (!tokenStr) {
            location.href = 'login.html';
        }
        var token = JSON.parse(tokenStr);
        var $loading = $(loadingTpl);
        $(".kandao-progress").css("display", "none");
        $(".kandao-contanier").css("display", "block");
        var headFlag = { flag: true };
        $.ajaxSetup({
            beforeSend: function(xhr) { // 在发送ajax之前，弹出模态框
                if (headFlag.flag) {
                    xhr.setRequestHeader("x-token-id", token);
                    if (!($('#zzz').css('display') == 'block')) {
                        $loading.appendTo("body").modal();
                    }
                }
            },
            complete: function() { // ajax完成后,关闭模态框
                $loading.on('hidden.bs.modal', function() {
                    $loading.remove();
                }).modal('hide');
            }
        })
        $('.kandao-content-top .users span').text(usernameStr);
        $('.loginOut').on('click', function() { // 退出登录
            // 清除服务器的登录状态
            amdApi.ajax({ url: 'users/logout', type: 'post' }, function(res) {
                // 清除token
                $.removeCookie("token", null, { path: "/" });
                // 跳到登录页面
                location.href = 'login.html';
            })
        })
        var flag = true;
        var productionVersionManagementFlag = { flag1: true, flag2: true }
        playListFlag = { flag1: true, flag2: true },
            transcodingManagementFlag = { flag1: true, flag2: true },
            accoutManagementFlag = { flag1: true, flag2: true },
            cameraManagementFlag = { flag1: true, flag2: true },
            projectManagementFlag = { flag1: true, flag2: true },
            factoryManagementFlag = { flag1: true, flag2: true },
            systemUserManagementFlag = { flag1: true, flag2: true, flag3: true },
            rolesManagementFlag = { flag1: true, flag2: true };
        $('.kandao-aside .list-group').on('click', 'a', function() { // 点击侧边栏切换
            $('.kandao-aside a').removeClass('active');
            $(this).addClass('active');
            if ($(this).hasClass("mediaManagement")) { // 媒体资源管理
                $(".mediaSonList").stop().slideToggle();
            } else if ($(this).hasClass("customerManagement")) { //客户管理
                $(".customerSonList").stop().slideToggle();
            } else if ($(this).hasClass("productManagment")) { //生产管理
                $(".productSonList").stop().slideToggle();
            } else if ($(this).hasClass("websiteManagment")) { //官网管理
                $(".websiteSonList").stop().slideToggle();
            } else if ($(this).hasClass("backStageManagement")) { // 后台系统管理
                $(".systemSonList").stop().slideToggle();
            }
        });
        $('.manuscriptManagement').on('click', function() { //官网下的文稿管理
            $('.manuscriptBox').stop().slideToggle();
        })
        $('.users').hover(function() { // 个人中心  
            $('.userSonList').stop().slideDown();
        }, function() {
            $('.userSonList').stop().slideUp();
        })

        $('.userBaseInfo').on('click', function() { // 个人中心的基础资料
            $('.kandao-aside').find('a').removeClass('active');
            $(this).addClass('active').siblings().removeClass('active');
            userCenterUserBasic();
            $('.btnChangePass').removeClass('active');
            $('.btnBaseInfo').addClass('active');
        })
        $('.changePass').on('click', function() { // 修改密码
                $('.kandao-aside').find('a').removeClass('active');
                $(this).addClass('active').siblings().removeClass('active');
                userCenterChangePass();
                $('.btnChangePass').addClass('active');
                $('.btnBaseInfo').removeClass('active');
            })
            // getClick();
        function initData(url) {
            window.location.href = url;
            sessionStorage.clear();
        }
        $('.mediaLibrary').on('click', function() { //媒资下的媒体素材库
            initData("#/media/mediaLibrary");
        });
        $('.playList').on('click', function() { //媒资下的播放列表
            initData("#/media/playList");
        });

        function getClick() {
            $('.customerManagement').on('click', function() { // 客户管理
                $(".customerSonList").stop().slideToggle();
            });
            $('.productManagment').on('click', function() { //  生产管理
                $(".productSonList").stop().slideToggle();
            })

            $('.transcodingManagement').on('click', function() { //媒资下的转码
                transCodingManagementList(transcodingManagementFlag);
            });
            $('.accoutManagement').on('click', function() { // 客户管理下的账号管理
                accoutManagementList(accoutManagementFlag);
            });

            $('.keyManagement').on('click', function() { // 客户管理下的密钥管理
                secretKeyManagementList();
            });
            $('.cameraManagement').on('click', function() { // 生产管理下的相机管理
                cameraManagementList(cameraManagementFlag);
            });
            $('.projectManagement').on('click', function() { // 生产管理下的项目管理
                projectManagementList(projectManagementFlag);
            });
            $('.factoryManagement').on('click', function() { // 生产管理下的工厂管理
                factoryManagementList(factoryManagementFlag);
            });
            $('.manuscriptManagement').on('click', function() { //官网下的文稿管理
                $('.manuscriptBox').stop().slideToggle();
            })
            $('.reportManagement').on('click', function() { //官网/文稿下的媒体报道
                reportManagementList(headFlag);
            })
            $('.kandaoNewsManagement').on('click', function() { //官网/文稿下的看到新闻管理
                kandaonewsManagementList(headFlag);
            })
            $('.FAQManagement').on('click', function() { //官网/文稿下的FAQ管理
                FAQmanagementList();
            })
            $('.systemUserManagement').on('click', function() { // 系统管理下的系统用户管理
                systemUserManagementList(systemUserManagementFlag);
            })
            $('.rolesManagement').on('click', function() { // 系统管理下的角色权限管理
                systemRolesManagementList(rolesManagementFlag);
            })
            $('.operationLog').on('click', function() { // 系统管理下的操作日志
                systemLogList();
            })
            $('.users').hover(function() { // 个人中心  
                $('.userSonList').stop().slideDown();
            }, function() {
                $('.userSonList').stop().slideUp();
            })

            $('.userBaseInfo').on('click', function() { // 个人中心的基础资料
                $('.kandao-aside').find('a').removeClass('active');
                $(this).addClass('active').siblings().removeClass('active');
                userCenterUserBasic();
                $('.btnChangePass').removeClass('active');
                $('.btnBaseInfo').addClass('active');
            })
            $('.changePass').on('click', function() { // 修改密码
                $('.kandao-aside').find('a').removeClass('active');
                $(this).addClass('active').siblings().removeClass('active');
                userCenterChangePass();
                $('.btnChangePass').addClass('active');
                $('.btnBaseInfo').removeClass('active');
            })
        }

        (function mapUrl() { //url变化
            spaRouters.map('/index', function(transition) { //匹配首页
                spaRouters.syncFun(homeList, transition);
            })
            spaRouters.map('/media/mediaLibrary', function(transition) { //匹配媒体素材库
                $(".mediaSonList").show();
                spaRouters.syncFun(mediaManagementList.bind(transition, headFlag), transition);
            })
            spaRouters.map('/media/mediaLibrary/detail', function(transition) { //匹配媒体素详情
                spaRouters.syncFun(mediaManagementInfo.bind(transition, headFlag), transition);
            })
            spaRouters.map('/media/playList', function(transition) { //播放列表
                $(".mediaSonList").show();
                spaRouters.syncFun(mediaPlayList.bind(playListFlag), transition);
            })
            spaRouters.map('/media/transCode', function(transition) { //转码管理
                $(".mediaSonList").show();
                spaRouters.syncFun(transCodingManagementList.bind(transcodingManagementFlag), transition);
            })
            spaRouters.map('/customer/account', function(transition) { //账号管理
                $(".customerSonList").show();
                spaRouters.syncFun(accoutManagementList.bind(accoutManagementFlag), transition);
            })
            spaRouters.map('/customer/sercetKey', function(transition) { //密钥管理
                $(".customerSonList").show();
                spaRouters.syncFun(secretKeyManagementList, transition);
            })
            spaRouters.map('/productionVersion', function(transition) { //产品版本管理
                spaRouters.syncFun(productionVersionManagementList.bind(productionVersionManagementFlag), transition);
            })
            spaRouters.map('/product/camera', function(transition) { //相机管理
                $(".productSonList").show();
                spaRouters.syncFun(cameraManagementList.bind(cameraManagementFlag), transition);
            })
            spaRouters.map('/product/project', function(transition) { //项目管理
                $(".productSonList").show();
                spaRouters.syncFun(projectManagementList.bind(projectManagementFlag), transition);
            })
            spaRouters.map('/product/factory', function(transition) { //工厂管理
                $(".productSonList").show();
                spaRouters.syncFun(factoryManagementList.bind(factoryManagementFlag), transition);
            })
            spaRouters.map('/website/manuscript/report', function(transition) { //媒体报道管理
                $(".websiteSonList").show();
                $('.manuscriptBox').show();
                spaRouters.syncFun(reportManagementList.bind(headFlag), transition);
            })
            spaRouters.map('/website/manuscript/kandaoNews', function(transition) { //看到新闻管理
                $(".websiteSonList").show();
                $('.manuscriptBox').show();
                spaRouters.syncFun(kandaonewsManagementList.bind(headFlag), transition);
            })
            spaRouters.map('/website/FAQ', function(transition) { //FAQ管理
                $(".websiteSonList").show();
                spaRouters.syncFun(FAQmanagementList, transition);
            })
            spaRouters.map('/backStage/systemUser', function(transition) { //系统用户管理
                $(".systemSonList").show();
                spaRouters.syncFun(systemUserManagementList.bind(systemUserManagementFlag), transition);
            })
            spaRouters.map('/backStage/roles', function(transition) { //角色权限管理
                $(".systemSonList").show();
                spaRouters.syncFun(systemRolesManagementList.bind(rolesManagementFlag), transition);
            })
            spaRouters.map('/backStage/operationLog', function(transition) { //操作日志
                $(".systemSonList").show();
                spaRouters.syncFun(systemLogList, transition);
            })
            spaRouters.map('/userBaseInfo', function(transition) { //基础资料
                $('.userBaseInfo').trigger("click");
            })
            spaRouters.map('/changePass', function(transition) { //修改密码
                $('.changePass').trigger("click");
            })
            spaRouters.init();
            spaRouters.urlChange();
            setNavActive();
        }())

        function setNavActive() {
            var _nava = $('.kandao-aside .list-group a');
            var _url = "#" + getParamsUrl().path;
            var _host = window.location.host;
            for (var i = 0; i < _nava.length; i++) {
                var _astr = _nava.eq(i).attr('href');
                console.log()
                if ($.trim(_url) == $.trim(_astr)) {
                    $('.kandao-aside').find('a').removeClass('active');
                    _nava.eq(i).addClass('active');
                } else if (_url == ('http://' + _host + '/')) {
                    $('.kandao-aside').find('a').removeClass('active');
                    _nava.eq(0).addClass('active');
                }
            }
        }

        function getParamsUrl() {
            var hashDeatail = location.hash.split("?"),
                hashName = hashDeatail[0].split("#")[1], //路由地址
                params = hashDeatail[1] ? hashDeatail[1].split("&") : [], //参数内容
                query = {};
            for (var i = 0; i < params.length; i++) {
                var item = params[i].split("=");
                query[item[0]] = item[1]
            }
            return {
                path: hashName,
                query: query
            }
        }
    });