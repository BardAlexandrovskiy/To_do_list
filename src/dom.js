import checkPic from './img/check.png';
import deletePic from './img/delete.png';

export default class Dom {
  constructor() {
    this.toDoInput = document.querySelector('#to_do_input');
    this.toDoList = document.querySelector('#to_do_list');
  }

  // eslint-disable-next-line class-methods-use-this
  addNewElement(parent, element) {
    return parent.appendChild(document.createElement(element));
  }

  createToDoItem() {
    const toDoItem = this.addNewElement(this.toDoList, 'li');
    toDoItem.className = 'to_do_item';
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

    textDiv.innerText = this.toDoInput.value;
    this.toDoInput.value = '';
    this.toDoInput.blur();

    checkBoxBtn.onclick = () => {
      console.log(checkBoxBtn.classList.contains('check_box_checked'))
      if (!checkBoxBtn.classList.contains('check_box_checked')) {
        checkBoxBtn.classList.add('check_box_checked')
        checkImg.classList.add('img_checked');
        textDiv.classList.add('to_do_text_checked');
      } else {
        checkBoxBtn.classList.remove('check_box_checked')
        checkImg.classList.remove('img_checked');
        textDiv.classList.remove('to_do_text_checked');
      }
    };
    deleteButton.onclick = () => {
      let opacity = 1;
      let translateX = 0;
      let translateY = 0;
      new Promise(resolve => {
        const interval = setInterval(() => {
          if (opacity > 0) {
            opacity -= 0.15;
            translateX += 5;
            translateY += 5;
            toDoItem.style.opacity = opacity;
            toDoItem.style.transform = `translate(${translateX}%, -${translateY}px)`;
          } else {
            clearInterval(interval);
            resolve('animation done');
          }
        }, 20);
      }).then(() => toDoItem.remove());
    };
    toDoItem.classList.add('to_do_item_add_del_animation');
  }
}
