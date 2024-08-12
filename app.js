import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const port = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Set the directory for the views (EJS templates)
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define the route for the home page
app.get('/', (req, res) => {
  res.render("pages/index.ejs"); // Renders 'index.ejs' from the 'views' directory
});

// Start the server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
