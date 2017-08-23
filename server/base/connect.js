const mongoose = require('mongoose');

var env = process.env.NODE_ENV || 'development';
var dbUrl = 'mongodb://iuunhao_book:iuunhao/127.0.0.1:27017/book'
if(env=== 'development'){
  dbUrl='mongodb://iuunhao_book:iuunhao/127.0.0.1:27017/book'
}

mongoose.connect(dbUrl);

mongoose.connection.on('error', function() {
  console.log('数据库连接失败！')
});

mongoose.connection.on('open', function() {
  console.log('数据库连接成功！')
});
