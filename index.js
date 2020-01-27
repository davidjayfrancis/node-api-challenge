const express = require("express");

const actionsRoutes = require("./actions/actionsRoutes.js");
const projectRoutes = require("./projects/projectsRoutes.js");

const app = express();

app.use(express.json());

app.use("/api/actions", actionsRoutes);
app.use("/api/projects", projectRoutes);

app.listen(8000, console.log("Listening on port 8000"));
