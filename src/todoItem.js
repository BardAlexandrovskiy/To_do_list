/* eslint-disable class-methods-use-this */
import checkPic from './img/check.png';
import deletePic from './img/delete.png';

export default class TodoItem {
  constructor({ id, checked, value, onDeleteItem, onToggleCheckedItem }) {
    this.id = id || Date.now();
    this.checked = !!checked;
    this.value = value;
    this.onDeleteItem = onDeleteItem;
    this.onToggleCheckedItem = onToggleCheckedItem;

    const toDoList = document.querySelector('#to_do_list');

    const toDoItem = this.addNewElement(toDoList, 'li');
    toDoItem.className = 'to_do_item';
    toDoItem.setAttribute('li_id', `${this.id}`);
    const checkBoxBtn = this.addNewElement(toDoItem, 'button');
    checkBoxBtn.className = 'check_box';
    const checkImg = this.addNewElement(checkBoxBtn, 'img');
    checkImg.className = 'img_check';
    checkImg.src = checkPic;
    const textDiv = this.addNewElement(toDoItem, 'div');
    textDiv.className = 'to_do_text';
    const deleteButton = this.addNewElement(toDoItem, 'button');
    deleteButton.className = 'button_delete';
    const deleteImg = this.addNewElement(deleteButton, 'img');
    deleteImg.className = 'img_delete';
    deleteImg.src = deletePic;

    textDiv.innerText = value;
    checkBoxBtn.onclick = this.toggleCheck.bind(this);
    deleteButton.onclick = this.deleteItem.bind(this);

    this.toDoList = toDoList;
    this.toDoItem = toDoItem;
    this.checkBoxBtn = checkBoxBtn;
    this.checkImg = checkImg;
    this.textDiv = textDiv;
    this.deleteButton = deleteButton;

    if (checked) this.toggleCheck(false);
  }

  addNewElement(parent, element) {
    return parent.appendChild(document.createElement(element));
  }

  toggleCheck(withHook = true) {
    if (!this.checkBoxBtn.classList.contains('check_box_checked')) {
      this.checkBoxBtn.classList.add('check_box_checked');
      this.checkImg.classList.add('img_checked');
      this.textDiv.classList.add('to_do_text_checked');
      this.checked = true;
    } else {
      this.checkBoxBtn.classList.remove('check_box_checked');
      this.checkImg.classList.remove('img_checked');
      this.textDiv.classList.remove('to_do_text_checked');
      this.checked = false;
    }
    if (withHook) {
      this.onToggleCheckedItem();
    }
  }

  deleteItem() {
    this.toDoItem.style.borderRadius = '0 5px 5px 0';
    let translateX = 0;
    const interval = setInterval(() => {
      if (translateX < 100) {
        translateX += 5;
        this.toDoItem.style.transform = `translateX(-${translateX}%)`;
      } else {
        clearInterval(interval);
        this.toDoItem.remove();
        this.onDeleteItem(this.id);
      }
    }, 20);
  }
}
