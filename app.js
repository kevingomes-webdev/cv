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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());  // Add this line


function passwordCheck(req, res, next) {
  const password = req.body["passwordName"];
  if (password === "finance") {
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
  const language = req.query.lang || 'en'; // Default to English if no language is specified
  res.render("pages/check", { error: null, language });
});

app.post("/check", (req, res) => {
  console.log("POST /check triggered");

  if (userIsAuthorised) {
    console.log("Request body:", req.body);

    let fileName;
    switch (language) {
      case 'en':
        fileName = "CV-2024-en.pdf";
        break;
      case 'fr':
        fileName = "CV-2024-fr.pdf";
        break;
      case 'de':
        fileName = "CV-2024-de.pdf";
        break;
      default:
        fileName = "CV-2024-en.pdf"; // Default to English if language is unknown
    }

    // If password is correct, download the CV
    const filePath = path.join(__dirname, "public", "assets", "pdf", fileName);
    res.download(filePath, fileName);
  } else {
    console.log("Authorization failed.");
    // If password is incorrect, reload the page with an error message
    res.render("pages/check", { error: "Incorrect password. Please try again." });
  }
});

/**Server */
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});