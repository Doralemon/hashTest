define(["jquery","artTemplate","common/amdApi","transCodingManagement/getData","bootstrap","page"],function(a,t,e,n){return function(a){var t={limit:10,page:1,q:a};e.ajax({url:"medias/transcode/task_list",type:"get",json:t},function(a){n.myAjax(t,a)})}});