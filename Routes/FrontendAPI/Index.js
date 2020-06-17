let _router = require("express").Router();

_router.use(`/users`, require(`./Users`));
_router.use(`/users/auth`, require(`./AuthUsers`));
_router.use(`/items`, require(`./Items`));

module.exports = _router;