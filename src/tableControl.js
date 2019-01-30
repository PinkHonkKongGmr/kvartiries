// группа переменных для управления контентной таблицей
var main_items_wrapper = document.querySelector('.main_items');
var main_items = document.querySelectorAll('.mainItem');
var showMore = document.querySelector('.showMore');
var smButton = document.querySelector('.showMore button');
var sortPrice = document.querySelector('.sortPrice');
var sortRooms = document.querySelector('.sortRooms');
// переменная для хранения данных с сервера и последующего сравнения. Если данных много то это будет забивать память, но на данном примре сойдёт
var dataTemp = [];
// индикатор сортировки(по увеличению или по уменьшению )
var lessToMore = true;
var priceUP = document.querySelector('.sortPrice .up');
var priceDown = document.querySelector('.sortPrice .down');
var roomUP = document.querySelector('.sortRooms .up');
var roomDown = document.querySelector('.sortRooms .down');
var flatStatuses = [
  ["свободно", 'free'],
  ["забронировано", 'book'],
  ["продано", 'bought']
]
// --------------конец группы-----------------------

// Создаём класс-конструктор элементов таблицы
class tableBuilder {
  constructor(element) {
    this.element = element;
  }

  renew(atPr, arRm) {
    this.element.setAttribute('data-price', atPr);
    this.element.setAttribute('data-rooms', arRm);
    this.element.classList.add('jsonData');
  }

  pictureControl(image) {

    for (let i = 0; i < this.element.childNodes.length; i++) {
      if (this.element.childNodes[i].className === 'imgBox') {
        this.element.childNodes[i].firstChild.src = image;
      }
    }
  }

  charBoxControl(ch1, ch2, ch3) {
    for (let i = 0; i < this.element.childNodes.length; i++) {

      if (this.element.childNodes[i].className === 'charBox') {
        let parent = this.element.childNodes[i];
        for (let i = 0; i < parent.childNodes.length; i++) {
          if (parent.childNodes[i].className === 'finish') {
            parent.childNodes[i].innerHTML = ch1;
          }
          if (parent.childNodes[i].className === 'sq') {
            parent.childNodes[i].innerHTML = ch2;
          }
          if (parent.childNodes[i].className === 'floor') {
            parent.childNodes[i].innerHTML = ch3;
          }
        }
      }
    }
  }

  nameControl(name) {
    for (let i = 0; i < this.element.childNodes.length; i++) {
      if (this.element.childNodes[i].className === 'flatName') {
        this.element.childNodes[i].innerHTML = name;
      }
    }
  }
  priceControl(price) {
    for (let i = 0; i < this.element.childNodes.length; i++) {
      if (this.element.childNodes[i].className === 'price') {
        this.element.childNodes[i].innerHTML = price;
      }
    }
  }
  bottomControl(status) {
    for (let i = 0; i < this.element.childNodes.length; i++) {
      if (this.element.childNodes[i].className === 'btn') {
        this.element.childNodes[i].innerHTML = status;
      }
    }
  }
  classControl(compare, arr) {
    for (let status of arr) {
      if (compare == status[0]) {
        this.element.classList.add(status[1]);
      }
    }
  }
}

// БЛОК КОНТРОЛЯ ТАБЛИЦЫ
// обновления таблицы
function refresh(elColl, elArr) {
  for (var i = 0; i < elColl.length; i++) {
    elColl[i].parentNode.removeChild(elColl[i]);
  }
  for (var _i = 0; _i < main_items.length; _i++) {
    main_items_wrapper.insertBefore(elArr[_i], showMore);
  }
}

// сортировка
function sortCards(type) {
  var mainItems_all = document.querySelectorAll('.mainItem');
  var elements = [].slice.call(mainItems_all);
  elements.sort(function(a, b) {
    if (lessToMore) {
      return a.getAttribute(type) - b.getAttribute(type);
    }
    if (!lessToMore) {
      return b.getAttribute(type) - a.getAttribute(type);
    }
  });
  refresh(mainItems_all, elements);
}

sortPrice.onclick = function() {
  if (lessToMore) {
    lessToMore = false;
    priceUP.classList.add('hide');
    priceDown.classList.remove('hide');
    sortCards('data-price');
    return;
  }
  if (!lessToMore) {
    lessToMore = true;
    priceUP.classList.remove('hide');
    priceDown.classList.add('hide');
    sortCards('data-price');
    return;
  }
};

sortRooms.onclick = function() {
  if (lessToMore) {
    lessToMore = false;
    roomUP.classList.add('hide');
    roomDown.classList.remove('hide');
    sortCards('data-rooms');
    return;
  }
  if (!lessToMore) {
    lessToMore = true;
    roomUP.classList.remove('hide');
    roomDown.classList.add('hide');
    sortCards('data-rooms');
    return;
  }
};

// подгрузка данных
fetch('./goods.json').then(function(response) {
  return response.json();
}).then(function(data) {

  smButton.onclick = function() {
    let dataCont = data.products;
    // проверяем обновились ли данные

    if (dataCont == dataTemp) {
      var cards = document.querySelectorAll('.jsonData');
      for (let card of cards) {
        card.classList.toggle('hide');
      }
    }
    // если нет то скрываем-показываем

    if (
      // если обновились то обновляем)
      dataCont != dataTemp) {
      dataTemp = data.products;
      for (let flat of data.products) {
        let item = document.querySelector('.mainItem').cloneNode(true);
        let itemoperations = new tableBuilder(item);
        itemoperations.renew(flat.price, flat.rooms);
        itemoperations.pictureControl(flat.image);
        itemoperations.charBoxControl(flat.finish, flat.sq, flat.floor);
        itemoperations.nameControl(flat.name);
        itemoperations.priceControl(flat.cost);
        itemoperations.classControl(flat.vacanse, flatStatuses)
        itemoperations.bottomControl(flat.vacanse)
        main_items_wrapper.insertBefore(item, showMore);
      }
    }
  };
}).catch(function(err) {
  alert('кнопка "показать ещё" работает только в режиме localhost в связи с особенностями метода fetch(или может быть я просто не до конца разобрался как работать с ним локально)');
});
// КОНЕЦ БЛОКА-----------------------------------------------------------------------------
