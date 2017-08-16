var libqqwry = require('lib-qqwry');
var qqwry = libqqwry.init();
qqwry.speed(); 
var ip1 = qqwry.searchIP("202.103.102.10"); 
var ips = qqwry.searchIPScope("0.0.0.0","1.0.0.0"); 
//异步查询IP段信息
qqwry.searchIPScope("0.0.0.0","1.0.0.0",function(err,iparr){
  console.log(iparr);
});