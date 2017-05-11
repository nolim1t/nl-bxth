const isStringEmpty = require('fuckingundefinedemptynull').isStringSet;

module.exports = (obj1, obj2, paraminfo) => {
  if (isStringEmpty(obj2[paraminfo.toString()])) {
    obj1[paraminfo.toString()] = obj2[paraminfo.toString()];
  }
}
