const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

let _schema = new Schema({
	Name: String,
	Description: String,
	PhotoURL: String,
	IconURL: String,
	ColorHEX: String,
});

_schema.statics.Add = async function (_obj) {
	let _doc = new this({
		Name: _obj._name,
		Description: _obj._description,
		PhotoURL: _obj._photoURL,
		IconURL: _obj._iconURL,
		ColorHEX: _obj._colorHEX,
	});
	await _doc.save();
	return await _doc;
};

_schema.statics.Update = async function (_obj) {
	await this.findOneAndUpdate({_id: _obj._id}, {
		Name: _obj._name,
		Description: _obj._description,
		PhotoURL: "",
		IconURL: "",
		ColorHEX: _obj._colorHEX,
	})
	return true;
};

_schema.statics.Delete = async function (_obj) {
	await this.findOneAndDelete({_id: _obj._id});
	return true;
};

_schema.statics.GetAll = async function () {
	return await this.find({});
}

_schema.statics.GetByID = async function (_obj) {
	return await this.findById(_obj._id);
}

let _model = model("Items", _schema);

module.exports = _model;