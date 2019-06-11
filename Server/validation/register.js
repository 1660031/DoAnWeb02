const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.sdt = !isEmpty(data.sdt) ? data.sdt : "";
  data.bsxe = !isEmpty(data.bsxe) ? data.bsxe : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.typeBike = !isEmpty(data.typeBike) ? data.typeBike : "";



if (Validator.isEmpty(data.name)) {
    errors.name = "Vui lòng nhập tên";
  }

if (Validator.isEmpty(data.sdt)) {
    errors.sdt = "Vui lòng nhập số điện thoại";
  } else if (!Validator.isMobilePhone(data.sdt)) {
    errors.sdt = "Số điện thoại không hợp lệ";
  }
if (Validator.isEmpty(data.gender)) {
    errors.gender = "Vui lòng chọn giới tính";
  }
if (Validator.isEmpty(data.password)) {
    errors.password = "Vui lòng nhập mật khẩu";
  }
if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Vui lòng xác nhận mật khẩu";
  }
if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Mật khẩu ít nhất có 6 ký tự";
  }
if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Mật khẩu không trùng";
  }
if (Validator.isEmpty(data.typeBike)) {
    errors.typeBike = "Vui lòng chọn loại xe";
  }
if (Validator.isEmpty(data.bsxe)) {
    errors.bsxe = "Vui lòng nhập biển số xe";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};