define(["jquery","artTemplate","common/amdApi","bootstrap","page"],function(n,a,t){return function(){t.ajax({url:"medias/columns/add",type:"post"},function(a){n("#cloumnManagement").find(".tagstoAdd").children().removeClass("active");var t=' <span class="sBox active" id="'+a.result.id+'">'+a.result.name+"</span>";n("#cloumnManagement").find(".tagstoAdd").append(t),n(".cloumnManagement-bottom").find('input[name="name"]').val(a.result.name),n(".cloumnManagement-bottom").find('input[name="name_en"]').val(""),n(".cloumnManagement-bottom").find('textarea[name="description"]').val(""),n(".cloumnManagement-bottom").find('textarea[name="description_en"]').val(""),n(".cloumnManagement-bottom").find(".scaleImg img").attr("src","img/giveJpg.jpg"),n(".bottomMateial-bottom>ul").html("")})}});