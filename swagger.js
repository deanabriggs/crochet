// Require resources
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Crochet Projects API",
    description: "Crochet Projects API",
  },
  host: "crochet-1wd1.onrender.com",
  schemes: ["https", "http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// generates swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
