<template>
<div class="container d-flex flex-column justify-content-between bg-light p-4" style="width: 700px;">
  <div id="header" class="bg-primary py-1">
    <h2 class="text-center text-light m-0">Todo</h2>
  </div>
  <div id="AddTodoConatiner" class="d-flex align-items-center justify-content-between my-3">
    <input type="text" placeholder="Please enter new todo..." class="w-75 p-2 rounded" v-model="newTodo">
    <button class="btn btn-primary px-4" @click="addBtnHandler">Add</button>
  </div>
  <div id="todo-list">
    <ul class="list-group" >

      <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(todo,index) in todos" :key="index" :class="todo.isDone ? 'bg-silver' :'bg-light '">
        <h4 id="todoName" class="m-0" :class="todo.isDone ? 'line-through text-muted ' : ''">{{ todo.title }}</h4>
        <div id="icons">
          <span class="px-2 py-1 rounded me-2" :class="todo.isDone ? 'bg-secondary' : 'bg-success'" @click="checkedTodo(todo.id)">
            <i class="bi  text-light" :class="todo.isDone ? 'bi-arrow-counterclockwise' : 'bi-check-lg'"></i>
          </span>
          <span class="bg-danger px-2 py-1 rounded" @click="deleteTodo(todo.id)">
            <i class="bi bi-trash3-fill text-light"></i>
          </span>
        </div>
      </li>

    </ul>
  </div>
</div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const newTodo = ref(null)
const todos = ref([])
function addBtnHandler(){
  const time = new Date()
  const todoDetail = {
    id : time.getTime(),
    title:newTodo.value,
    isDone: false
  }
  todos.value.push(todoDetail)
  localStorage.setItem("todos",JSON.stringify(todos.value))
  newTodo.value = ""
  
}
onMounted (()=>{
  loadData()
})

function deleteTodo (id){
  const todosFilterd = JSON.parse(localStorage.getItem("todos")).filter(e => {return e.id !== id})
  localStorage.setItem("todos",JSON.stringify(todosFilterd))
  loadData()
}
function loadData (){
  todos.value = []
  todos.value =JSON.parse(localStorage.getItem("todos"))
  // Object.assign(todos.value ,JSON.parse(localStorage.getItem("todos")))
}

function checkedTodo(id){
  const todoList =  getTodos()
  todoList.forEach(element => {
    element.id === id ? element.isDone = !element.isDone : ""
  });
  localStorage.setItem("todos",JSON.stringify(todoList))
  loadData()
}
function getTodos(){
  return JSON.parse(localStorage.getItem("todos"))
}
</script>

<style>
body{
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bg-silver {
  background-color: #eee !important;
}
.line-through {
  position: relative;
}
.line-through::after {
  content: "";
  width: 100%;
  position: absolute;
  height: 1px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: red;
}
</style>
