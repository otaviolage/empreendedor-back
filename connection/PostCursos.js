async function PostCursos(conn, curso) {
    const sql = 'insert into plataformaempreendedor.Cursos (sku, name, imageUrl, price, vendor) Values (?, ?, ?, ?,?);';
    const values = [curso.sku, curso.name, curso.imageUrl, curso.price, curso.vendor];
    return await conn.query(sql, values);
}

module.exports = PostCursos;