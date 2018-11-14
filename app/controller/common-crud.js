'use strict';

const Response = require('../util/response.js');
const Tools = require('../util/tools.js');

module.exports = app => {
  class CommonController extends app.Controller {

    * detail() {
      try {
        const resouceName = Tools.getResourceName(this.ctx.request.path);
        const id = Tools.sqlInjectionCheck(this.ctx.params.id);
        const res = yield this.service.commonLogic.commonCrud.detail(resouceName, id);
        this.ctx.body = res;
      } catch (e) {
        this.ctx.body = Response.fail(-1, e);
      }
    }

    * list() {
      try {
        const resouceName = Tools.getResourceName(this.ctx.request.path);
        const query = this.ctx.query;
        const where = query.where ? JSON.parse(query.where) : [];
        const _where = [];
        where.forEach(item => {
          _where.push(Tools.sqlInjectionCheck(item));
        });
        const order = query.order ? JSON.parse(query.order) : null;
        const res = yield this.service.commonLogic.commonCrud.list(resouceName, Tools.sqlInjectionCheck(query.pageAt), _where, order, Tools.sqlInjectionCheck(query.pageLimit));
        this.ctx.body = res;
      } catch (e) {
        this.ctx.body = Response.fail(-1, e);
      }
    }

    * add() {
      try {
        const resouceName = Tools.getResourceName(this.ctx.request.path);
        const data = this.ctx.request.body;
        const res = yield this.service.commonLogic.commonCrud.add(resouceName, data);
        this.ctx.body = res;
      } catch (e) {
        this.ctx.body = Response.fail(-1, e);
      }
    }

    * edit() {
      try {
        const resouceName = Tools.getResourceName(this.ctx.request.path);
        const data = this.ctx.request.body;
        const res = yield this.service.commonLogic.commonCrud.edit(resouceName, data);
        this.ctx.body = res;
      } catch (e) {
        this.ctx.body = Response.fail(-1, e);
      }

    }

    * del() {
      try {
        const resouceName = Tools.getResourceName(this.ctx.request.path);
        const id = this.ctx.params.id;
        const res = yield this.service.commonLogic.commonCrud.del(resouceName, id);
        this.ctx.body = res;
      } catch (e) {
        this.ctx.body = Response.fail(-1, e);
      }
    }
  }
  return CommonController;
};
