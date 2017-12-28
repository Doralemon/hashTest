define([
    'jquery',
], function($) {
    return {
        kandaoRoles: function(left, right, all, del, search) {
            $(left).on('click', 'option', function() { //添加权限
                if ($(this).css('display') != 'none')
                    $(right).find('select').append($(this))
                $(search).trigger('input');
            });
            $(right).on('click', 'option', function() { //删除权限
                $(left).find('select').append($(this));
                $(search).trigger('input');
            });
            $(all).on('click', function() { //全选
                $(left).find('option').click();
            });
            $(del).on('click', function() { //清空
                $(right).find('option').click();

            });
            $(search).on('input', function() { //搜索
                var value = $(this).val();
                var flag = false; //用来判断是否禁用全选
                $(left).find('option').each(function(i, v) {
                    if ($(v).html().indexOf(value) == -1) {
                        $(this).css('display', 'none');
                    } else {
                        $(this).css('display', 'block');
                        flag = true;
                    }

                });
                if (flag) {
                    // $(all).attr('disabled', false);
                    $(all).removeClass('disabled');
                } else {
                    // $(all).attr('disabled', true);
                    $(all).addClass('disabled');
                }
            });

        },
        getRolesId: function(selecter) {
            var permissions = [];
            $(selecter).find('option').each(function(i, v) {
                permissions[i] = parseInt($(v).val());
            });
            return permissions;
        }
    }
});