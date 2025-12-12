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

app.get("*", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/api/health", (req: any, res: any) => {
  res.status(200).json({
    status: "ok",
    message: "React Netflix Clone server is running"
  });
});