const Service = require('egg').Service;
const Response = require('../../util/response.js');
const Tools = require('../../util/tools.js');

class UserService extends Service {

  async find(user) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const info = await this.app.mysql.get('user', {name:user.name,password:user.password});
    console.log('info',info)
    if(info){
      return Response.success();
    }else{
      return Response.fail(10);
    }
  }

  async insert(user) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const info = await this.app.mysql.get('user', {name:user.name});
    console.log('info',info)
    if(info){
      return Response.fail(118);
    }else{
      const row ={
        id:Tools.randomString(16),
        name:user.name,
        password:user.passwd,
        delFlg:0,
        createTime:new Date()
      }
      const newinfo = await this.app.mysql.insert('user', row);
      const insertsuccess = newinfo.affectedRows ===1;
      if(insertsuccess){
        return Response.success();
      }else{
        return Response.fail(118);
      }
      
    }
  }

  async reget() {
    return {
      name:'right',
      password:'123'
    }
  }

}
module.exports = UserService;