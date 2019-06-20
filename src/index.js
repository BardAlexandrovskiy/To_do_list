import Dom from './dom';

const dom = new Dom();

dom.toDoInput.addEventListener('keydown', key => {
  if (key.keyCode === 13) {
    dom.createToDoItem();
  }
});
