define(['jquery', 'artTemplate', 'common/amdApi', ],
    function($, mediaLibraryAddTpl, art, amdApi) {
        return function(id, text, seletor, sonBox, add_column) {
            if (!id) {
                return;
            }
            var flag = true;
            add_column.forEach(function(v, i) { // 添加
                if (v == id) {
                    alert("此栏目已选择！");
                    flag = false;
                }
                return false;
            })
            if (!flag) {
                return;
            }
            var str = '<div class="commonBox text-center" id="' + id + '">' + text +
                '<span class="glyphicon glyphicon-remove-circle">' +
                '</span>' +
                '</div>';
            seletor.find(sonBox).append(str);
            add_column.push(id);
            seletor.find('span.glyphicon-remove-circle').on('click', function() {
                $(this).parent().remove();
                var delId = $(this).parent().attr('id');
                add_column.forEach(function(v, i) { //删除
                    if (v == delId) {
                        add_column.splice(i, 1);
                    }
                    return false;
                })
            })
        }
    })