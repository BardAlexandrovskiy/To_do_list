import checkPic from './img/check.png';
import deletePic from './img/delete.png';

export default class Dom {
  constructor() {
    this.toDoInput = document.querySelector('#to_do_input');
    this.toDoListDiv = document.querySelector('#to_do_list');
  }

  createToDoItem() {
    function addNewElement(parent, element) {
      return parent.appendChild(document.createElement(element));
    }
    const paragraphDiv = addNewElement(this.toDoListDiv, 'li');
    paragraphDiv.className = 'paragraph';
    const statusDiv = addNewElement(paragraphDiv, 'div');
    statusDiv.className = 'button_check button_no_checked';
    const statusImg = addNewElement(statusDiv, 'img');
    statusImg.className = 'img img_no_checked';
    statusImg.src = checkPic;
    const textDiv = addNewElement(paragraphDiv, 'div');
    textDiv.className = 'text';
    const deleteDiv = addNewElement(paragraphDiv, 'div');
    deleteDiv.className = 'button_delete';
    const deleteImg = addNewElement(deleteDiv, 'img');
    deleteImg.className = 'img';
    deleteImg.src = deletePic;

    textDiv.innerText = this.toDoInput.value;
    this.toDoInput.value = '';
    this.toDoInput.blur();

    statusDiv.onclick = () => {
      if (statusDiv.classList.contains('button_no_checked')) {
        statusDiv.className = 'button_check button_checked';
        statusImg.className = 'img img_checked';
        textDiv.className = 'text text_checked';
      } else {
        statusDiv.className = 'button_check button_no_checked';
        statusImg.className = 'img img_no_checked';
        textDiv.className = 'text';
      }
    };
    deleteDiv.onclick = () => {
      paragraphDiv.remove();
    };
  }
}
