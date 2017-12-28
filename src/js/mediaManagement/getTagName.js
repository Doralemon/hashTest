define(['jquery', 'artTemplate', 'common/amdApi', ],
    function($, mediaLibraryAddTpl, art, amdApi) {
        return function(text, seletor, sonBox, add_tag) {
            var flag = true;
            if (!$.trim(text)) {
                alert('请输入标签名!');
                return;
            }
            add_tag.forEach(function(v, i) { // 添加
                if ($.trim(v) == $.trim(text)) {
                    alert("此标签已存在！");
                    flag = false;
                }
                return false;
            })
            if (!flag) {
                return;
            }
            var str = '<div class="commonBox text-center">' + text +
                '<span class="glyphicon glyphicon-remove-circle">' +
                '</span>' +
                '</div>';
            seletor.find(sonBox).append(str);
            add_tag.push(text);
            seletor.find('span.glyphicon-remove-circle').on('click', function() {
                $(this).parent().remove();
                var delText = $(this).parent().text();
                add_tag.forEach(function(v, i) { //删除
                    if ($.trim(v) == $.trim(delText)) {
                        add_tag.splice(i, 1);
                    }
                    return false;
                })
            })
        }
    })