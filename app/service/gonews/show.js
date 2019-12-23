'use strict';

const moment = require('moment');
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
    const sql=`select distinct(syscode) from apis`;
    const res = await this.app.mysql.query(sql);
    const newArr=[];
    for (const x of res) {//只有这个for of循环中可以使用异步
        const arr = await this.app.mysql.query(`select * from apis where syscode='${x.syscode}'`);
        let sum=0;
        arr.map(item=>{
            if(item.times&&!isNaN(Number(item.times))){
                sum+=Number(item.times);
            }
        })
        newArr.push({
            xdata:x.syscode,
            ydata:sum
        });
    }
    // console.log('newArr----',newArr)
    return {
        list:newArr
    };
   }
   
   //查询今日活跃
   async today(type) {
    if(type=='today'){
        const now = moment().format('YYYY-MM-DD');
        const interval= 10*60*1000;//默认10分钟，后面可通过传参获取
        const today = await this.app.mysql.query(`select time from flows where date = '${now}' order by time asc`);

        if(today.length>0){
            let start;
            start =today[0].time.getTime();
            const newarr =[];
            let times=0,index=0;
            let xtime = start + index*interval;
            today.map((item,inx)=>{
                if(item.time.getTime()<=xtime){
                times++;
                if(inx+1==today.length){
                    newarr.push({
                        date:getTimeString(xtime),
                        value:times
                    });
                }
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
    }else{
        const yestoday=moment().format('YYYY-MM-DD');
        const lastAll = await this.app.mysql.query(`select distinct(date) from flows where time < '${yestoday}' order by time desc`);
        if(lastAll.length>0){
            for (const item of lastAll) {//只有这个for of循环中可以使用异步 
                const date =moment(item.date).format('YYYY-MM-DD');
                const count = await this.app.mysql.query(`select * from flows where date='${date}'`);
                const row ={
                    id:date,
                    date:date,
                    times:count.length,
                    create_time:new Date()
                }
                const dateRows=await this.app.mysql.query(`select * from date_flows where date='${date}'`);
                if(!dateRows||dateRows.length==0){
                    const result = await this.app.mysql.insert('date_flows',row);
                    const insertsuccess = result.affectedRows ===1;
                    if(!insertsuccess){
                        console.log('插入date_flows失败');
                    }else{
                        await this.app.mysql.delete('flows', {date:item.date});
                    }
                }
            }
        }
        const res= {
            list:[],
            total:0
        };
        let start= '2018-01-01',end = moment().format('YYYY-MM-DD');
        if(type=='month'){
            start = moment().subtract(1,'month').endOf('days').format('YYYY-MM-DD');
        }
        const monthRows = await this.app.mysql.query(`select * from date_flows where date>'${start}' and date<'${end}'`);
        let sum=0;
        res.list=monthRows.map(item=>{
            sum += item.times
            return{
                value:item.times,
                date:moment(item.date).format('YYYY-MM-DD')
            }
        }),
        res.total=sum;
        return res;
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
