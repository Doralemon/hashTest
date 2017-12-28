define(['jquery'], function($) {
    return {
        checkbox: function(par, son) { //第一个参数是全选按钮  第二个是子按钮
            par.on('click', function() { //判断全选按钮是否为选中状态
                if ($(this).is(":checked")) {
                    son.each(function(v, i) { //为选中状态让每一个都为选中状态
                        $(i).prop('checked', 'checked')
                            // $(i).parents('tr').css('backgroundColor', '#ccc')
                    })
                } else {
                    son.each(function(v, i) { //和上面的相反
                        $(i).prop('checked', false)
                    })
                }
            })
            son.on('click', function(v, i) {
                var falg = true //判断当前全选按钮是否需要选中
                if ($(this).is(":checked")) { //当有一个子按钮被选中时判断其他子按钮是否全部被选中（用来判断是否需要选中全选按钮）
                    son.each(function(v, i) {
                        if (!($(i).is(":checked"))) {
                            return falg = false
                        }
                    })
                    if (falg) {
                        par.prop('checked', true)
                            // $(i).parents('tr').css('backgroundColor', '#ccc')
                    }
                } else { //取消一个子按钮的选中状态是取消全选按钮的选中状态
                    par.prop('checked', false)
                }
            })
        },
        getSelected: function(obj, selObj) { //第一个参数是所有的select下的option,第二个是后台状态
            for (i = 0; i < obj.length; i++) {
                if (obj[i].value == selObj)
                    obj[i].selected = true;
            }
        }
    }
})