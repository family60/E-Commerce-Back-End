const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// @ The `/api/tags` endpoint
//find all tags (GET)
router.get('/', (req, res) => {
  Tag.findAll({
    include: [{
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"]
    }]
  }).then(data => res.json(data)).catch(err => {//default err msg
    res.status(500).json(err);
    console.log(err);
  });
});
//find a single tag by its "id" (GET)
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"]
    }
  }).then(data =>{
    if(!data){//if there is no data, rather than displaying nothing, display msg with explanation
      res.status(404).json({message: "Error, no tag with this ID could be found"});
      return;
    }
  }).catch(err =>{//default err msg
    res.status(500).json(err);
    console.log(err);
  });
});
//create a new tag (POST)
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  }).then(data => res.json(data)).catch(err => {//default err msg
    res.status(500).json(err);
    console.log(err);
  });
});
//update a tag's name by its "id" value (PUT)
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(data => {
    if(!data){//if there is no data, rather than displaying nothing, display msg with explanation
      res.status(404).json({message: "Error, no tag with this ID could be found"});
      return;
    }

    res.json(data);

  }).catch(err =>{//default err msg
    res.status(500).json(err);
    console.log(err);
  });
});
//delete on tag by its "id" value (DELETE)
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(data => {
    if(!data){//if there is no data, rather than displaying nothing, display msg with explanation
      res.status(404).json({message: "Error, no tag with this ID could be found"});
      return;
    }

    res.json(data);

  }).catch(err => {//default err msg
    res.status(500).json(err);
    console.log(err);
  });
});

module.exports = router;
