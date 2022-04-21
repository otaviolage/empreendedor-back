const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const port = 3001;


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/curso", (req, res) => {
  const curso = req.body;

  console.log(curso);
  cursos.push(curso);

  res.send("Curso is added to the database");
});

app.get("/curso", async (req, res) => {
  const conn = await connect()
  let result = await getData(conn)
  console.log(2, result)
  res.json(result);
});

async function getData(conn) {
  let cursos = []
  const [rows] = await conn.query('Select * from Cursos;');
  
  for (let row of rows) {
    cursos = [
      ...cursos,
      {

        sku: row.sku,
        name: row.name,
        imageUrl: row.imageUrl,
        availability: {
          price: row.price
        },
        vendor: {
          id: 62,
          name: row.vendor
        }
      }
    ]
  }

  return cursos;
}

async function connect(){
  if(global.connection && global.connection.state !== 'disconnected')
      return global.connection;
  
  const connection = await mysql.createConnection("mysql://root:otavio@localhost:3306/PlataformaEmpreendedor");
  console.log("Conectou no MySQL!");
  global.connection = connection;
  return connection;
}

app.delete("/curso/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  cursos = cursos.filter((i) => {
    if (i.isbn !== isbn) {
      return true;
    }

    return false;
  });

  res.send("Curso is deleted");
});

app.post("/curso/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const newCurso = req.body;

  for (let i = 0; i < cursos.length; i++) {
    let curso = cursos[i];

    if (curso.isbn === isbn) {
      cursos[i] = newCurso;
    }
  }

  res.send("Curso is edited");
});

app.listen(port, () =>
  console.log(`Api de produtos na porta ${port}!`)
);
