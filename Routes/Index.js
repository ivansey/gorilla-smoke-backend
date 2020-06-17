let Express = require("express");
let Router = Express.Router();

Router.use(`/frontendapi`, require(`./FrontendAPI/Index`));

module.exports = Router;