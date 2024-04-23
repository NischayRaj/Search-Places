const express = require("express");
const bodyParser = require("body-parser");
const searchRoutes = require("./routes/searchRoutes");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = 5000;

app.use(bodyParser.json());
app.use("/api/search", searchRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
