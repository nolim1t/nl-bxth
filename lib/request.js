var auth = require('./auth');
const isStringEmpty = require('fuckingundefinedemptynull').isStringSet;
const request = require('request');
module.exports = {
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
