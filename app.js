import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

let userIsAuthorised = false;

/**Middleware */
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


function passwordCheck(req, res, next) {
  const password = req.body["passwordName"];
  if (password === "cv-kg") {
    userIsAuthorised = true;
  }
  next();
}

app.use(passwordCheck);

/**Routes */
app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/en", (req, res) => {
  res.render("pages/en");
});

app.get("/fr", (req, res) => {
  res.render("pages/fr");
});

app.get("/de", (req, res) => {
  res.render("pages/de");
});

app.get("/terms", (req, res) => {
  res.render("pages/terms");
});

app.get("/check", (req, res) => {
  res.render("pages/check");
});

app.post("/check", (req, res) => {
  if (userIsAuthorised) {
    // If password is correct, download the CV
    const filePath = path.join(__dirname, "public", "assets", "pdf", );
    res.download(filePath, 'cv.pdf');
  } else {
    // If password is incorrect, reload the page with an error message
    res.render("/check", { error: 'Incorrect password. Please try again.' });
  }
});

/**Server */
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
