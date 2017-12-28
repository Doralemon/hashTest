  define(['jquery'], function($) {
      return function(selector, num, flag) {
          var page = 1;
          if (flag) {
              selector.find('.pagination>li').each(function(i, v) {
                  if ($(v).hasClass("active")) {
                      page = $(v).children('a').attr('page');
                      page = parseInt(page);
                  }
              })               
          } else {
              page = 1
          }
          var json = {
              limit: num || 10,
              page: page 
          }
          return { json,page};
      }
  });