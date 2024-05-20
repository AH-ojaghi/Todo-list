"use strict";
import * as Redux from "https://unpkg.com/redux@latest/dist/redux.browser.mjs";
import {
  addTodo,
  removeTodo,
  doTodo,
  filterAllTodos,
  filterCompletedTodos,
  filterIncompletedTodos,
} from "../Redux/actions.js";
import {
  addTodoAction,
  removeTodoAction,
  doTodoAction,
} from "../Redux/actionCreators.js";

//Elements
const addTodoBtn = document.querySelector(".todo-button");
const inputValue = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const filterTodos = document.querySelector(".filter-todo");

// Create Todolist Reducer
function todolistReducer(state = [], action) {
  switch (action.type) {
    case addTodo: {
      const newState = [...state];
      const newTodo = {
        id: crypto.randomUUID(),
        title: action.title,
        isCompleted: false,
      };
      newState.push(newTodo);
      return newState;
    }
    case removeTodo: {
      const newState = [...state];
      const newTodosList = newState.filter((data) => data.id !== action.id);
      return newTodosList;
    }
    case doTodo: {
      const newState = [...state];
      newState.forEach((data) => {
        if (data.id === action.id)
          return (data.isCompleted = !data.isCompleted);
      });
    }
    default: {
      return state;
    }
  }
}

// Create Store
const store = Redux.createStore(todolistReducer);

// remove todo
const removeTodoHandler = function (todoId) {
  store.dispatch(removeTodoAction(todoId));
  generationDomTodo(store.getState());
};
window.removeTodoHandler = removeTodoHandler;

// Completed todo
const completedTodo = function (todoId) {
  store.dispatch(doTodoAction(todoId));
  generationDomTodo(store.getState());
};
window.completedTodo = completedTodo;

// Add todo
const generationDomTodo = function (todo) {
  todoList.innerHTML = "";
  todo.forEach((data) => {
    todoList.insertAdjacentHTML(
      "beforeend",
      `<div class = 'todo ${data.isCompleted && "completed"}'>
    <li class = 'todo-item'>
    ${data.title}
    </li>
    <button class = 'complete-btn' onclick =completedTodo('${data.id}')>
    <i class = 'fas fa-check-circle'></i>
    <button>
    <button class = 'trash-btn' onclick =removeTodoHandler('${data.id}')>
    <i class = 'fas fa-trash'></i>
    <button>
    </div>`
    );
  });
};
addTodoBtn.addEventListener("click", function (e) {
  e.preventDefault();
  store.dispatch(addTodoAction(inputValue.value.trim()));
  const getTodo = store.getState();
  inputValue.value = "";
  generationDomTodo(getTodo);
});

// Filter todo

filterTodos.addEventListener("change", function (event) {
  const filterType = event.target.value;
  if (filterType === "all") {
    const allTodo = store.getState();
    generationDomTodo(allTodo);
  }
  if (filterType === "completed") {
    const completedTodo = store.getState().filter((data) => data.isCompleted);
    generationDomTodo(completedTodo);
  }
  if (filterType === "incomplete") {
    const inCompletedTodo = store
      .getState()
      .filter((data) => !data.isCompleted);
    generationDomTodo(inCompletedTodo);
  }
});
