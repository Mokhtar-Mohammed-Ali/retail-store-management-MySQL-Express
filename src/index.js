import express from "express";
import router from "./Routes/routes.js";
const app = express();

app.use(express.json());

app.use("/api", router);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
