define(["jquery","text!tpls/systemBackend/rolesEdit.html","artTemplate","systemRolesManagement/rolesOpation","common/amdApi","systemRolesManagement/getData","common/getPage","bootstrap"],function(e,s,t,i,o,n,l){return function(n,l,r){e("#systemRoleEdit").remove(),o.ajax({url:"backend/permissions/roles/"+n,type:"get"},function(a){for(var m=a.result.has_permissions,d=a.result.permissions,p=m.concat(d),c=[],y=0;y<p.length;y++)JSON.stringify(p).split(JSON.stringify(p[y])).length>2||c.push(p[y]);a.result.permissions=c;var u=t.render(s,a.result),g=[];e(".selectedPermissions select option");$roleEdit=e(u).appendTo("body").modal(),r&&e('#systemRoleEdit input[name="name"]').val(e('#systemRoleEdit input[name="name"]').val()+r),i.kandaoRoles("#systemRoleEdit .ptionalRoles","#systemRoleEdit .selectedPermissions","#systemRoleEdit .selectAll","#systemRoleEdit .delAll","#systemRoleEdit .rolesipt"),$roleEdit.on("submit","form",function(s){s.preventDefault();var t=e('#systemRoleEdit input[name="name"]').val(),r=e('#systemRoleEdit textarea[name="description"]').val();if(g=i.getRolesId("#systemRoleEdit .selectedPermissions"),!e.trim(t)||!e.trim(r)||!d)return void alert("请确认角色名称描述及权限都添加完成！");if(l=="backend/permissions/roles/"+n+"/change")var a={name:t,description:r,permissions:g};var a={id:n,name:t,description:r,permissions:g};o.ajax({url:l,type:"post",json:JSON.stringify(a)},function(s){$roleEdit.modal("hide"),e(".rolesManagement").trigger("click")})})})}});