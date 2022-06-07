const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const GetCursos = require("./connection/GetCursos");
const PostCursos = require("./connection/PostCursos");
const SqlConnect = require("./connection/SqlConnect");

const app = express();
const port = 3001;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/curso", async (req, res) => {
  const conn = await SqlConnect()
  let result = await GetCursos(conn)
  res.json(result);
});

app.post("/curso", async (req, res) => {
  const conn = await SqlConnect()
  const curso = req.body.data;

  await PostCursos(conn, curso)
  res.send("Curso is added to the database");
});

app.listen(port, () =>
  console.log(`Api de produtos na porta ${port}!`)
);
