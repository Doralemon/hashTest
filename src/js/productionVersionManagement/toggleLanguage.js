define(['jquery', 'common/amdApi'],
    function($, amdApi) {
        return function(selecter) {
            selecter.find('span.ch').on('click', function() {
                $(this).addClass('active');
                selecter.find('span.en').removeClass('active');
                selecter.find('.textCh').show();
                selecter.find('.textEn').hide();
            })
            selecter.find('span.en').on('click', function() {
                $(this).addClass('active');
                selecter.find('span.ch').removeClass('active');
                selecter.find('.textEn').css('display', 'block');
                selecter.find('.textCh').hide();
            });
            selecter.find('span.ch').trigger('click');
        }
    })