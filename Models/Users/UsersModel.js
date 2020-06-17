const Schema = require("mongoose").Schema;
const model = require("mongoose").model;
const UsersSessionsModel = require("./UsersSessionsModel");
const Security = require("../../Modules/Index").Security;

let _schema = new Schema({
	Email: String,
	Pass: String,
	Name: String,
	LastLogin: {
		type: Number,
		default: Date.now(),
	},
	UserTokenAPI: String,
	IsBanned: {
		type: Boolean,
		default: false,
	}
});

_schema.statics.CheckEmail = async function (_email) {
	let user = await this.findOne({Email: _email});
	return user === null;
};

_schema.methods.CheckPassword = function (_obj) {
	return this.Pass === Security.Password.GeneratePassword(_obj);
};

_schema.statics.AddUser = async function (_obj) {
	let user = new this({
		Email: _obj._email,
		Name: _obj._name,
	});
	await user.SetPassword(_obj);
	user.GenerateUserTokenAPI();
	await user.save();
	return user;
};

_schema.methods.SetPassword = async function (_obj) {
	this.Pass = await Security.Password.GeneratePassword(_obj);
	return true;
};

_schema.methods.GenerateUserTokenAPI = function () {
	this.UserTokenAPI = Security.Token.GenerateUserTokenAPI(64);
	return true;
};

_schema.statics.LoginUser = async function (_obj) {
	let user = await this.findOne({Email: _obj._email});
	if (user !== null) {
		if (user.Pass === Security.Password.GeneratePassword(_obj)) {
			return UsersSessionsModel.AddToken({_id: user._id});
		} else {
			return false;
		}
	} else {
		return false;
	}
};

_schema.methods.FormatOpen = function () {
	return {
		Email: this.Email,
		Name: this.Name,
		LastLogin: this.LastLogin,
	}
};

_schema.methods.FormatPrivate = function () {
	return {
		Email: this.Email,
		Name: this.Name,
		LastLogin: this.LastLogin,
		UserTokenAPI: this.UserTokenAPI,
	}
};

let _model = model("Users", _schema);

module.exports = _model;