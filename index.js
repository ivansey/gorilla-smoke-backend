require("dotenv").config();
let Express = require('express');
let FileUpload = require("express-fileupload");
let BodyParser = require('body-parser');
let Mongoose = require('mongoose');
let md5 = require('md5');
let cors = require('cors');
let path = require("path");

let Models = require("./Models/Index");

const PORT = process.env.PORT;

Mongoose.set("useFindAndModify", false);
Mongoose.set("useNewUrlParser", true);
Mongoose.set("useUnifiedTopology", true);
Mongoose.connect(process.env.MONGODB_SERVER);

let App = Express();

App.use(BodyParser());
App.use(cors());
App.use(FileUpload());
App.use(Express.static(path.join(__dirname, '/Static')));

App.use("/", require("./Routes/Index"));

App.post("/frontendapi/storage/image/upload", (req, res) => {
	let file = req.files.file;

	console.log("Upload image");

	file.mv("./Static/IMG/" + req.body.filename, (err) => {
		if (err) {
			return res.json({Response: "OK", URL: "/IMG/" + req.body.filename});
		}

		return res.json({Response: "OK", URL: "/IMG/" + req.body.filename});
	})
});

App.listen(PORT, () => {
	Models.Users.UsersModel.find({Email: "admin"}).then((data) => {
		if (data.length === 0) {
			console.error("Not found admin user");
			console.log("Create admin user...");
			Models.Users.UsersModel.AddUser({
				_email: "admin",
				_pass: "admin",
				_name: "admin",
			}).then(() => {
				console.log("Add admin user\nLogin: admin\nPassword: admin");
			});
		}
	});
	console.log("Server started on port " + PORT);
});