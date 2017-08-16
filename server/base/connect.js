const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/book');

mongoose.connection.on('error', function() {
  console.log('数据库连接失败！')
});

mongoose.connection.on('open', function() {
  console.log('数据库连接成功！')
});
