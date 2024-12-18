import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
app.use(express.static("./dist"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));

  res.status(200);
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
