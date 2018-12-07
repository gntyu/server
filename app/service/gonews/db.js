'use strict';

const Service = require('egg').Service;
const Response = require('../../util/response.js');
const Tools = require('../../util/tools.js');


class DbService extends Service {
  async getdb() {
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
    const res = await this.app.mysql.get('apis', {path:obj.path,method:obj.method});
    const list = await this.service.gonews.db.getsys();
    let sysname;
    list.map((item)=>{
      if(item.value==obj.syscode){
        sysname=item.label;
      }
    })
    if(!res){
      const pathArr = obj.path.split('/');
      const row={
        id:Tools.randomString(36),
        path: obj.path,
        desc: obj.desc,
        result: obj.result,
        nums: obj.nums,
        syscode: obj.syscode,
        sysname,
        isRandom:obj.isRandom?1:0,
        isExtend: obj.isExtend?1:0,
        isStrict: obj.isStrict?1:0,
        method:obj.isStrict?(obj.method||''):'',
        firstPath:pathArr[0],
        secondPath:pathArr[1]||'',
        thirdPath:pathArr[2]||'',
        createTime: new Date(),
        updateTime: new Date(),
      }
      const result = await this.app.mysql.insert('apis', row);
      const insertsuccess = result.affectedRows ===1;
      // console.log('insertsuccess',insertsuccess)
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
      const sql = 'SELECT * FROM `apis` WHERE `id` !="'+row.id+'" AND`path` ="' + row.path+'"';
      // console.log('update---sql',sql);
      const isExist = await this.app.mysql.query(sql);
      // console.log('update---isExist',isExist.length);

      let flag = true;
      if(isExist.length>0){ 
        isExist.map(item=>{
          if(item.method==row.method){
            flag=false;
          }
        })
        if(!flag){
          return Response.fail(140,method+'请求方式下的path已存在！');
        }
      }
      if(flag){
        row.updateTime=new Date();
        // console.log('update---',row);
        const result = await this.app.mysql.update('apis', row);
        const insertsuccess = result.affectedRows ===1;
        if(insertsuccess){
          return Response.success();
        }else{
          return Response.fail(140,'更新失败');
        }
      }
     
    }else if(type=='delete'){
      // console.log('delete---',row)
      const res = await this.app.mysql.get('apis', {id:row.id});
      if(res){
        const result = await this.app.mysql.delete('apis', {id:row.id});
        return Response.success();
      }else{
        return Response.fail(140,'数据不存在！');
      }

    }
  }

  async getapidata (item,query,body,method){
    let name ;
    if(item.secondPath||item.thirdPath){
      name={ path : item.firstPath+'/'+item.secondPath};
    }else{
      name = {path:item.firstPath};
    }
    
    let data =null;
    let final=null;

    const res = await this.app.mysql.get('apis',name);
    if(res){//老接口 
      final = res;
    }else{//新接口 
      const newres = await this.app.mysql.select('apis',{where:{...item}});
      if(!newres){//--判断变量
        const sItem={ ...item,secondPath:'$' }
        const sRes = await this.app.mysql.get('apis',{where:{...sItem}});
        if(sRes){
          final = sRes;
        }else{
          const tItem={ ...item,thirdPath:'$' }
          const tRes = await this.app.mysql.get('apis',{where:{...tItem}});
          if(tRes){
            final = tRes; 
          }
        }
      }else{
        final = newres;
      }
    }

    console.log('final',final);//-- 结果可能是多个
    if(final.length>1){
      final.map(item=>{
        if(item.method==method){
          data =JSON.parse(item.result);
        }
      });
    }else{
      data =JSON.parse(final.result); 
    }

   
    if(data['urlFilter']){
      const key = data['urlFilter'];
      if(query[key])data.data[key]=Number(query[key]);
    }
    // console.log('data',data)

    return data;
  }

  async apilist (obj){
    // console.log('obj======',obj);
    let sql ='SELECT * FROM `apis` ';
    if(obj&&obj.syscode&&obj.syscode.length>0){
      obj.syscode.map((item,index)=>{
        sql += index==0?'WHERE syscode ="'+item+'"':' OR syscode ="'+ item+'"';
      })
    }
    sql += ' ORDER BY `updateTime` DESC'
    // console.log('sql======',sql);
    // const sql = 'SELECT * FROM `apis` WHERE syscode = '+uc+' OR syscode = ''
    const res = await this.app.mysql.query(sql);
    return res;
  }

  async getsys (){
    const sql = 'SELECT DISTINCT `sysname`,`syscode`  FROM `apis`'
    // console.log('sql------sys',sql)
    const res = await this.app.mysql.query(sql);
    let list=[];
    res.map((item)=>{
      if(item.sysname&&item.syscode){
        list.push({
          label:item.sysname,
          value:item.syscode,
        })
      }
    })
    // console.log('====list====',list)
    return list;
  }

  async getMyCols(item,query){
    const res = await this.app.mysql.get('mycols',query);
    // console.log(res)
    const data =JSON.parse(res.cols); 
    return {
      data
    };
  }

  async saveMyCols(item,query){
    const sql = 'SELECT `id` FROM `mycols` WHERE `path` ="'+query.path+'" AND `serialNumber` ="' + query.serialNumber+'"';
    const isExist = await this.app.mysql.query(sql);
    // console.log('update---',isExist);
    if(isExist.length!=[0]){
      const row = {
        id:isExist[0].id,
        cols: JSON.stringify(query.cols),
        updateTime: new Date()
      }
      const result = await this.app.mysql.update('mycols', row);
      // console.log('update---result',result);
      const insertsuccess = result.affectedRows ===1;
      if(insertsuccess){
        return Response.success();
      }else{
        return Response.fail(140,'更新失败');
      }
    }else{
      const row={
        id:Tools.randomString(36),
        path: query.path,
        serialNumber: query.serialNumber,
        cols: JSON.stringify(query.cols),
        createTime: new Date(),
        updateTime: new Date()
      }
      // console.log('row',row)
      const result = await this.app.mysql.insert('mycols', row);
      const insertsuccess = result.affectedRows ===1;
      // console.log('insertsuccess',insertsuccess)
      if(insertsuccess){
        return Response.success();
      }else{
        return Response.fail(140,'添加失败！');
      }
    }
  }

}

module.exports = DbService;
