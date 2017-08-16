router.post('/', function(req, res, next) {
    // 七牛相关配置信息
    let client = qn.create({
        accessKey:'YQDPe64_KYgzTsx_F4tWT6HubcHz8ISqNSlv3Xgb',
        secretKey:'secretBzqk-naEKBeXTcM_96AW6of6PTx3cp3f_wY_PH0pKey',
        bucket: 'bucket',
        origin: '',
    });
    // 上传单个文件
    // 这里`image`对应前端form中input的name值
    upload.single('image')(req, res, function(err) {
        if (err) {
            return console.error(err);
        }
        if (req.file && req.file.buffer) {
            // 上传到七牛
            client.upload(req.file.buffer, {
                key: '/upload/' + new Date().getTime()
            }, function(err, result) {
                if (err) {
                    return res.json({
                        code: 1,
                        msg: '上传失败！',
                        data: {
                            src: ''
                        }
                    });
                }
                res.json({
                    code: 0,
                    msg: '上传成功！',
                    data: {
                        src: result.url + '?imageslim'
                    }
                });
            });
        }
    });
})