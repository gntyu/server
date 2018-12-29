'use strict';

const Service = require('egg').Service;
const Response = require('../../util/response.js');
const Tools = require('../../util/tools.js');


class ShowService extends Service {
  async getdb() {
    const data = await this.app.mysql.query('select name,password from user where name = ?', 'h');
    console.log('db',data[0])
  }
  
   //查询今日活跃
   async tops(type) {
    const sql=`select * from apis order by times desc limit 20`;
    console.log('sql',sql)
    const res = await this.app.mysql.query(sql);
    console.log('res',res)
    return {
        list:res
    };
   }
   //查询今日活跃
   async today(type) {
    let now,interval;
    if(type=='today'){
        now = new Date().toLocaleDateString();
        interval= 10*60*1000;//默认10分钟，会面可通过传参获取
    }else if(type=='month'){
        now = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-1';
        interval= 24*60*60*1000;//默认10分钟，会面可通过传参获取
    }

    // console.log('now',now);
    // console.log('interval',interval);
    const today = await this.app.mysql.query(`select time from flows where time> '${now}' order by time asc`);
    const start =today[0].time.getTime();

    // const end =today[today.length-1].time.getTime();
    // console.log('start',new Date(start).toLocaleString());
    // console.log('end',new Date(end).toLocaleString());
    // const count =Math.ceil((end-start)/interval);
    // console.log('count',count);

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

    function getTimeString(timestap){

        let month =new Date(timestap).getMonth()+1;
        let day =new Date(timestap).getDate();
        let hour =new Date(timestap).getHours();
        let mins =new Date(timestap).getMinutes();

        const time = (hour<10?'0'+hour:hour) +':'+ (mins<10?'0'+mins:mins);
        const myday = (month<10?'0'+month:month) +'/'+ (day<10?'0'+day:day);

        if(type=='today'){
            return time;
        }else if(type=='month'){
            return myday;
        }
      
    }
  }

}

module.exports = ShowService;
