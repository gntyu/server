'use strict';

const getApiConfig = async function(app) {
    const res = await app.mysql.select('system');
    const data =res.map(sys=>sys.context);
    return data
}

module.exports.getApiConfig = getApiConfig;