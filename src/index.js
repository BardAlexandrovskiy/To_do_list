import Dom from './dom';

const dom = new Dom();

dom.localStorageCreate();

dom.toDoInput.addEventListener('keydown', key => {
  if (key.keyCode === 13 && dom.toDoInput.value.trim() !== '') {
    dom.createToDoItem();
  }
});
