// routes/swagger.js

// Requipre resources
const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("../swagger.json");

// Setup route to run swagger interface
router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDoc));

// Export the route
module.exports = router;
