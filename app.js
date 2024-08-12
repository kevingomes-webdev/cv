import express from "express";
import path from "path";
import { fileURLToPath } from "url";

/**const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 */
const app = express();



app.use(express.static("public"));

app.set("view engine", "ejs");
/*app.set("views", path.join(__dirname, "views"));*/


app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/gb", (req, res) => {
    res.render("pages/gb");
});

app.get("/fr", (req, res) => {
    res.render("pages/fr");
});

app.get("/de", (req, res) => {
    res.render("pages/de");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
