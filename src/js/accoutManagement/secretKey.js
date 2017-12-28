define(['jquery', 'text!tpls/account/accoutManagementSecretKey.html', 'artTemplate', 'common/amdApi'],
    function($, accoutManagementSecretKeyTpl, art, amdApi) {
        return function(id) {
            amdApi.ajax({ url: 'customers/' + id + '/licenses', type: 'get', json: '' }, function(res) {
                // console.log(res)
                var accoutManagementSecretKey = art.render(accoutManagementSecretKeyTpl, res.result);
                var $accoutManagementSecretKey = $(accoutManagementSecretKey);
                $(".kandao-contentBody").html($accoutManagementSecretKey);
                $('.kandao-secretKey').on('click', '.keyState', function() {
                    var state = $(this).parents('tr').attr('state');
                    state = parseInt(state);
                    var keyId = $(this).parents('tr').attr('keyId');
                    keyId = parseInt(keyId);
                    var host = $(this).parent().siblings('.host').text();
                    var key = $(this).parent().siblings('.key').text();
                    var json = {
                        "id": keyId,
                        "host": host,
                        "key": key,
                        "state": state
                    };
                    // console.log(json);
                    amdApi.ajax({ url: "customers/" + id + "/licenses/" + keyId, type: "post", json: JSON.stringify(json) }, function(res) {
                        amdApi.ajax({ url: 'customers/' + id + '/licenses', type: 'get', json: '' }, function(res) {
                            // console.log(res);
                            var str = '<div class="workKey">' +
                                '<h4>有效密钥</h4>' +
                                '<table class="table table-striped table-hover">' +
                                '<thead>' +
                                '<tr>' +
                                '<th>密钥</th>' +
                                '<th>主机</th>' +
                                '<th>激活时间</th>' +
                                '<th>操作</th>' +
                                '</tr>' +
                                '</thead>' +
                                '<tbody>'
                            for (var i = 0; i < res.result.licenses.length; i++) {
                                var obj = res.result.licenses[i];
                                if (obj.state == 0) {
                                    str += '<tr keyId="' + obj.id + '" state="' + obj.state + '">' +
                                        '<td class="key">' + obj.key + '</td>' +
                                        '<td class="host">' + obj.host + '</td>' +
                                        '<td>' + obj.active_time + '</td>' +
                                        '<td>' +
                                        '<button type="button" class="btn keyState">冻结</button>' +
                                        '</td>' +
                                        '</tr>'
                                }

                            }
                            str += '</tbody>' +
                                '</table>' +
                                '</div>' +
                                '<div class="noWorkKey">' +
                                '<h4>无效密钥</h4>' +
                                '<table class="table table-striped table-hover">' +
                                '<thead>' +
                                '<tr>' +
                                '<th>密钥</th>' +
                                '<th>主机</th>' +
                                '<th>激活时间</th>' +
                                '<th>操作</th>' +
                                '</tr>' +
                                '</thead>' +
                                '<tbody>'
                            for (var i = 0; i < res.result.licenses.length; i++) {
                                var obj = res.result.licenses[i];
                                if (obj.state == 1) {
                                    str += '<tr keyId="' + obj.id + '" state="' + obj.state + '">' +
                                        '<td class="key">' + obj.key + '</td>' +
                                        '<td class="host">' + obj.host + '</td>' +
                                        '<td>' + obj.active_time + '</td>' +
                                        '<td>' +
                                        '<button type="button" class="btn keyState">激活</button>' +
                                        '</td>' +
                                        '</tr>'
                                }
                            }
                            str += '</tbody>' +
                                '</table>' +
                                '</div>'
                            $(".kandao-secretKey .keyContent").html(str);
                        })
                    })
                })
                $('.kandao-secretKey').on('click', '.btn-goback', function() {
                    $('.accoutManagement').trigger('click');
                })

            })
        }
    })