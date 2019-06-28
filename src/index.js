import TodoList from './todoList';

const todoList = new TodoList();

const todoInput = document.querySelector('#to_do_input');

todoInput.addEventListener('keydown', key => {
  if (key.keyCode === 13 && todoInput.value.trim()) {
    todoList.createToDoItem(todoInput.value);
    todoInput.value = '';
    todoInput.blur();
  }
});
