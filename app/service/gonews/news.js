'use strict';

const Service = require('egg').Service;

class NewsService extends Service {

  async echo() {

    //直接url爬取数据
    const url = this.config.url+'/api/pc/feed/?category=news_entertainment&utm_source=toutiao&widen=1&max_behot_time=0&max_behot_time_tmp=0&tadrequire=true&as=A195FB6E5F4A992&cp=5BEF1AF939F2DE1&_signature=VwMP2gAADO39RKePwROZ0FcDD8';
    const reponse = await this.ctx.curl(url);

    //Buffer 16进制数据
    console.log(reponse.data);

    //转换数据为对象
    const data = JSON.parse(reponse.data);
    console.log(data);
  }

  async getqc() {

    //直接url爬取数据
    const url = 'http://www.cnautonews.com/tj/doc_3070.json?timestamp='+new Date();
    const reponse = await this.ctx.curl(url);
    //Buffer 16进制数据
    // console.log(reponse.data);

    //转换数据为对象
    const data = JSON.parse(reponse.data);
    // console.log(data);

    return data;
  }

  
}

module.exports = NewsService;
