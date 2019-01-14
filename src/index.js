import $ from 'jquery';
import './base.scss'
var main_items_wrapper = document.querySelector('.main_items');
var main_items = document.querySelectorAll('.mainItem');
var showMore = document.querySelector('.showMore');
var smButton = document.querySelector('.showMore button');
var sortPrice = document.querySelector('.sortPrice');
var sortRooms = document.querySelector('.sortRooms');
// переменная для хранения данных с сервера и последующего сравнения. Если данных много то это будет забивать память, но на данном примре сойдёт
var dataTemp = [];
var lesstomorePrice = true;
var priceUP = document.querySelector('.sortPrice .up');
var priceDown = document.querySelector('.sortPrice .down');
var roomUP = document.querySelector('.sortRooms .up');
var roomDown = document.querySelector('.sortRooms .down');
var check;


function refresh(elColl, elArr) {

  console.log(elArr);
  for (var i = 0; i < elColl.length; i++) {
    elColl[i].parentNode.removeChild(elColl[i]);
  }
  for (let i = 0; i < main_items.length; i++) {
    main_items_wrapper.insertBefore(elArr[i], showMore);
  }
}

function sortCards(type) {
  let mainItems_all = document.querySelectorAll('.mainItem');
  let elements = [].slice.call(mainItems_all);
  elements.sort(function(a, b) {

    if (lesstomorePrice) {
      return a.getAttribute(type) - b.getAttribute(type);
    }

    if (!lesstomorePrice) {
      return b.getAttribute(type) - a.getAttribute(type);
    }
  })
  refresh(mainItems_all, elements)
}

sortPrice.onclick = function() {
  if (lesstomorePrice) {
    lesstomorePrice = false;
    priceUP.classList.add('hide');
    priceDown.classList.remove('hide');
    sortCards('data-price');
    return;
  }
  if (!lesstomorePrice) {
    lesstomorePrice = true;
    priceUP.classList.remove('hide');
    priceDown.classList.add('hide');
    sortCards('data-price');
    return;
  }
}

sortRooms.onclick = function() {
  if (lesstomorePrice) {
    lesstomorePrice = false;
    roomUP.classList.add('hide');
    roomDown.classList.remove('hide');
    sortCards('data-rooms');
    return;
  }
  if (!lesstomorePrice) {
    lesstomorePrice = true;
    roomUP.classList.remove('hide');
    roomDown.classList.add('hide');
    sortCards('data-rooms');
    return;
  }
}

fetch('./goods.json').then(response => {
  return response.json();
}).then(data => {

  smButton.onclick = function() {
    let dataCont = data.products
    // проверяем обновились ли данные

    if (dataCont == dataTemp) {
      let jsonData = document.querySelectorAll('.jsonData');
      for (var i = 0; i < jsonData.length; i++) {
        jsonData[i].classList.toggle('hide');
      }
    }
    // если нет то скрываем-показываем

    if
    // если обновились то обновляем)
    (dataCont != dataTemp) {
      dataTemp = data.products;
      for (var i = 0; i < data.products.length; i++) {
        let item = document.createElement('div');
        item.classList.add('mainItem', 'jsonData');
        let imageBox = document.createElement('div');
        imageBox.classList.add('imgBox');
        let image = document.createElement('img');
        image.src = data.products[i].image;
        imageBox.appendChild(image);
        item.appendChild(imageBox);
        item.setAttribute('data-price', data.products[i].price)
        item.setAttribute('data-rooms', data.products[i].rooms)

        let newcharBox = document.createElement('div');
        newcharBox.classList.add('charBox');
        let span1 = document.createElement('span');
        let span2 = document.createElement('span');
        let span3 = document.createElement('span');

        let newFlat = document.createElement('div');
        newFlat.classList.add('flatName');
        newFlat.innerHTML = data.products[i].name;


        span1.innerHTML = data.products[i].finish;
        span2.innerHTML = data.products[i].sq;
        span3.innerHTML = data.products[i].floor;

        newcharBox.appendChild(span1);
        newcharBox.appendChild(span2);
        newcharBox.appendChild(span3);
        item.appendChild(newFlat);
        item.appendChild(newcharBox);

        let newPrice = document.createElement('div');
        newPrice.classList.add('price');
        newPrice.innerHTML = data.products[i].cost;

        item.appendChild(newPrice);

        let button = document.createElement('button');



        if (data.products[i].vacanse == "свободно") {
          item.classList.add('free');
        }
        if (data.products[i].vacanse == "забронировано") {
          item.classList.add('book');
        }
        if (data.products[i].vacanse == "продано") {
          item.classList.add('bought');
        }

        button.innerHTML = data.products[i].vacanse;

        item.appendChild(button);
        main_items_wrapper.insertBefore(item, showMore);
      }
    }
  }
}).catch(err => {
  alert('кнопка "показать ещё" работает только в режиме localhost в связи с особенностями метода fetch(или может быть я просто не до конца разобрался как работать с ним локально)');
});

var upbutton = document.querySelector('.upbutton');
var upSc = document.querySelector('.upSc');
var back = document.querySelector('.back');
var thisPoint;
var nope;
// переменная блокирует скрывание кнопки "вернуться"

function WhatIsVisible(vis) {


  if (vis == 1) {
    back.classList.add('hide');
    upSc.classList.remove('hide');
  }

  if (vis == 2) {
    back.classList.remove('hide');
    upSc.classList.add('hide');
  }
}

WhatIsVisible(1);

window.onscroll = function() {
  if (window.pageYOffset > 500 && !nope) {
    upbutton.classList.remove('hide');
    check = 0;
    WhatIsVisible(1);

  }
  if (window.pageYOffset == 0 && check == 0) {
    upbutton.style.opacity = 0;
  }
  if (window.pageYOffset > 150) {
    upbutton.style.opacity = 1;
  }
}


upbutton.onclick = function(e) {
  if (check == 0) {
    thisPoint = window.pageYOffset;
    upSc.classList.toggle('hide');
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    check = 1;
    nope = true;
    setTimeout(
      function() {
        WhatIsVisible(2);
        nope = false;
        return true;

      }, 900
    )

  }
  if (check == 1) {
    window.scrollTo({
      top: thisPoint,
      behavior: "smooth"
    });
    WhatIsVisible(1);
    return true;
  }
}

var mail = document.querySelector('#mail');
var signB = document.querySelector('.signB');
var regMail = /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/i;
var form = document.querySelector('form');



function validation() {

  if (mail.value == '') {
    return false;
  }

  if (mail.value.match(regMail)) {
    return true;
  }
}

signB.onclick = function() {
  if (validation()) {
    console.log('go');
    form.submit();
  }
  if (!validation()) {
    alert('something going wrong');

  }
}

form.onsubmit = function() {
  if (validation()) {
    console.log('go');
    form.submit();
  }
  if (!validation()) {
    alert('something going wrong');
    event.preventDefault();
  }

}

var humburger = document.querySelectorAll('.humburger');


var line1 = document.querySelectorAll('.ln1');
var line2 = document.querySelectorAll('.ln2');
var line3 = document.querySelectorAll('.ln3');

var tohide = document.querySelectorAll('.displayResolutionHide')



for (let i = 0; i < humburger.length; i++) {
  humburger[i].addEventListener('click', function humburgerToggle() {

    line1[i].classList.toggle('cross');
    line2[i].classList.toggle('hide');
    line3[i].classList.toggle('cross2');
    tohide[i].classList.toggle('displayResolutionHide');
  });
}
