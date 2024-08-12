import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
  res.render("pages/index.ejs");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});