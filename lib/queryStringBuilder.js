const isStringEmpty = require('fuckingundefinedemptynull').isStringSet;

module.exports = (qS, obj1, paraminfo) => {
  if (isStringEmpty(obj1[paraminfo.toString()])) {
    if (qS == '') {
      return '?' + paraminfo + '=' + obj1[paraminfo.toString()];
    } else {
      return qS + '&' + paraminfo + '=' + encodeURIComponent(obj1[paraminfo.toString()]);
    }
  } else {
    return qS;
  }
}
