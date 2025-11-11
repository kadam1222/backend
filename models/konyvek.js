const db = require('../config/db');

class Konyvek {
  static async getAll() {
    try {
      const [rows] = await db.query('SELECT * FROM osszes_konyv');
      return rows;
    } catch (err) {
      throw err;
    }
  }

  static async getbyISBN(ISBN) {
    try {
      const [rows] = await db.query('SELECT * FROM osszes_konyv where ISBN LIKE ?', [ISBN]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  static async filter(cim,kiado,kat,nyelv,szerzo,illusztrator) {
      try{
        const feltetelek_sql = []
        const feltetelek_parameter = []
  
        if(cim){
          feltetelek_sql.push("CIM LIKE ?")
          feltetelek_parameter.push(`%${cim}%`)
        }
        if(kiado){
          feltetelek_sql.push("kiado_nev LIKE ?")
          feltetelek_parameter.push(`%${kiado}%`)
        }
        if(kat){
          feltetelek_sql.push("kat_nev LIKE ?")
          feltetelek_parameter.push(`%${kat}%`)
        }
        if(nyelv){
          feltetelek_sql.push("nyelv_nev LIKE ?")
          feltetelek_parameter.push(`%${nyelv}%`)
        }
        if(szerzo){
          feltetelek_sql.push("szerzok LIKE ?")
          feltetelek_parameter.push(`%${szerzo}%`)
        }
        if(illusztrator){
          feltetelek_sql.push("illusztratorok LIKE ?")
          feltetelek_parameter.push(`%${illusztrator}%`)
        }
  
        const sikeres = feltetelek_sql.length ? "WHERE " + feltetelek_sql.join(" AND ") : ""
        const [rows] = await db.query(`SELECT * FROM osszes_konyv ${sikeres}`, feltetelek_parameter);
        return rows
      }
      catch (err) {
        console.error(err)
        throw err; 
      }
    }

    static async delete(ISBN) {
    try{
      await db.query('DELETE FROM kapcsolo_fordito WHERE ISBN = ?', [ISBN]);
      await db.query('DELETE FROM kapcsolo_illusztrator WHERE ISBN = ?', [ISBN]);
      await db.query('DELETE FROM kapcsolo_szerzo WHERE ISBN = ?', [ISBN]);
      const [result] = await db.query('DELETE FROM termek WHERE ISBN = ?', [ISBN]);

    return result.affectedRows > 0;
    }
    catch(error){
        console.error(error)
        throw error;
    }

    
  }

  
}

module.exports = Konyvek;
