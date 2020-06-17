let _router = require("express").Router();

const {Users} = require("../../Models/Index");

_router.post("/get", async (req, res) => {
    let _ret = await Users.UsersSessionsModel.GetID(req.body.Token);
    let _data = await Users.UsersModel.findById(_ret);
    if (_ret !== null) {
        res.send({
            Data: _data.FormatPrivate(),
            Response: "OK",
        });
    } else {
        res.send({
            Data: {},
            Response: "ERROR",
            Error: "ACCESS_DENIED",
        })
    }
});

_router.post("/login", async (req, res) => {
    let _ret = await Users.UsersModel.LoginUser(req.body.SendData);
    if (_ret !== false) {
        res.send({
            Data: {
                Token: _ret,
            },
            Response: "OK",
        })
    } else {
        res.send({
            Data: {},
            Response: "ERROR",
            Error: "INVALID_EMAIL_OR_PASSWORD",
        })
    }
});

_router.post("/checkToken", async (req, res) => {
    let _ret = await Users.UsersSessionsModel.CheckToken(req.body.SendData._token);
    if (_ret !== null) {
        return res.send({
            Data: _ret,
            Response: "OK",
        });
    } else {
        return res.send({
            Data: {},
            Response: "ERROR",
            Error: "INVALID_TOKEN",
        })
    }
});

module.exports = _router;