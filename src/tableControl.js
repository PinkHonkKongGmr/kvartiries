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
// --------------конец группы-----------------------


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
    var dataCont = data.products;
    // проверяем обновились ли данные

    if (dataCont == dataTemp) {
      var jsonData = document.querySelectorAll('.jsonData');
      for (var i = 0; i < jsonData.length; i++) {
        jsonData[i].classList.toggle('hide');
      }
    }
    // если нет то скрываем-показываем

    if (
      // если обновились то обновляем)
      dataCont != dataTemp) {
      dataTemp = data.products;
      for (var i = 0; i < data.products.length; i++) {
        var item = document.createElement('div');
        item.classList.add('mainItem', 'jsonData');
        var imageBox = document.createElement('div');
        imageBox.classList.add('imgBox');
        var image = document.createElement('img');
        image.src = data.products[i].image;
        imageBox.appendChild(image);
        item.appendChild(imageBox);
        item.setAttribute('data-price', data.products[i].price);
        item.setAttribute('data-rooms', data.products[i].rooms);

        var newcharBox = document.createElement('div');
        newcharBox.classList.add('charBox');
        var span1 = document.createElement('span');
        var span2 = document.createElement('span');
        var span3 = document.createElement('span');

        var newFlat = document.createElement('div');
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

        var newPrice = document.createElement('div');
        newPrice.classList.add('price');
        newPrice.innerHTML = data.products[i].cost;

        item.appendChild(newPrice);

        var button = document.createElement('button');

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
  };
}).catch(function(err) {
  alert('кнопка "показать ещё" работает только в режиме localhost в связи с особенностями метода fetch(или может быть я просто не до конца разобрался как работать с ним локально)');
});
// КОНЕЦ БЛОКА-----------------------------------------------------------------------------
