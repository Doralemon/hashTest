define([
    'jquery'
], function($) {
    return {
        url:"http://120.76.97.66:8900/cms/v1/",
        getUrl: function(){
            var domain = document.domain,
            url = '';
            if (domain.indexOf('kandao') > -1) {
                url = 'http://cms-test.kandao.tech/cms/v1/';
            } else if ((domain.indexOf('127.0.0.1') > -1 || domain.indexOf('localhost') > -1 || domain.indexOf('192.168.0.21') > -1)) {
                url = 'http://cms-test.kandao.tech/cms/v1/';
            } else {
                url = 'http://120.76.97.66:8900/cms/v1/';
            }
            /(127.0.0.1|localhost|192.168.0.21)/i.test(domain);
            return url;
        },    
        getFileUrl: function() {
            var domain = document.domain,
                urlFile = '';
            if (domain.indexOf('kandao') > -1) {
                urlFile = 'http://rms2.kandao.tech/rms/v1/';
            } else if ((domain.indexOf('127.0.0.1') > -1 || domain.indexOf('localhost') > -1 || domain.indexOf('192.168.0.21') > -1)) {
                urlFile = 'http://rms2.kandao.tech/rms/v1/';
            } else {
                urlFile = 'http://120.76.97.66:9200/rms/v1/';
            }
            /(127.0.0.1|localhost|192.168.0.21)/i.test(domain);
            return urlFile;
        },
        ajax: function(opt, callback) {
            var domain = document.domain,
                url = '';
            if (domain.indexOf('kandao') > -1) {
                url = 'http://cms-test.kandao.tech/cms/v1/';
            } else if ((domain.indexOf('127.0.0.1') > -1 || domain.indexOf('localhost') > -1 || domain.indexOf('192.168.0.21') > -1)) {
                url = 'http://cms-test.kandao.tech/cms/v1/';
            } else {
                url = 'http://120.76.97.66:8900/cms/v1/';
            }
            /(127.0.0.1|localhost|192.168.0.21)/i.test(domain);
            $.ajax({
                url: url + opt.url,
                type: opt.type,
                dataType: "json",
                data: opt.json,
                success: function(res) {
                    switch (res.code) {
                        case 0:
                            $('.staticPage').show();
                            callback && callback(res);
                            break;
                        case 10000:
                            alert("服务器错误!");
                            break;
                        case 10001:
                            alert("您的登录信息不正确!");
                            break;
                        case 10002:
                            alert("请重新登录看到科技后台管理系统!");
                            setTimeout(function() {
                                location.href = 'login.html';
                            }, 1500);
                            break;
                        case 10003:
                            alert("请重新登录看到科技后台管理系统!");
                            setTimeout(function() {
                                location.href = 'login.html';
                            }, 1500);
                            break;
                        case 10004:
                            alert("请登录看到科技后台管理系统!");
                            setTimeout(function() {
                                location.href = 'login.html';
                            }, 1500);
                            break;
                        case 10005:
                            alert("禁止登录!");
                            setTimeout(function() {
                                location.href = 'login.html';
                            }, 1500);
                            break;
                        case 10006:
                            alert("无效请求!");
                            break;
                        case 10007:
                            alert("您没有该权限，请联系管理员！");
                            location.href="#/index";
                            break;
                        case 10008:
                            alert("请输入一个有效的URL链接！");;
                            break;
                        case 10101:
                            alert("邮箱或者密码错误!");
                            break;
                        case 10102:
                            alert("验证码错误!");
                            break;
                        case 10103:
                            alert("验证码失效!");
                            break;
                        case 10104:
                            alert("用户不存在!");
                            break;
                        case 10105:
                            alert("用户已存在!");
                            break;
                        case 10106:
                            alert("用户未激活!");
                            break;
                        case 10107:
                            alert("密码错误!");
                            break;
                        case 10108:
                            alert("密码格式错误!");
                            break;
                        case 10109:
                            alert("新密码与旧密码不能一样!");
                            break;
                        case 10110:
                            alert("用户名太长!");
                            break;
                        case 10111:
                            alert("邮箱格式错误!");
                            break;
                        case 10112:
                            alert("电话号码格式错误!");
                            break;
                        case 10201:
                            alert("客户不存在!");
                            break;
                        case 10202:
                            alert("客户已经存在!");
                            break;
                        case 10203:
                            alert("客户无效!");
                            break;
                        case 10301:
                            alert("激活码不存在!");
                            break;
                        case 10302:
                            alert("该激活码不属于该客户!");
                            break;
                        case 10303:
                            alert("一个客户在一台机器上只能有一个有效的激活码!");
                            break;
                        case 10304:
                            alert("客户没有机器!");
                            break;
                        case 10305:
                            alert("res.msg!");
                            break;
                        case 10501:
                            alert("项目(工厂)不存在!");
                            break;
                        case 10502:
                            alert("项目(工厂)已存在!");
                            break;
                        case 10503:
                            alert("剩下的SN号不够!");
                            break;
                        case 10504:
                            alert("没有足够的MAC，重新请求!");
                            break;
                        case 10505:
                            alert("SN号不存在!");
                            break;
                        case 10506:
                            alert("SN号已存在!");
                            break;
                        case 10507:
                            alert("SN号无效!");
                            break;
                        case 10508:
                            alert("SN号不能更改或者删除!");
                            break;
                        case 10509:
                            alert("数量太大，最好1-9999之间!");
                            break;
                        case 10510:
                            alert("相机SN或PIN无效!");
                            break;
                        case 10511:
                            alert("该SN号不属于改相机!");
                            break;
                        case 10512:
                            alert("SN号太长!");
                            break;
                        case 10513:
                            alert("该SN号已经与该相机绑定!");
                            break;
                        case 10514:
                            alert("无效的sn!");
                            break;
                        case 10601:
                            alert("角色名不存在!");
                            break;
                        case 10602:
                            alert("角色名已经存在!");
                            break;
                        case 10603:
                            alert("角色id错误!");
                            break;
                        case 10604:
                            alert("超级用户账号不能被删除!");
                            break;
                        case 10605:
                            alert("超级用户不能删除/冻结自己的账号!");
                            break;
                        case 10606:
                            alert("超级用户密码不能重置!");
                            break;
                        case 10607:
                            alert("超级用户不能被冻结!");
                            break;
                        case 10701:
                            alert("该软件产品不存在!");
                            break;
                        case 10702:
                            alert("该软件产品版本代号已经存在!");
                            break;
                        case 10703:
                            alert("软件产品id错误!");
                            break;
                        case 10704:
                            alert("请上传软件包!");
                            break;
                        case 10705:
                            alert("创建软件产品对象失败!");
                            break;
                        case 10706:
                            alert("Android_TV平台的文件格式必须为apk!");
                            break;
                        case 10707:
                            alert("Android平台的文件格式必须为apk!");
                            break;
                        case 10708:
                            alert("软件包哈希值已经丢失，不能发布，请删掉已有信息再重新新建上传!");
                            break;
                        case 10709:
                            alert("TABLE平台文件格式必须是7z!");
                            break;
                        case 10710:
                            alert("CAMERA平台文件格式必须是yak!");
                            break;
                        case 10711:
                            alert("PC平台文件格式必须是7z!");
                            break;
                        case 10801:
                            alert("媒资不存在!");
                            break;
                        case 10802:
                            alert("栏目已经存在!");
                            break;
                        case 10803:
                            alert("栏目不存在!");
                            break;
                        case 10804:
                            alert("媒资的访问链接不存在!");
                            break;
                        case 10805:
                            alert("该媒资的链接不属于该媒资!");
                            break;
                        case 10806:
                            alert("播放列表不存在!");
                            break;
                        case 10807:
                            alert("文件哈希值丢失，不能转码!");
                            break;
                        case 10902:
                            alert("视频转码策略创建失败,请稍后重试或联系管理员!");
                            break;
                        case 11001:
                            alert("该条FAQ不存在!");
                            break;
                        case 11002:
                            alert("该FAQ类型不存在!");
                            break;
                        case 11003:
                            alert("FAQ外文描述不存在!");
                            break;
                        case 11004:
                            alert("这条媒体报道不存在!");
                            break;
                        case 11005:
                            alert("看到新闻板块不存在!");
                            break;
                        case 11006:
                            alert("这条看到新闻不存在!");
                            break;
                        case 11007:
                            alert("该FAQ类型已经存在!");
                            break;
                        case 11008:
                            alert("该看到新闻新闻板块已经存在!");
                            break;
                    }
                }
            })
        }
    };
});