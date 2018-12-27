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

  //测试大数据！
  async testLong() {
    const getData = Array.from({ length: 10000 }).map((item, index) => {
      return {
        id: index + 1,
        name: `张一峰-${index + 1}`,
        title: `主治医师-${index + 1}`,
        date: `2018-06-${index + 1}`,
        endDate: `2018-06-${index + 1}`,
        validData: `2018-06-${index + 1}`,
        category: '皮肤科',
        state: '已审核',
        approver: '刘建明',
      };
    });
    this.ctx.body={
      data:{
        list:getData
      }
    };
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

    const body = this.ctx.request.body;
    const method = this.ctx.request.method;
    const context = this.ctx.request.url.split('/')[1];

    console.log('=============context,method===========',context,method);

    let res;
    if(path.firstPath=='getMyCols'){
      res = await this.service.gonews.db.getMyCols(path,body);
    }else if(path.firstPath=='saveMyCols'){
      res = await this.service.gonews.db.saveMyCols(path,body);
    }else{
      res = await this.service.gonews.db.getapidata(path,query,body,method,context);
    }
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
    const res = await this.service.gonews.db.writeapi(obj);//数据写入数据库
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
    this.ctx.body=res
  }

  async apilist(){
    const obj = this.ctx.request.body;
    const res = await this.service.gonews.db.apilist(obj);
    console.log('res',res)
    this.ctx.body={
      data:{
        list:res
      }
    }
  }

    
  async system (){
    const obj = this.ctx.request.body;
    const res = await this.service.gonews.db.syslist(obj);
    // console.log('res',res)
    this.ctx.body={
      data:{
        list:res
      }
    }
  }

  async addsystem (){
    const res = await this.service.gonews.db.addsystem();//数据写入数据库
    this.ctx.body=res
  }

  async updatesystem (){
    const obj = this.ctx.request.body;
    const res = await this.service.gonews.db.updatesystem(obj,'update');//数据写入数据库
    // console.log('res',res)
    this.ctx.body=res
  }

  async deletesystem (){
    const obj = this.ctx.request.body;
    const res = await this.service.gonews.db.updatesystem(obj,'delete');//数据写入数据库
    this.ctx.body=res
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
