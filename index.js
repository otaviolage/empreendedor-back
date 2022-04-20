const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const port = 3001;

let cursos = [
  {
    sku: "d9059f0f492f4d71a2b4",
    name: "CURSO FINANÇAS",
    imageUrl:
      "https://codegate01.com/wp-content/uploads/2020/05/curso-html.jpg",
    availability: {
      price: 40,
    },
    vendor: {
      id: 62,
      name: "Udemy",
    },
  },
  {
    sku: "dbd6272add8d42199134",
    name: "CURSO CONTABILIDADE",
    imageUrl:
      "https://oraculoti.com.br/wp-content/uploads/2018/06/Curso-JavaScript-Completo-com-6-Projetos-Reais.jpg",
    availability: {
      price: 40,
    },
    vendor: {
      id: 62,
      name: "Alura",
    },
  },
  {
    sku: "8608e689982e49d58a8e",
    name: "CURSO DE RH",
    imageUrl:
      "https://jornadadodev.com.br/sites/default/files/cursos/curso-css3.jpg",
    availability: {
      price: 40,
    },
    vendor: {
      id: 62,
      name: "DevMedia",
    },
  },
  {
    sku: "8608e689982e49d58a8e",
    name: "CURSO DE RH",
    imageUrl:
      "https://jornadadodev.com.br/sites/default/files/cursos/curso-css3.jpg",
    availability: {
      price: 40,
    },
    vendor: {
      id: 62,
      name: "DevMedia",
    },
  },
];

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
  res.json(cursos);
});

async function getData(conn) {
  const [rows] = await conn.query('Select * from Cursos;');
  return rows;
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
