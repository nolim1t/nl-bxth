var auth = require('./auth');
const isStringEmpty = require('fuckingundefinedemptynull').isStringSet;
const request = require('request');
const assignFormParamsIfExist = require('assign-obj-params');
const buildquerystring = require('obj-to-querystring');

module.exports = {
  public: (requestinfo, callback) => {
    if (isStringEmpty(requestinfo.endpoint)) {
      var baseurl = requestinfo.baseurl || 'https://bx.in.th/api/';
      var fullurl = baseurl + requestinfo.endpoint;
      var method = requestinfo.method || 'GET';
      var queryString = '';

      queryString = buildquerystring(queryString, requestinfo, 'pairing');
      queryString = buildquerystring(queryString, requestinfo, 'date');
      request({uri: fullurl + '/' + queryString, method: method}, function(e,r,b) {
        if (!e) {
          try {
            callback({
              message: 'Done',
              response: JSON.parse(b)
            });
          } catch (jsonparseError) {
            callback({
              message: 'Error parsing response',
              error: jsonparseError
            });
          }
        } else {
          callback({
            message: 'Error received from API',
            error: e
          });
        }
      });
    } else {
      callback({
        message: 'Require: endpoint'
      });
    }
  },
  private: (requestinfo, callback) => {
    if (isStringEmpty(requestinfo.apikey) && isStringEmpty(requestinfo.apisecret) && isStringEmpty(requestinfo.endpoint)) {
      var baseurl = requestinfo.baseurl || 'https://bx.in.th/api/';
      var fullurl = baseurl + requestinfo.endpoint;
      var method = requestinfo.method || 'POST';
      var signature = auth({apikey: requestinfo.apikey, apisecret: requestinfo.apisecret});
      if (signature.signed == true) {
        var formParams = {
          nonce: signature.nonce,
          key: requestinfo.apikey,
          signature: signature.signature
        };
        // Valid params to auto assign
        // Buy Order
        assignFormParamsIfExist(formParams, requestinfo, 'pairing');
        assignFormParamsIfExist(formParams, requestinfo, 'type'); // 'buy' or 'sell'
        assignFormParamsIfExist(formParams, requestinfo, 'amount');
        assignFormParamsIfExist(formParams, requestinfo, 'rate');
        // Cancel order
        assignFormParamsIfExist(formParams, requestinfo, 'order_id');

        // Pay Bills with bitcoin balance
        assignFormParamsIfExist(formParams, requestinfo, 'group_id');
        assignFormParamsIfExist(formParams, requestinfo, 'biller');
        assignFormParamsIfExist(formParams, requestinfo, 'amount');
        assignFormParamsIfExist(formParams, requestinfo, 'account');

        // Transaction History (Reuse: 'type', valid: trade / fee / deposit / withdraw)
        assignFormParamsIfExist(formParams, requestinfo, 'currency');
        assignFormParamsIfExist(formParams, requestinfo, 'start_date');
        assignFormParamsIfExist(formParams, requestinfo, 'end_date');

        // Deposit Address (Reuse: 'currency')
        assignFormParamsIfExist(formParams, requestinfo, 'new'); // 'true', 'false'

        // Withdrawal (reuse currency, amount)
        assignFormParamsIfExist(formParams, requestinfo, 'address'); // Account number or Address
        assignFormParamsIfExist(formParams, requestinfo, 'bank'); // For Fiat withdraws
        assignFormParamsIfExist(formParams, requestinfo, 'account_name'); // For Fiat withdraws

        request({uri: fullurl, method: method, form: formParams}, function(e,r,b) {
          if (!e) {
            try {
              callback({
                message: 'Done',
                response: JSON.parse(b)
              });
            } catch (jsonparseError) {
              callback({
                message: 'Error parsing response',
                error: jsonparseError
              });
            }
          } else {
            callback({
              message: 'Error received from API',
              error: e
            });
          }
        })
      } else {
        callback({
          message: 'Can\'t sign request'
        });
      }

    } else {
      callback({
        message: 'Require: apikey, apisecret, endpoint'
      });
    };
  }
};
