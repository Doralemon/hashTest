define(["jquery","text!tpls/mediaManagement/trnasCodingManagement.html","artTemplate","common/amdApi","transCodingManagement/transCodeInit","transCodingManagement/transCodingInfo","transCodingManagement/getData","common/getPage","mediaManagement/transCoding","transCodingManagement/delete","transCodingManagement/search","bootstrap","page"],function(n,t,e,a,r,i,o,s,d,g,c){return function(m){var l=s(n(".kandao-transCodingManagement"),10,m.flag1);n(".kandao-transCodingManagement table tbody tr").length<=1&&!m.flag2&&(l.json.page=l.json.page-1||1);var f,p;a.ajax({url:"medias/transcode/task_list",type:"get",json:l.json},function(a){var s=e.render(t,{}),h=n(s).on("click",".initSet",function(){r()}).on("click",".btnInfo",function(){f=n(this).parents("tr").attr("id");var t=n(this).parents("tr").children().eq(1).text();p=n(this).parents("tr").children().eq(1).attr("m_type");var e=n(this).parents("tr").children().eq(0).text();i(f,e,t,p)}).on("click",".btnTransCode",function(){d()}).on("click",".btnDelete",function(){m.flag2=!1,f=n(this).parents("tr").attr("id"),p=n(this).parents("tr").children().eq(1).attr("m_type"),g(f)}).on("keydown",'input[name="q"]',function(t){if(13==t.keyCode){t.preventDefault();var e=n(this).val();e=n.trim(e),c(e)}});m.flag2=!0,n(".kandao-contentBody").html(h),o.myAjax(l.json,a),n(".breadcrumb li").eq(0).on("click",function(){n(".home").trigger("click")})})}});