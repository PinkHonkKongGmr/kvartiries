// группа перемнных для кнопки навигации быстрого скроллинга
var upbutton = document.querySelector('.upbutton');
var upSc = document.querySelector('.upSc');
var back = document.querySelector('.back');
// точка, с которой "мотнули" наверх
var thisPoint;
// базовая переменная для переключения режимов кнопки быстрого скроллинга
var scrollSwitch;
// переменная блокирует скрывание кнопки "вернуться" в момент окончания плавного скролинга наверх
var saveBack;
// переменная блокирует скрывание кнопки "вернуться" в триггерный(пересения точки появления\исчезновения)момент плавного скролинга наверх
var triggerOff;
// --------------конец группы-----------------------

// БЛОК БЫСТРОГО СКРОЛЛИНГА

// функция отвечает за оторбражение кнопки навигации быстрого скроллинга
function WhatIsVisible(vis) {
  if (vis == "upActive") {
    back.classList.add('hide');
    upSc.classList.remove('hide');
  }
  if (vis == "backActive") {
    back.classList.remove('hide');
    upSc.classList.add('hide');
  }
}

// по умолчанию, после прохождения триггерной точки отображается "наверх"
WhatIsVisible("upActive");

window.onscroll = function() {
  if (window.pageYOffset > 500 && !saveBack) {
    upbutton.classList.remove('hide');
    scrollSwitch = "up";
    WhatIsVisible("upActive");
  }
  if (window.pageYOffset == 0 && scrollSwitch == "up") {
    upbutton.style.opacity = 0;
  }
  if (window.pageYOffset > 150) {
    upbutton.style.opacity = 1;
  }
};

upbutton.onclick = function(e) {
  if (scrollSwitch == "up") {
    thisPoint = window.pageYOffset;
    upSc.classList.toggle('hide');
    triggerOff = false;
    window.scrollTo({
      top: 0
    });
    scrollSwitch = "down";
    saveBack = true;
    setTimeout(function() {
      WhatIsVisible("backActive");
      saveBack = false;
      triggerOff = true;
      return true;
    }, 900);
  }
  if (scrollSwitch == "down" && triggerOff) {
    window.scrollTo({
      top: thisPoint
    });
    WhatIsVisible("upActive");
    return true;
  }
};
// КОНЕЦ БЛОКА---------------------------------------------------------------------------
