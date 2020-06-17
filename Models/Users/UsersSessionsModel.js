const Schema = require("mongoose").Schema;
const model = require("mongoose").model;
const Security = require("../../Modules/Index").Security;

let _schema = new Schema({
    IdUser: String,
    Token: String,
});

_schema.statics.AddToken = function (_obj) {
    let session = new this({
        IdUser: _obj._id,
        Token: Security.Token.GenerateSessionToken(),
    });
    session.save();
    return session.Token;
};

_schema.statics.CheckToken = async function (_token) {
    let token = await this.findOne({Token: _token});
    if (token !== null) {
        return token;
    } else {
        return null;
    }
};

_schema.statics.GetID = async function (_token) {
    let token = await this.findOne({Token: _token});
    if (token !== null) {
        return token.IdUser;
    } else {
        return null;
    }
};

let _model = model("UsersSessions", _schema);

module.exports = _model;