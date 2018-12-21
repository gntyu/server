'use strict';
const entities = require('./conf/entities');


module.exports = app => {
  const jwt = app.middleware.jwt();

  // 上传图片
  app.post('/api/picture/upload', jwt, app.controller.resourceUpload.upload);
  // 上传音乐
  app.post('/api/music/upload', jwt, app.controller.resourceUpload.upload);
  // 上传视频
  app.post('/api/video/upload', jwt, app.controller.resourceUpload.upload);
  // 上传文件
  app.post('/api/file/upload', jwt, app.controller.resourceUpload.upload);
  // 用户登录
  // app.post('/api/login', jwt, app.controller.accountLogin.login);


  //test
  app.post('/api/login', jwt, app.controller.userLogin.info);
  app.post('/api/register', jwt, app.controller.userLogin.register);
  app.get('/api/getinfo', jwt, app.controller.userLogin.getinfo);
  app.get('/api/getdync/:id', jwt, app.controller.userLogin.getdync);


  //项目测试接口
  const bases =['api-portal','kpi-management','v1','api'];//各个项目的前缀
  const type = ['get','post','delete'];//目前三种请求方式
  bases.map(item=>{
    type.map(method=>{
      //当前最多支持到四个路径
      app[method](`/${item}/:firstPath`, jwt, app.controller.userLogin.getapidata);
      app[method](`/${item}/:firstPath/:secondPath`, jwt, app.controller.userLogin.getapidata);
      app[method](`/${item}/:firstPath/:secondPath/:thirdPath`, jwt, app.controller.userLogin.getapidata);
      app[method](`/${item}/:firstPath/:secondPath/:thirdPath/:forthPath`, jwt, app.controller.userLogin.getapidata);
    })
  })

  // app.get('/api-portal/:firstPath', jwt, app.controller.userLogin.getapidata);
  // app.get('/api-portal/:firstPath/:secondPath', jwt, app.controller.userLogin.getapidata);
  // app.get('/api-portal/:firstPath/:secondPath/:thirdPath', jwt, app.controller.userLogin.getapidata);
  // app.get('/api-portal/:firstPath/:secondPath/:thirdPath/:forthPath', jwt, app.controller.userLogin.getapidata);
  // app.post('/api-portal/:firstPath', jwt, app.controller.userLogin.getapidata);
  // app.post('/api-portal/:firstPath/:secondPath', jwt, app.controller.userLogin.getapidata);
  // app.post('/api-portal/:firstPath/:secondPath/:thirdPath', jwt, app.controller.userLogin.getapidata);
  // app.post('/api-portal/:firstPath/:secondPath/:thirdPath/:forthPath', jwt, app.controller.userLogin.getapidata);
  // app.delete('/api-portal/:firstPath', jwt, app.controller.userLogin.getapidata);
  // app.delete('/api-portal/:firstPath/:secondPath', jwt, app.controller.userLogin.getapidata);
  // app.delete('/api-portal/:firstPath/:secondPath/:thirdPath', jwt, app.controller.userLogin.getapidata);
  // app.delete('/api-portal/:firstPath/:secondPath/:thirdPath/:forthPath', jwt, app.controller.userLogin.getapidata);



  app.get('/lyapi/getsys', jwt, app.controller.userLogin.getsys);
  app.get('/lyapi/testLong', jwt, app.controller.userLogin.testLong);


  app.post('/lyapi/addapi', jwt, app.controller.userLogin.addapi);
  app.post('/lyapi/updateapi', jwt, app.controller.userLogin.updateapi);
  app.post('/lyapi/deleteapi', jwt, app.controller.userLogin.deleteapi);
  app.post('/lyapi/apilist', jwt, app.controller.userLogin.apilist);

  app.get('/lyapi/getlist', jwt, app.controller.userLogin.getlist);
  app.get('/lyapi/getdbdata', jwt, app.controller.userLogin.getdbdata);



  // weChatApi
  // app.get('/api/wechat/appid', jwt, app.controller.weChatApi.getAppId);
  // app.get('/api/wechat/token', jwt, app.controller.weChatApi.getToken);
  // app.get('/api/wechat/ticket', jwt, app.controller.weChatApi.getTicket);
  // app.post('/api/wechat/sdkinfo', jwt, app.controller.weChatApi.getSdkInfo);
  // // 获取用户信息snsapi_base
  // app.get('/api/wechat/snsapi_base/:code', jwt, app.controller.weChatApi.snsapiBase);
  // // 获取用户信息snsapi_userinfo
  // app.get('/api/wechat/snsapi_userinfo/:code', jwt, app.controller.weChatApi.snsapiUserInfo);
  // // 获取用户信息
  // app.get('/api/wechat/userinfo/:openid', jwt, app.controller.weChatApi.userInfo);
  // // 获取prepayId
  // app.post('/api/wechat/prepay', jwt, app.controller.weChatApi.getPrePayId);
  // // 支付回调
  // app.post('/api/wechat/paynotify', app.controller.weChatApi.getPayNotify);

  // for (const item in entities) {
  //   app.get(`/api/${item}/detail/:id`, jwt, 'commonCrud.detail');
  //   app.get(`/api/${item}/list`, jwt, 'commonCrud.list');
  //   app.post(`/api/${item}/add`, jwt, 'commonCrud.add');
  //   app.post(`/api/${item}/edit`, jwt, 'commonCrud.edit');
  //   app.post(`/api/${item}/del/:id`, jwt, 'commonCrud.del');
  // }
};
