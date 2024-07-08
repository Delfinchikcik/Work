const fs = require("fs")
const path = require("path")
const { v4: uuidv4} = require("uuid")

class Todo {
    constructor(text, done) {
        this.id = uuidv4(),
        this.text = text,
        this.done = done
}
static all() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '..', 'db', 'todo.json'),
        'utf-8',
        (e, content) => {
          if (e) {
            reject(e)
          } else {
            resolve(JSON.parse(content))
          }
        }
      )
    })
  }
  async save() {
    const todo = await Todo.all()
    todo.push({
      text: this.text,
      done: this.done,
      id: this.id
    })
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'db', 'todo.json'),
        JSON.stringify(todo),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      )
    })
  }
  static async getById(id) {
    const todo = await Todo.all()
    return todo.find((t) => t.id == id)
  }
  static async update(id, data) {
    const todo = await Todo.all()
    const idx = todo.findIndex((t) => t.id == id)
    const updatedTodo = {
      ...todo[idx],
      ...data         
    };
    todo[idx] = updatedTodo
    await new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'db', 'todo.json'),
        JSON.stringify(todo),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      )
    })
    return updatedTodo
  }

  static async destroy(id) {
    const todo = await Todo.all()
    const idx = todo.findIndex((t) => t.id == id)
    todo.splice(idx, 1)
   await new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'db', 'todo.json'),
        JSON.stringify(todo),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      )
    })
  }
}
module.exports = Todo