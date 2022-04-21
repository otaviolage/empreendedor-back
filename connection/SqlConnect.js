const mysql = require("mysql2/promise");

async function SqlConnect(){
  if(global.connection && global.connection.state !== 'disconnected')
      return global.connection;
  
  const connection = await mysql.createConnection("mysql://root:otavio@localhost:3306/PlataformaEmpreendedor");
  console.log("Conectou no MySQL!");
  global.connection = connection;
  return connection;
}

module.exports = SqlConnect;