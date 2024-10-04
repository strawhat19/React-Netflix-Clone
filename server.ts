// ES Lint Ignore Minor Syntax Warnings
// ------------------------------------
/* eslint-disable semi */
/* eslint-disable prefer-const */
/* eslint-disable no-extra-semi */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */

const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;

app.use(express.static("build"));

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
