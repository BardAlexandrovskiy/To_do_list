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
    statusDiv.className = 'status status_no_check';
    const statusImg = addNewElement(statusDiv, 'img');
    statusImg.className = 'status_img status_img_no_check';
    statusImg.src = checkPic;
    const textDiv = addNewElement(paragraphDiv, 'div');
    textDiv.className = 'text';
    const deleteDiv = addNewElement(paragraphDiv, 'div');
    deleteDiv.className = 'delete';
    const deleteImg = addNewElement(deleteDiv, 'img');
    deleteImg.className = 'delete_img';
    deleteImg.src = deletePic;

    textDiv.innerText = this.toDoInput.value;
    this.toDoInput.value = '';
    this.toDoInput.blur();

    statusDiv.onclick = () => {
      if (statusDiv.classList.contains('status_no_check')) {
        statusDiv.className = 'status status_check';
        statusImg.className = 'status_img status_img_check';
        textDiv.className = 'text text_check';
      } else {
        statusDiv.className = 'status status_no_check';
        statusImg.className = 'status_img status_img_no_check';
        textDiv.className = 'text';
      }
    };
    deleteDiv.onclick = () => {
      paragraphDiv.remove();
    }
  }
}
