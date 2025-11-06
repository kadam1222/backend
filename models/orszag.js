const db = require('../config/db');

class Orszag {
  static async getAll() {
    try {
      const [rows] = await db.query('SELECT * FROM orszagok');
      return rows;
    } catch (err) {
      throw err; // hibát a controller fogja kezelni
    }
  }

  static async filter(cim,kiado) {
    try{
      const feltetelek_sql = []
      const feltetelek_parameter = []

      if(cim){
        feltetelek_sql.push("CIM LIKE ?")
        feltetelek_parameter.push(`%${cim}%`)
      }
      if(kiado){
        feltetelek_sql.push("kiado LIKE ?")
        feltetelek_parameter.push(`%${kiado}%`)
      }

      const sikeres = feltetelek_sql.length ? "WHERE " + feltetelek_sql.join(" AND ") : ""
      const [rows] = await db.query('SELECT * FROM ');
      return rows
    }
    catch (err) {
      console.error(err)
      throw err; // hibát a controller fogja kezelni
    }
  }
}

module.exports = Orszag;
