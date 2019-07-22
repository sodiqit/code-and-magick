'use strict';

// render wizards - start

document.querySelector('.setup-similar').classList.remove('hidden');

var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var setupSimilarList = document.querySelector('.setup-similar-list');
var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = template.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

  return wizardElement;
};

var change = function (x, y, name) {
  var a = name[x];

  name[x] = name[y];
  name[y] = a;
};

window.backend.load(function (wizards) {
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < wizards.length; j++) {
    change(window.getRandom(0, wizards.length - 1), window.getRandom(0, wizards.length - 1), wizards);
  }

  for (var i = 0; i < 4; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  setupSimilarList.appendChild(fragment);
}, window.error);

// render wizards - end


// open/close popup and validation - start
var setup = document.querySelector('.setup');
var setupIcon = document.querySelector('.setup-open-icon');
var setupClose = setup.querySelector('.setup-close');
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var userNameInput = setup.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
};

setupIcon.addEventListener('click', openPopup);

setupIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', closePopup);

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

userNameInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-ух символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле!');
  } else {
    userNameInput.setCustomValidity('');
  }
});

// open/close popup and validation - end

// change color eyes, coat - start

var wizardEyes = document.querySelector('.wizard-eyes');
var wizardCoat = document.querySelector('.wizard-coat');
var wizardFireball = document.querySelector('.setup-fireball-wrap');
var summ = 0;
var colorFireballInput = document.querySelector('input[name="fireball-color"]');
var colorCoatInput = document.querySelector('input[name="coat-color"]');
var colorEyesInput = document.querySelector('input[name="eyes-color"]');
var changeColors = function (item, colors, number, colorInput) {
  ++summ;

  if (summ === number) {
    summ = 0;
  }

  item.style.fill = colors[summ];
  colorInput.value = colors[summ];

  if (item === wizardFireball) {
    wizardFireball.style.background = fireballColors[summ];
  }
};

wizardEyes.addEventListener('click', function () {
  changeColors(wizardEyes, eyesColors, 5, colorEyesInput);
});

wizardCoat.addEventListener('click', function () {
  changeColors(wizardCoat, coatColors, 6, colorCoatInput);
});

wizardFireball.addEventListener('click', function () {
  changeColors(wizardFireball, fireballColors, 5, colorFireballInput);
});

// change color eyes, coat, fireball - end
