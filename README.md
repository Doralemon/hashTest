# hashTest
### 返回直接设置a标签href="javascript:history.back(-1)"
### 跳转到指定url或hash window.location.replace(url);
### 利用hash值全局刷新  window.location.reload(true);
### list给默认参数， selectWord = transition.query.selectWord || ""，  q = transition.query.q || ""，column = transition.query.column || ""，
    这样搜索的时候直接设置  window.location.href = url;
###  如果有搜索参数，手动的把参数给元素设置一遍           
            
