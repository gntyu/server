'use strict';

const Service = require('egg').Service;
const Response = require('../../util/response.js');
const Tools = require('../../util/tools.js');


class DbService extends Service {
  async getdb() {
    console.log('123')
    const data = await this.app.mysql.query('select name,password from user where name = ?', 'h');
    console.log('db',data[0])
  }

  //存储数据
  async writedata(arr) {
    console.log('写入数据...')
    let latest = [];
    await arr.map(async (item)=>{
      const res = await this.app.mysql.get('news', {id:item.docid});
      if(!res){
        const row={
          id:item.docid,
          title: item.title,
          desc: item.desc,
          link: item.link,
          weblink: item.weblink,
          logolink:'最新',
          date: new Date(),
          source: item.source
        }
        latest.push(row);
        const result = await this.app.mysql.insert('news', row);
      }
    })
    return latest;
  }

  //存储数据
  async writeapi(obj) {
    console.log('写入API...')
    const res = await this.app.mysql.get('apis', {path:obj.path});
    // console.log('res',res)
    if(!res){
      const row={
        id:Tools.randomString(36),
        path: obj.path,
        desc: obj.desc,
        result: obj.result,
        nums: obj.nums,
        isRandom:obj.isRandom?1:0,
        isExtend: obj.isExtend?1:0,
        createTime: new Date()
      }
      const result = await this.app.mysql.insert('apis', row);
      const insertsuccess = result.affectedRows ===1;
      console.log('insertsuccess',insertsuccess)
      if(insertsuccess){
        return Response.success();
      }else{
        return Response.fail(140,'添加失败！');
      }
    }else{
      return Response.fail(140,'接口已存在');
    }

  }

  async updateapi(row,type){
    if(type=='update'){
      row.updateTime=new Date();
      console.log('update---',row)
      const result = await this.app.mysql.update('apis', row);
      const insertsuccess = result.affectedRows ===1;
      if(insertsuccess){
        return Response.success();
      }else{
        return Response.fail(140,'更新失败');
      }
    }else if(type=='delete'){
      console.log('delete---',row)
      const res = await this.app.mysql.get('apis', {id:row.id});
      if(res){
        const result = await this.app.mysql.delete('apis', {id:row.id});
        return Response.success();
      }else{
        return Response.fail(140,'数据不存在！');
      }

    }
  }

  async apilist (){
    const res = await this.app.mysql.select('apis');
    return res;
  }

}

module.exports = DbService;
