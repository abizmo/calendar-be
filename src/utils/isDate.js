const moment = require("moment");

const isDate = (value) => {
  if (!value && value !== 0) {
    return false;
  }

  return moment(value).isValid();
};

module.exports = isDate;
