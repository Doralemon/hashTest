define(['jquery', 'artTemplate', 'common/amdApi', 'text!tpls/deletModal.html',
"bootstrap", "page"
],
function($, art, amdApi, deletModalTpl) {
return function(opt) {
    $('#deleteMassage').remove();
    $deletModal = $(deletModalTpl)
        .on('click', '.btn-comfirm', function() {
            amdApi.ajax({ url: opt.url, type: 'post' }, function() {
                $deletModal.find('h5').html("删除成功！");
                $deletModal.find('.btn').hide();
                setTimeout(function() {
                    $deletModal.modal('hide');
                }, 300);
                setTimeout(function() {
                    opt.modelSeleter.modal('hide');
                    $('.modal-backdrop').hide();
                }, 300);
                opt.mainSelecter.click();
            })
        })
        .appendTo('body').modal();
    $('#deleteMassage').find('h5').html(opt.text);
}
})