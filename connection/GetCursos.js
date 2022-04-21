async function GetCursos(conn) {
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

module.exports = GetCursos;