'use strict';

const Service = require('egg').Service;
const Response = require('../../util/response.js');
const Tools = require('../../util/tools.js');


class ShowService extends Service {
  async getdb() {
    const data = await this.app.mysql.query('select name,password from user where name = ?', 'h');
    console.log('db',data[0])
  }
  
   //查询top20
   async tops() {
    const sql=`select * from apis order by times desc limit 20`;
    const res = await this.app.mysql.query(sql);
    const newArr=res.map(item=>{
        return{
            ...item,
            xdata:item.path,
            ydata:item.times
        }
    })
    return {
        list:newArr
    };
   }
   //查询各个系统使用情况
   async system() {
    const sql=`select distinct(syscode) from flows`;
    const res = await this.app.mysql.query(sql);
    const newArr=[];
    for (const x of res) {//只有这个for of循环中可以使用异步
        const value = await this.app.mysql.query(`select syscode from flows where syscode='${x.syscode}'`);
        newArr.push({
            xdata:x.syscode,
            ydata:value.length
        });
    }
    // console.log('newArr----',newArr)
    return {
        list:newArr
    };
   }
   //查询今日活跃
   async today(type) {
    let now,interval;
    if(type=='today'){
        now = new Date().toLocaleDateString();
        interval= 10*60*1000;//默认10分钟，后面可通过传参获取
    }else if(type=='month'){
        now = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-1';
        interval= 24*60*60*1000;//一天
    }else if(type=='recent'){
        now='2018-01-01';
        interval= 24*60*60*1000;//一天
    }

    // console.log('now',now);
    // console.log('interval',interval);
    const today = await this.app.mysql.query(`select time from flows where time> '${now}' order by time asc`);
    // console.log('today1',today);
    if(today.length>0){
        const start =today[0].time.getTime();
        const newarr =[];
        let index =0,times=0;
        let xtime = start + index*interval;
        today.map(item=>{
           if(item.time<=xtime){
            times++;
           }else{
            newarr.push({
                date:getTimeString(xtime),
                value:times
            });
            index++;
            times=0;
            xtime = start + index*interval;
           }
        });
        return {
            list:newarr,
            total:today.length
        };
    }else{
        return {
            list:[],
            total:0
        };
    }


    function getTimeString(timestap){

        let month =new Date(timestap).getMonth()+1;
        let day =new Date(timestap).getDate();
        let hour =new Date(timestap).getHours();
        let mins =new Date(timestap).getMinutes();

        const time = (hour<10?'0'+hour:hour) +':'+ (mins<10?'0'+mins:mins);
        const myday = (month<10?'0'+month:month) +'/'+ (day<10?'0'+day:day);

        if(type=='today'){
            return time;
        }else if(type=='month'||type=='recent'){
            return myday;
        }
      
    }
  }

}

module.exports = ShowService;
