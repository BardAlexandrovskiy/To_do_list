import TodoItem from './todoItem';

export default class TodoList {
  constructor() {
    const todoList = JSON.parse(localStorage.getItem('todoList') || '[]');

    this.todoList = todoList.map(
      todo =>
        new TodoItem({
          ...todo,
          ...this.setTodoMethods(),
        })
    );
  }

  updateLocalStorage() {
    localStorage.setItem(
      'todoList',
      JSON.stringify(
        this.todoList.map(({ id, value, checked }) => ({ id, value, checked }))
      )
    );
  }

  createToDoItem(value) {
    this.todoList.push(
      new TodoItem({
        value,
        ...this.setTodoMethods(),
      })
    );
    this.updateLocalStorage();
  }

  setTodoMethods() {
    return {
      onDeleteItem: this.onDeleteItem.bind(this),
      onToggleCheckedItem: this.onToggleCheckedItem.bind(this),
    };
  }

  onDeleteItem(id) {
    this.todoList = this.todoList.filter(item => item.id !== id);
    this.updateLocalStorage();
  }

  onToggleCheckedItem() {
    this.updateLocalStorage();
  }
}
