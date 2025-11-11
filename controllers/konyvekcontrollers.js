const konyvek = require('../models/konyvek');

exports.getAllKonyvek = async (req, res) => {
  try {
    const konyvek_all = await konyvek.getAll();
    res.json(konyvek_all); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Hiba történt a könyvek lekérdezésekor (SERVER ERROR)' });
  }
};

exports.getbyISBN = async (req, res) => {
  try {
    const ISBN = req.body.ISBN
    const konyv = await konyvek.getbyISBN(ISBN);
    if(!konyv){
      res.status(404).json({message : "Hiba! Nem találtunk a kérésnek megfelelő terméket!😔"})
    }
    res.json(konyv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Hiba történt a könyvek lekérdezésekor (SERVER ERROR)' });
  }
};

exports.filter = async (req, res) => {
  try {
    
    const cim = req.query.cim
    const kiado = req.query.kiado
    const kategoria = req.query.kat
    const nyelv = req.query.nyelv
    const szerzo = req.query.szerz
    const illusztrator = req.query.illusz
    const konyvek_filter = await konyvek.filter(cim,kiado,kategoria,nyelv,szerzo,illusztrator);
    res.json(konyvek_filter); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Hiba történt a könyvek lekérdezésekor (SERVER ERROR)' });
  }
};

exports.delete = async (req, res) =>{
  try{
      const ISBN = req.params.ISBN
      const success = await konyvek.delete(ISBN)
      if(success){
        res.status(204).json()
      }
      else{
        res.status(404).json({error: 'Nincs ilyen termék'})
     }
  }
    catch(err)
  {
    console.error(err);
    res.status(500).json({ message: 'Hiba történt a könyvek lekérdezésekor (SERVER ERROR)' });
  }
}

