let _router = require("express").Router();

const {Users, Items} = require("../../Models/Index");

_router.post("/get", async (req, res) => {
	return res.send({Data: await Items.GetAll(), Response: "OK"});
});

_router.post("/", async (req, res) => {
	return res.send({Data: await Items.GetByID(req.body.SendData), Response: "OK"});
});

_router.post("/add", async (req, res) => {
	let _ret = await Users.UsersSessionsModel.CheckToken(req.body.Token);
	if (_ret !== null) {
		let _data = await Items.Add(req.body.SendData)
		return res.send({
			Data: _data,
			Response: "OK",
		});
	} else {
		return res.send({
			Data: {},
			Response: "ERROR",
			Error: "INVALID_TOKEN",
		}).status(403);
	}
});

_router.post("/edit", async (req, res) => {
	let _ret = await Users.UsersSessionsModel.CheckToken(req.body.Token);
	if (_ret !== null) {
		await Items.Update(req.body.SendData)
		return res.send({
			Response: "OK",
		});
	} else {
		return res.send({
			Data: {},
			Response: "ERROR",
			Error: "INVALID_TOKEN",
		}).status(403);
	}
});

_router.post("/delete", async (req, res) => {
	let _ret = await Users.UsersSessionsModel.CheckToken(req.body.Token);
	if (_ret !== null) {
		await Items.Delete(req.body.SendData)
		return res.send({
			Response: "OK",
		});
	} else {
		return res.send({
			Data: {},
			Response: "ERROR",
			Error: "INVALID_TOKEN",
		}).status(403);
	}
});

module.exports = _router;