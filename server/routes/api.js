require('../base/connect.js');
var express = require('express');
var router = express.Router();
var os = require('os');

var Commands = require('../models/comments');
var User = require('../models/users');


var qiniu = require('qiniu');
var accessKey = 'YQDPe64_KYgzTsx_F4tWT6HubcHz8ISqNSlv3Xgb';
var secretKey = 'Bzqk-naEKBeXTcM_96AW6of6PTx3cp3f_wY_PH0p';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

var options = {
  scope: 'book',
  expires: 1200
};



router.get('/comments', function(req, res, next) {
  let page = +req.param("page");
  let pageNumber = +req.param("pageNumber");
  let C = Commands.find({}).skip((page - 1) * pageNumber).limit(pageNumber);
  C.sort({ '_id': -1 });
  C.exec(function(err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: res.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: "获取成功",
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
});


var libqqwry = require('lib-qqwry');
var qqwry = libqqwry.init();
qqwry.speed();


router.post('/comments/add', function(req, res, next) {
  let isAdmin = req.body.isAdmin ? true : false
  let avatar = isAdmin ? 'user_admin.gif' : req.body.avatar;

  function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
  };
  // var ip1 = qqwry.searchIP(getClientIp(req)).Country;
  // var _ip = ip1.substring(0, ip1.indexOf("市") + 1).split('省').join('省 · ');
  Commands.count({}, (err, count) => {
    var data = {
      name: req.body.name,
      avatar: avatar,
      ip: '_ip',
      address: '',
      message: req.body.message,
      createDate: new Date(),
      floor: count++,
      image: req.body.image,
      accessory: req.body.accessory,
      isShow: true,
      client: req.body.client,
      isAdmin: isAdmin,
      reply: {},
      isAdmin: req.body.isAdmin
    };
    Commands.create(data, function(err, doc) {
      if (err) {
        res.json({
          status: "1",
          msg: err.message,
          result: ""
        })
      } else {
        res.json({
          status: "0",
          msg: '添加成功',
          result: {
            message: req.body.message,
            name: req.body.name
          }
        })
      }
    })
  });
});


router.post('/comments/hidden', function(req, res, next) {
  Commands.update({ _id: req.body.id }, { isShow: req.body.isShow }, function(err, docs) {
    if (err) console.log(err);
    res.json({
      status: "1",
      msg: '修改成功',
      result: {
        _id: req.body.id,
        msg: req.body.message
      }
    })
  })
});


router.post('/comments/reply', function(req, res, next) {
  let id = req.body.id;
  let name = '刘俊皓';
  let msg = req.body.msg;
  let imgs = '';
  Commands.update({ _id: id }, {
    reply: {
      message: msg,
      createDate: new Date(),
      avatar: 'user_admin.gif',
      name: name,
      image: imgs
    }
  }, function(err, docs) {
    if (err) console.log(err);
    res.json({
      status: "1",
      msg: '回复成功',
      result: {
        _id: req.body.id,
        msg: req.body.message
      }
    })
  })
});

router.post('/comments/remove', function(req, res, next) {
  Commands.remove({ _id: req.body.id }, function(err, docs) {
    if (err) console.log(err);
    res.json({
      status: "1",
      msg: '删除成功',
      result: {
        _id: req.body.id
      }
    })
  })
});

router.get('/comments/finduser', function(req, res, next) {
  let page = +req.param("page");
  let pageNumber = +req.param("pageNumber");
  let namea = req.param('name');
  Commands.find({ name: namea, isShow: true }, function(err, doc) {
    if (err) {
      res.json({
        status: "0",
        msg: '',
        result: ''
      })
    } else {
      res.json({
        status: "1",
        msg: '',
        result: {
          list: doc,
          count: doc.length
        }
      })
    }
  })
});

router.get('/comments/token', function(req, res, next) {
  var putPolicy = new qiniu.rs.PutPolicy(options);
  var uploadToken = putPolicy.uploadToken(mac);
  res.json({
    status: '0',
    msg: '生成成功',
    result: {
      token: uploadToken
    }
  })
});

router.post('/login', function(req, res, next) {
  if (req.body.userName && req.body.pwd) {
    User.find({ userNmae: req.body.userName, pwd: req.body.pwd }, function(err, doc) {
      if (doc.length) {
        req.session.userName = req.body.userName ? req.body.userName : null;
        res.json({
          status: "0",
          msg: '登录成功',
          result: {
            userName: req.session.userName
          }
        })
      } else {
        res.json({
          status: "1",
          msg: '账号或密码错误',
          result: ""
        })
      }
    })
  } else {
    if (req.session.userName) {
      res.json({
        status: "0",
        msg: '登录成功',
        result: {
          userName: req.session.userName
        }
      })
    } else {
      res.json({
        status: "1",
        msg: '未登录',
        result: ""
      })
    }
  }
});

router.get('/logout', function(req, res, next) {
  req.session.userName = null;
  res.json({
    status: '0',
    msg: '退出成功',
    result: ''
  })
});



module.exports = router;
