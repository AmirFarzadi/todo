import { defineStore } from "pinia";
export const useTodosStore = defineStore("todos", {
  state: () => ({
    todos: [],
  }),
  actions: {
    setTodo(todo) {
      this.todos.push(todo);
    },
    deleteTodo(todoId) {
      const todosFilterd = this.todos.filter((e) => {
        return e.id !== todoId;
      });
      this.todos = todosFilterd;
    },
    checkedTodo(todoId) {
      this.todos.forEach((element) => {
        element.id === todoId ? (element.isDone = !element.isDone) : "";
      });
    },
  },
  persist: true,
});
