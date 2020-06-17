const md5 = require("md5");


let RandomString = (i = 32) => {
    let rnd = '';
    while (rnd.length < i)
        rnd += Math.random().toString(36).substring(2);
    return rnd.substring(0, i);
};

let GenerateSessionToken = (_obj) => {
    return RandomString();
};

let GenerateUserTokenAPI = (_obj) => {
    return RandomString(64);
};

let GenerateAccessTokenApp = (_obj) => {
    return RandomString(64);
};

module.exports = {
    GenerateSessionToken: GenerateSessionToken,
    GenerateUserTokenAPI: GenerateUserTokenAPI,
    GenerateAccessTokenApp: GenerateAccessTokenApp,
    RandomString: RandomString,
};