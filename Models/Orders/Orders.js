const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

let item = new Schema({
    IdItem: String,
    Name: String,
    Count: Number,
    Value: Number,
})

let _schema = new Schema({
    Name: String,
    Phone: String,
    Email: String,
    Cost: Number,
    Cost100: Number,
    Cost25: Number,
    Count: Number,
    Count100: Number,
    Count25: Number,
    Items: [item],
});

_schema.statics.Add = async function (_obj) {
    let _doc = new this({
        Name: _obj._name,
        Phone: _obj._phone,
        Email: _obj._email,
        Cost: _obj._cost,
        Cost100: _obj._cost100,
        Cost25: _obj._cost25,
        Count: _obj._count,
        Count100: _obj._count100,
        Count25: _obj._count25,
    });
    await _doc.save();
    return _doc;
};

let _model = model("Orders", _schema);

module.exports = _model;