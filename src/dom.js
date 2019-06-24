/* eslint-disable class-methods-use-this */
import checkPic from './img/check.png';
import deletePic from './img/delete.png';

export default class Dom {
  constructor() {
    this.toDoInput = document.querySelector('#to_do_input');
    this.toDoList = document.querySelector('#to_do_list');
  }

  localStorageCreate() {
    if (!localStorage.getItem('Todo')) {
      localStorage.setItem('Todo', JSON.stringify({ 'list': [] }));
    } else {
      const toDoArr = this.getLocalStorage().list;
      if (toDoArr.length) {
        toDoArr.forEach(element => {
          const liId = element.id;

          this[liId] = {
            'value': element.value,
            'check': element.check,
            'id': liId
          }

          const toDoItem = this.addNewElement(this.toDoList, 'li');
          toDoItem.className = 'to_do_item';
          toDoItem.setAttribute('li_id', `${liId}`);
          const checkBoxBtn = this.addNewElement(toDoItem, 'button');
          const checkImg = this.addNewElement(checkBoxBtn, 'img');
          checkImg.src = checkPic;
          const textDiv = this.addNewElement(toDoItem, 'div');
          const deleteButton = this.addNewElement(toDoItem, 'button');
          deleteButton.className = 'button_delete';
          const deleteImg = this.addNewElement(deleteButton, 'img');
          deleteImg.className = 'img_delete';
          deleteImg.src = deletePic;
          if (element.check) {
            checkBoxBtn.className = 'check_box check_box_checked';
            checkImg.className = 'img_check img_checked';
            textDiv.className = 'to_do_text to_do_text_checked';
          } else {
            checkBoxBtn.className = 'check_box';
            checkImg.className = 'img_check';
            textDiv.className = 'to_do_text';
          }

          textDiv.innerText = element.value;

          checkBoxBtn.onclick = () => {
            if (!checkBoxBtn.classList.contains('check_box_checked')) {
              checkBoxBtn.classList.add('check_box_checked')
              checkImg.classList.add('img_checked');
              textDiv.classList.add('to_do_text_checked');
              this[liId].check = true;
              const localStorageCheck = this.getLocalStorage();
              localStorageCheck.list.forEach(elementLocal => {
                if (elementLocal.id === liId) {
                  // eslint-disable-next-line no-param-reassign
                  elementLocal.check = true;
                }
                this.setLocalStorage(localStorageCheck);
              });
            } else {
              checkBoxBtn.classList.remove('check_box_checked')
              checkImg.classList.remove('img_checked');
              textDiv.classList.remove('to_do_text_checked');
              this[liId].check = false;
              const localStorageCheck = this.getLocalStorage();
              localStorageCheck.list.forEach(elementLocal => {
                if (elementLocal.id === liId) {
                  // eslint-disable-next-line no-param-reassign
                  elementLocal.check = false;
                }
                this.setLocalStorage(localStorageCheck);
              });
            }
          };

          deleteButton.onclick = () => {
            toDoItem.style.borderRadius = '0 5px 5px 0';
            let translateX = 0;
            new Promise(resolve => {
              const interval = setInterval(() => {
                if (translateX < 100) {
                  translateX += 5;
                  toDoItem.style.transform = `translateX(-${translateX}%)`;
                } else {
                  toDoItem.style.opacity = 0;
                  clearInterval(interval);
                  resolve('animation done');
                }
              }, 20)
            })
              .then(() => {
                const deleteLocalStorageEl = this.getLocalStorage();
                const deletedLocalStorageEl = {
                  'list': deleteLocalStorageEl.list.filter(elementLocal => {
                    return elementLocal.id !== liId;
                  })
                }
                this.setLocalStorage(deletedLocalStorageEl);
                toDoItem.remove();
                delete this[liId];
              });
          };
          toDoItem.classList.add('to_do_item_add_animation');
        })

      }
    }
  }

  getLocalStorage() {
    return JSON.parse(localStorage.getItem('Todo'));
  }

  setLocalStorage(changedData) {
    return localStorage.setItem('Todo', JSON.stringify(changedData));
  }

  addNewElement(parent, element) {
    return parent.appendChild(document.createElement(element));
  }

  createToDoItem() {
    // Добавляем элемент в localStorage
    const id = Date.now()
    const localStorageAddEl = this.getLocalStorage();
    localStorageAddEl.list.push({
      'value': this.toDoInput.value,
      'check': false,
      'id': id
    })
    this.setLocalStorage(localStorageAddEl);

    // Добавляем элемент в class Dom
    this[id] = {
      'value': this.toDoInput.value,
      'check': false,
      'id': id
    }
    console.log(this[id]);

    // Добавляем элемент в html
    const toDoItem = this.addNewElement(this.toDoList, 'li');
    toDoItem.className = 'to_do_item';
    toDoItem.setAttribute('li_id', `${id}`)
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
      if (!checkBoxBtn.classList.contains('check_box_checked')) {
        checkBoxBtn.classList.add('check_box_checked')
        checkImg.classList.add('img_checked');
        textDiv.classList.add('to_do_text_checked');
        this[id].check = true;
        const localStorageCheck = this.getLocalStorage();
        localStorageCheck.list.forEach(element => {
          if (element.id === id) {
            // eslint-disable-next-line no-param-reassign
            element.check = true;
          }
          this.setLocalStorage(localStorageCheck);
        });
      } else {
        checkBoxBtn.classList.remove('check_box_checked')
        checkImg.classList.remove('img_checked');
        textDiv.classList.remove('to_do_text_checked');
        this[id].check = false;
        const localStorageCheck = this.getLocalStorage();
        localStorageCheck.list.forEach(element => {
          if (element.id === id) {
            // eslint-disable-next-line no-param-reassign
            element.check = false;
          }
          this.setLocalStorage(localStorageCheck);
        });
      }
    };

    deleteButton.onclick = () => {
      toDoItem.style.borderRadius = '0 5px 5px 0';
      let translateX = 0;
      new Promise(resolve => {
        const interval = setInterval(() => {
          if (translateX < 100) {
            translateX += 5;
            toDoItem.style.transform = `translateX(-${translateX}%)`;
          } else {
            toDoItem.style.opacity = 0;
            clearInterval(interval);
            resolve('animation done');
          }
        }, 20)
      })
        .then(() => {
          const deleteLocalStorageEl = this.getLocalStorage();
          const deletedLocalStorageEl = {
            'list': deleteLocalStorageEl.list.filter(element => {
              return element.id !== id;
            })
          }
          this.setLocalStorage(deletedLocalStorageEl);
          toDoItem.remove();
          delete this[id];
        });
    };

    toDoItem.classList.add('to_do_item_add_animation');
  }
}
