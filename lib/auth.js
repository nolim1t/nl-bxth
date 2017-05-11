const sha256 = require('js-sha256');
const isStringEmpty = require('fuckingundefinedemptynull').isStringSet;

module.exports = function(authinfo) {
    var nonce = Math.round(new Date().getTime() / 1000);
  if (isStringEmpty(authinfo.apikey) && isStringEmpty(authinfo.apisecret)) {
    return {
      nonce: nonce,
      signed: true,
      signature: sha256(authinfo.apikey.toString() + nonce + authinfo.apisecret.toString())
    };
  } else {
    return {
      nonce: nonce,
      signed: false
    };
  }
}
