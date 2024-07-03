<template>
  <div class="container">
    <h1 class="title">Todoshki</h1>
    <form @submit.prevent="createTodo">
      <input v-model="name" class="input_area" type="text" />
    </form>
    <ul class="list-group">
      <div v-for="todo in todos" :key="todo.id" :class="{bg_color: todo.done}">
        {{ todo.text }} <button class="deleteBtn" @click="deleteTodo(todo.id)">Удалить</button
        ><button @click="changeDone(todo.id)"> {{ todo.done ? 'Отменить выполнение' : 'Выполнить' }}</button>
      </div>
    </ul>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";

export default {
  name: "TodoApp",
  setup() {
    const todos = ref([]);
    const name = ref("");

    const fetchTodos = async () => {
      const response = await fetch("http://localhost:3000/todo/");
      const result = await response.json();
      todos.value = result;
    };

    const createTodo = async () => {
      if (name.value !== "") {
        const todo = { text: name.value, done: false };
        const res = await fetch("http://localhost:3000/todo/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(todo),
        });
        name.value = "";
        const newTodo = await res.json();
        todos.value.push(newTodo);
        console.log(newTodo);
      }
    };
    const deleteTodo = async (id) => {
      await fetch(`http://localhost:3000/todo/${id}`, {
        method: "DELETE",
      });
      todos.value = todos.value.filter((todo) => todo.id !== id);
    };

    const changeDone = async (id) => {
      const todo = todos.value.find(todo => todo.id === id);
      const res = await fetch(`http://localhost:3000/todo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...todo, done: !todo.done }),
      });
      const updatedTodo = await res.json();
      todo.done = updatedTodo.done;
    };

    onMounted(fetchTodos);

    return {
      todos,
      name,
      createTodo,
      deleteTodo,
      changeDone,
    };
  },
};
</script>

<style>
.container {
  width: 100%;
  margin: 0 auto;
  font-size: 40px;
}
.input_area {
  width: 100%;
  height: 40px;
}
title {
  margin: 0 auto;
}
.bg_color{
  background-color: greenyellow;
}
.deleteBtn{
  background-color: red;
}
</style>
