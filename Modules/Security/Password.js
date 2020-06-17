const md5 = require("md5");

let GeneratePassword = (_obj) => {
    return md5(_obj._pass);
};

module.exports = {
    GeneratePassword: GeneratePassword,
};