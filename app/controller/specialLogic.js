'use strict';

const Response = require('../util/response.js');
const Tools = require('../util/tools.js');

module.exports = app => {
  class specialLogic extends app.Controller {

    * getOrderPrice() {
      try {
        const data = this.ctx.request.body;
        let res = yield this.service.order.getOrderPrice(data);
        if (res.code != 0) {
          res = Response.fail(res.code);
        }
        this.ctx.body = res;
      } catch (e) {
        this.ctx.body = Response.fail(1, e);
      }
    }

    * emptyWork() {
      try {
        const query = this.ctx.query;
        let where = query.where ? JSON.parse(query.where) : null;
        where = Tools.sqlInjectionCheck(where);
        let res = yield this.service.specialLogic.emptyWork(Tools.sqlInjectionCheck(query.pageAt), where, Tools.sqlInjectionCheck(query.pageLimit));
        if (res.errorCode != 0) {
          res = Response.fail(res.errorCode);
        }
        this.ctx.body = res;
      } catch (e) {
        this.ctx.body = Response.fail(1, e);
      }
    }

    * allWorkByOrder() {
      try {
        const data = this.ctx.request.body;
        let res = yield this.service.specialLogic.allWorkByOrder(data);
        if (res.code != 0) {
          res = Response.fail(res.code);
        }
        this.ctx.body = res;
      } catch (e) {
        this.ctx.body = Response.fail(1, e);
      }
    }

    * workIO() {
      try {
        const data = this.ctx.request.body;
        let res = yield this.service.specialLogic.workIO(data);
        if (res.code != 0) {
          res = Response.fail(res.code);
        }
        this.ctx.body = res;
      } catch (e) {
        this.ctx.body = Response.fail(1, e);
      }
    }

    * workPlan() {
      try {
        const query = this.ctx.query;
        let res = yield this.service.specialLogic.workPlan(query);
        if (res.code != 0) {
          res = Response.fail(res.code);
        }
        this.ctx.body = res;
      } catch (e) {
        this.ctx.body = Response.fail(1, e);
      }
    }

    * freeStaff() {
      try {
        const query = this.ctx.query;
        let where = query.where ? JSON.parse(query.where) : null;
        where = Tools.sqlInjectionCheck(where);
        const order = query.order ? JSON.parse(query.order) : null;
        let res = yield this.service.specialLogic.freeStaff(Tools.sqlInjectionCheck(query.pageAt), where, order, Tools.sqlInjectionCheck(query.pageLimit));
        if (res.errorCode != 0) {
          res = Response.fail(res.errorCode);
        }
        this.ctx.body = res;
      } catch (e) {
        this.ctx.body = Response.fail(1, e);
      }
    }

    * getSmsCode() {
      try {
        const query = this.ctx.query;
        let res = yield this.service.specialLogic.getSmsCode(query);
        if (res.code != 0) {
          res = Response.fail(res.code);
        }
        this.ctx.body = res;
      } catch (e) {
        this.ctx.body = Response.fail(1, e);
      }
    }

    * mobileRgister() {
      try {
        const data = this.ctx.request.body;
        let res = yield this.service.specialLogic.mobileRgister(data);
        if (res.code != 0) {
          res = Response.fail(res.code);
        }
        this.ctx.body = res;
      } catch (e) {
        this.ctx.body = Response.fail(1, e);
      }
    }

    * getRank() {
      try {
        const query = this.ctx.query;
        let where = query.where ? JSON.parse(query.where) : null;
        where = Tools.sqlInjectionCheck(where);
        let res = yield this.service.specialLogic.getRank(Tools.sqlInjectionCheck(query.pageAt), where, Tools.sqlInjectionCheck(query.pageLimit));
        if (res.errorCode != 0) {
          res = Response.fail(res.errorCode);
        }
        this.ctx.body = res;
      } catch (e) {
        this.ctx.body = Response.fail(1, e);
      }
    }

    * rgisterInfoReport() {
      try {
        const res = yield this.service.specialLogic.rgisterInfoReport();
        this.ctx.body = res;
      } catch (e) {
        this.ctx.body = Response.fail(1, e);
      }
    }

  }
  return specialLogic;
};
