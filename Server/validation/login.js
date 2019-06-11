const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateLoginInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.sdt = !isEmpty(data.sdt) ? data.sdt : "";
  data.password = !isEmpty(data.password) ? data.password : "";
// sdt checks
  if (Validator.isEmpty(data.sdt)) {
    errors.sdt = "Vui lòng nhập số điện thoại";
  } else if (!Validator.isMobilePhone(data.sdt)) {
    errors.sdt = "Số điện thoại không hợp lệ";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Vui lòng nhập mật khẩu";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};