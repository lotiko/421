const accepts = require("accepts");
const express = require("express");
const app = express();
const port = 8001;
app.use(express.static("public"));
app.use("/favicon.ico", express.static("public/images/favicon.ico"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
