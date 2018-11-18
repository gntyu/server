'use strict';

const Response = require('../util/response.js');
const Tools = require('../util/tools.js');
debugger;
const mysql = require('mysql');

// const result = this.app.mysql.insert('user', { name: 'Hello World' ,password:"shjdfgl"});
// debugger;
// let res = this.service.userLogin.login({name:'h',password:'h'});
// let res = mysql.query(`select * from user where name='h' and password='h' `);

module.exports = app => {
  class accountLogin extends app.Controller {
    * login() {
      try {
        const data = this.ctx.request.body;
        let res = yield this.service.userLogin.login(data);
        console.log('res',res);
        if (res.code !== 0) {
          res = Response.fail(res.code);
        }
        this.ctx.body = res;
      } catch (e) {
        this.ctx.body = Response.fail(1, e);
      }
    }
  }
  return accountLogin;
};
