// app/controller/user.js
const Controller = require('egg').Controller;

class userLogin extends Controller {

  //获取post的传参
  async info() {
    const user = this.ctx.request.body;
    const res = await this.service.user.userCtrl.find(user);
    this.ctx.body = res; 
  }

  async register() {
    const user = this.ctx.request.body;
    const res = await this.service.user.userCtrl.insert(user);
    this.ctx.body = res; 
  }


  //获取get的传参
  async getinfo() {
    const dd = this.ctx.query;
    console.log(dd)
    this.ctx.body='result!'
  }

  //获取动态路由传值
  async getdync() {
    const dd = this.ctx.params;
    console.log(dd)
    this.ctx.body='dynic!'
  }

  //获取爬取的数据
  async getlist() {
    const page = this.ctx.query;
    console.log('page',page);

    const res = await this.service.gonews.news.getqc();
    const latest = await this.service.gonews.db.writedata(res.lists);//数据写入数据库

    console.log('latest',latest)
    let newList;
    if(latest.length>20){
      newList=latest.slice(0,20);
    }else if(latest.length>0){
      newList =latest.concat(res.lists.slice(0,20-latest.length));
    }else{
      newList=res.lists.slice(0,20);
    }
    
    
    this.ctx.body={
      data:{
        lists:newList
      }
    };
    // const res = await this.service.gonews.db.writedata();

  }

  async getapidata(){
    const path = this.ctx.params;
    const query = this.ctx.query;
    console.log('path',path);
    const res = await this.service.gonews.db.getapidata(path,query);
    // console.log('typeof-res:',typeof(res));
  
    // console.log('result:',result);
    this.ctx.body=res
  }

  async getsys(){
    const res = await this.service.gonews.db.getsys();
    console.log('typeof-res:',typeof(res));
    this.ctx.body={
      data:{
        list:res
      }
    }
  }


  async addapi(){
    const obj = this.ctx.request.body;
    // console.log(obj)
    const res = await this.service.gonews.db.writeapi(obj);//数据写入数据库
    // console.log('res',res)
    this.ctx.body=res
  }

  async updateapi(){
    const obj = this.ctx.request.body;
    const res = await this.service.gonews.db.updateapi(obj,'update');//数据写入数据库
    console.log('res',res)
    this.ctx.body=res
  }

  async deleteapi(){
    const obj = this.ctx.request.body;
    const res = await this.service.gonews.db.updateapi(obj,'delete');//数据写入数据库
    console.log('res',res)
    this.ctx.body=res
  }

  async apilist(){
    const obj = this.ctx.request.body;
    const res = await this.service.gonews.db.apilist(obj);
    this.ctx.body={
      data:{
        list:res
      }
    }
  }

 

  //查询数据库
  async getdbdata() {
    // const list = await this.service.gonews.news.getqc();
    // console.log(userInfo);
    const data = await this.service.gonews.db.getdb();
    this.ctx.body='database';
  }

}
module.exports = userLogin;
