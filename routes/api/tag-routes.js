const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {model: Product},
      ],
    });
    if (!tagData) {
      res.status(404).json({message: 'No tag found by that ID'});
    }
    res.status(200).json(tagData);

  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  // create a new tag
  /**req.body should look like: 
   * {
   * tag_name: "..."
   * }
   * 
   */
  try {
    const tagData = await Tag.create(req.body)
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(
      { tagName: req.body.tag_name}, 
      { where: {
        id: req.params.id
        }
      }
    );
    if (!tagData) {
      res.status(404).json({message: 'No tag found by that ID'})
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destory({
      where: {id: req.params.id}
    });
    if (!tagData) {
      res.status(404).json({message: 'No tag found by that ID'})
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
