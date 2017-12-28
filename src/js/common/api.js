function api() {
    var domain = document.domain;
    var url = '';
    if (domain.indexOf('kandao') > -1) {
        url = 'http://cms-test.kandao.tech/cms/v1/';
        // url = 'http://120.76.97.66:8900/cms/v1/';
    } else if ((domain.indexOf('127.0.0.1') > -1 || domain.indexOf('localhost') > -1 || domain.indexOf('192.168.0.21') > -1)) {
        url = 'http://cms-test.kandao.tech/cms/v1/';
        // url = 'http://120.76.97.66:8900/cms/v1/';
    } else {
        url = 'http://120.76.97.66:8900/cms/v1/';
    }
    /(127.0.0.1|localhost|192.168.0.21)/i.test(domain);
    return url;
};

function myAjax(opt, callback,callback1,callback2) {
    $.ajax({
        url: api() + opt.url,
        type: opt.type,
        data: JSON.stringify(opt.data),
        dataType: "json",
        xhrFields: opt.xhrFields,//传cookie
        beforeSend: function(xhr) {
            xhr.setRequestHeader("x-token-id", opt.token);
            callback1;
        },
        complete: function() { // ajax完成后,关闭模态框
            callback2;
        },
        success: function(res) {
            switch (res.code) {
                case 0:
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
                    alert("请重新登录看到科技后台管理系统!");
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
                    $('.staticPage').hide();
                    alert("您没有该权限，请联系管理员！");;
                    break;
                case 10101:
                    alert("邮箱或者密码错误!");
                    break;
                case 10102:
                    alert("验证码错误!");
                    setTimeout(function() {
                        location.href = 'login.html';
                    }, 1500)
                    break;
                case 10103:
                    alert("验证码失效!");
                    setTimeout(function() {
                        location.href = 'login.html';
                    }, 1500)
                    break;
                case 10104:
                    alert("用户不存在!");
                    setTimeout(function() {
                        location.href = 'login.html';
                    }, 1500)
                    break;
                case 10105:
                    alert("用户已存在!");
                    setTimeout(function() {
                        location.href = 'login.html';
                    }, 1500)
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
            }
        }
    })
}