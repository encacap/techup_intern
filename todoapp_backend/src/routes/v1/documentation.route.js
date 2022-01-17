const express = require("express");
const swaggerUI = require("swagger-ui-express");

const swaggerDocs = require("../../docs");

const router = express.Router();

router.use(
    "/",
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocs, {
        customSiteTitle: "Todo APIs",
    })
);

module.exports = router;
