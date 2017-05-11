var apirequest = require('./lib/request');

module.exports = {
  private: {
    balance: (params, cb) => {
      apirequest.private({apikey: params.apikey, apisecret: params.apisecret, endpoint: 'balance'}, function(balcb) {
        if (balcb.message == "Done") {
          cb({message: "Done", balance: balcb.response.balance});
        } else {
          cb({message: balcb.message});
        }
      })
    },
    transactions: (params, cb) => {
      apirequest.private({apikey: params.apikey, apisecret: params.apisecret, endpoint: 'history'}, (histcb) => {
        if (histcb.message == "Done") {
          if (histcb.response !== undefined) {
            if (histcb.response.transactions !== undefined) {
              cb({message: "Done", transactions: histcb.response.transactions})
            } else {
              cb({message: "Can't find any transactions"});
            }
          } else {
            cb({message: "Invalid response"});
          }
        } else {
          cb({message: histcb.message});
        }
      });
    },
    customendpoint: (params, endpoint, cb) => {
      apirequest.private({apikey: params.apikey, apisecret: params.apisecret, endpoint: endpoint}, function(resultcb) {
        if (resultcb.message == "Done") {
          cb(resultcb.response);
        } else {
          var errResponse = {};
          if (resultcb.error !== undefined) {
            errResponse['message'] = resultcb.error;
          } else {
            errResponse['message'] = resultcb.message;
          }
          cb(resultcb);
        }
      });
    }
  } // END: Private functions
}