const Service = require('egg').Service;
const Tools = require('../../util/tools.js');
const uuid = require('uuid');
const setting = require('../../conf/setting.js');
const moment = require('moment');

class staff_profile extends Service {
  * addCheck(data) {
    try {


      return Tools.logicResult(0, data);
    } catch (e) {
      return Tools.logicResult(-1, e);
    }
  }

  * editCheck(data) {
    try {

      return Tools.logicResult(0, data);
    } catch (e) {
      return Tools.logicResult(-1, e);
    }
  }

  * delCheck(data) {
    try {


      return Tools.logicResult(0, data);
    } catch (e) {
      return Tools.logicResult(-1, e);
    }
  }

}
module.exports = staff_profile;
