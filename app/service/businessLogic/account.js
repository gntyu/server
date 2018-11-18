const Service = require('egg').Service;
const Tools = require('../../util/tools.js');
const uuid = require('uuid');
const setting = require('../../conf/setting.js');

class account extends Service {
  * listCheck(data) {
    try {
      console.log(1);

      return Tools.logicResult(0, data);
    } catch (e) {
      if (e.errno == undefined) {
        return Tools.logicResult(-1, e);
      }
      return Tools.logicResult(e.errno, e);

    }
  }

  * detailCheck(data) {
    try {

      return Tools.logicResult(0, data);
    } catch (e) {
      if (e.errno == undefined) {
        return Tools.logicResult(-1, e);
      }
      return Tools.logicResult(e.errno, e);

    }
  }

  // 更新数据必须是conn
  * addCheck(data, conn) {
    try {

      return Tools.logicResult(0, data);
    } catch (e) {
      yield conn.rollback();
      if (e.errno == undefined) {
        return Tools.logicResult(-1, e);
      }
      return Tools.logicResult(e.errno, e);

    }
  }

  // 更新数据必须是conn
  * editCheck(data, conn) {
    try {

      return Tools.logicResult(0, data);
    } catch (e) {
      yield conn.rollback();
      if (e.errno == undefined) {
        return Tools.logicResult(-1, e);
      }
      return Tools.logicResult(e.errno, e);

    }
  }

  // 更新数据必须是conn
  * delCheck(data, conn) {
    try {

      return Tools.logicResult(0, data);
    } catch (e) {
      yield conn.rollback();
      if (e.errno == undefined) {
        return Tools.logicResult(-1, e);
      }
      return Tools.logicResult(e.errno, e);

    }
  }

}
module.exports = account;
