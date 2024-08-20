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

app.get("/terms-en", (req, res) => {
  res.render("pages/terms-en");
});

app.get("/terms-fr", (req, res) => {
  res.render("pages/terms-fr");
});

app.get("/terms-de", (req, res) => {
  res.render("pages/terms-de");
});

app.get("/check-en", (req, res) => {
  res.render("pages/check-en", { error: null });
});

app.get("/check-fr", (req, res) => {
  res.render("pages/check-fr", { error: null });
});

app.get("/check-de", (req, res) => {
  res.render("pages/check-de", { error: null });
});

app.post("/check-en", (req, res) => {
  handleFileDownload(req, res, 'en');
});

app.post("/check-fr", (req, res) => {
  handleFileDownload(req, res, 'fr');
});

app.post("/check-de", (req, res) => {
  handleFileDownload(req, res, 'de');
});

/** Function to handle file download based on language */
function handleFileDownload(req, res, language) {
  console.log(`POST /check-${language} triggered`);

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
        fileName = "CV-2024-en.pdf"; // Default to English
    }

    const filePath = path.join(__dirname, "public", "assets", "pdf", fileName);

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error("Error during file download:", err);
        res.status(500).send("Internal Server Error - Could not download the file.");
      }
    });

  } else {
    console.log("Authorization failed.");
    res.render(`pages/check-${language}`, { error: "Incorrect password. Please try again." });
  }
}

/**Server */
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});