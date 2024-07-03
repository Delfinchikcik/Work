const todoshki =require('../models/todo') 
const all = async (req, res) => {
 const todos = await todoshki.all()
 res.json(todos)
}
const store = async (req, res) => {
    const todo = new todoshki(req.body.text, req.body.done)
    await todo.save()
    res.status(201).json(todo)
   }
   const show = async (req, res) => {
    const todo = await todoshki.getById(req.params.id)
    res.json(todo)
   }
   const update = async (req, res) => {
    const todo = await todoshki.update(req.params.id, req.body)
    res.json(todo)
   }
   const destroy = async (req, res) => {
    await todoshki.destroy(req.params.id)
    res.status(204).send()
   } 
module.exports = { all, store, show, update, destroy  }