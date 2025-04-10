const express = require("express");
const mongo = require("./config/db");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/api/roles", require("./routes/role.routes"));
app.use("/api/users", require("./routes/user.routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  mongo();
});
