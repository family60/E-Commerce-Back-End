const router = require('express').Router();
const { Category, Product } = require('../../models');

// @ The `/api/categories` endpoint

//find all categories (GET)
router.get('/', (req, res) => {
  
  Category.findAll({
    include: [{
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"]
    }]
  }).then(data => res.json(data)).catch(err => {//default err msg

    res.status(500).json(err);
    console.log(err);
  
  });
});
//find 1 category by its "id" value (GET)
router.get('/:id', (req, res) => {
  
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"]
    }]
  }).then(data => {
    if(!data){//if there is no data, rather than displaying nothing, display msg with explanation
      res.status(404).json({message: "Error, no category with this ID can be found"});
      return;
    }

    res.json(data);

  }).catch(err => {//default err msg
    res.status(500).json(err);
    console.log(err);
  });
});
//create a new category (POST)
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  }).then(data => res.json(data)).catch(err => {//default err msg

    res.status(500).json(err);
    console.log(err);
  
  });
});
//update a category by its "id" value (PUT)
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(data => {
    
    if((!data) || (!data[0])){//if data is empty or id is empty
      res.status(404),json({message: "Error, no category with this ID can be found"});
      return;
    }

    res.json(data);

  }).catch(err => {//default err msg
    res.status(500).json(err);
    console.log(err);
  });
});
//delete a category by its "id" value (DELETE)
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(data => {
    if(!data){//if there is no data, rather than displaying nothing, display msg with explanation
      res.status(404).json({message: "Error, no category with this ID can be found"});
      return;
    }

    res.json(data);

  }).catch(err =>{//default err msg
    res.status(500).json(err);
    console.log(err);
  });
});

module.exports = router;
