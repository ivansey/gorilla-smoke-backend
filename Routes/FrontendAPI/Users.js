let _router = require("express").Router();

const {Users} = require("../../Models/Index");

_router.post("/get", async (req, res) => {
    let _data = await Users.UsersModel.findById(req.body.SendData._id);
    if (_data === null) {
        return res.send({
            Data: {},
            Response: "ERROR",
            Error: "NOT_FOUND",
        })
    } else {
        return res.send({
            Data: _data.FormatOpen(),
            Response: "OK",
        })
    }
});

_router.post("/add", async (req, res) => {
    if (await Users.UsersModel.CheckEmail(req.body.SendData._email) === true) {
        let _data = await Users.UsersModel.AddUser(req.body.SendData);
        return res.send({
            Data: _data,
            Response: "OK",
        });
    } else {
        return res.send({
            Data: {},
            Response: "ERROR",
            Error: "NOT_FREE_EMAIL",
        });
    }
});

module.exports = _router;