import { createServer } from "http";
import { PORT } from "./config/index.js";
import { initializeDB } from "./config/init.js";
import app from "./app.js";

const server = createServer(app);

initializeDB();

server.listen(PORT, () => {
  console.log("Server en vivo por el puerto: ", PORT);
});