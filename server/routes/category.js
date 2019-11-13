const express = require('express');
const router = express.Router();

const Category = require('../models/Category');

router.get('/categories', async (req, res) => {
  let categoriesArr = [];

  try {
    const categories = await Category.find();

    for (let i = 0; i < categories.length; i++) {
      categoriesArr.push({
        url: categories[i].url,
        name: categories[i].name,
      });
    }

    res.status(200).json({
      categoriesArr: categoriesArr
    });

  } catch (err) {
    console.log(err)
  }
});

/*
router.post('/categories', async (req, res) => {
  try {
    const categories = new Category({

    })
  }
});
*/

module.exports = router;