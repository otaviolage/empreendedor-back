const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const GetCursos = require("./connection/GetCursos");
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

// app.post("/curso", (req, res) => {
//   const curso = req.body;

//   console.log(curso);
//   cursos.push(curso);

//   res.send("Curso is added to the database");
// });

// app.delete("/curso/:isbn", (req, res) => {
//   const isbn = req.params.isbn;

//   cursos = cursos.filter((i) => {
//     if (i.isbn !== isbn) {
//       return true;
//     }

//     return false;
//   });

//   res.send("Curso is deleted");
// });

// app.post("/curso/:isbn", (req, res) => {
//   const isbn = req.params.isbn;
//   const newCurso = req.body;

//   for (let i = 0; i < cursos.length; i++) {
//     let curso = cursos[i];

//     if (curso.isbn === isbn) {
//       cursos[i] = newCurso;
//     }
//   }

//   res.send("Curso is edited");
// });

app.listen(port, () =>
  console.log(`Api de produtos na porta ${port}!`)
);
