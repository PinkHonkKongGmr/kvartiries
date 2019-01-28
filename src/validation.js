// группа перемнных для вадидации форм
var mail = document.querySelector('#mail');
var signB = document.querySelector('.signB');
var regMail = /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/i;
var form = document.querySelector('form');
// --------------конец группы-----------------------

// БЛОК ВАЛИДАЦИИ
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
};

form.onsubmit = function() {
  if (validation()) {
    console.log('go');
    form.submit();
  }
  if (!validation()) {
    alert('something going wrong');
    event.preventDefault();
  }
};
// КОНЕЦ БЛОКА---------------------------------------------------------------------------
