var express = require('express');
var router = express.Router();
const todo = require("../controllers/todoMetods")

/* GET users listing. */
router.get('/', todo.all);
router.post('/', todo.store);
router.put('/:id', todo.update);
router.delete('/:id', todo.destroy);
router.get('/:id', todo.show);

module.exports = router;
