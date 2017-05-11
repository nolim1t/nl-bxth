var apirequest = require('./lib/request');

module.exports = {
  balance: (params, cb) => {
    apirequest.private({apikey: params.apikey, apisecret: params.apisecret, endpoint: 'balance'}, function(balcb) {
      if (balcb.message == "Done") {
        cb({message: "Done", balance: balcb.response.balance});
      } else {
        cb({message: balcb.message});
      }
    })
  }
}
