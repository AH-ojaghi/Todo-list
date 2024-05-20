import {
  addTodo,
  removeTodo,
  doTodo,
  filterAllTodos,
  filterCompletedTodos,
  filterIncompletedTodos,
} from "./actions.js";

const addTodoAction = function (title) {
  return {
    type: addTodo,
    title,
  };
};
const removeTodoAction = function (id) {
  return {
    type: removeTodo,
    id,
  };
};
const doTodoAction = function (id) {
  return {
    type: doTodo,
    id,
  };
};

export { addTodoAction, removeTodoAction, doTodoAction };
