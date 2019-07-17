'use strict';

(function () {
  var setupElement = document.querySelector('.setup');
  var setupForm = document.querySelector('.setup-wizard-form');
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = document.querySelector('.setup-close');

  setupOpenElement.addEventListener('click', function () {
    setupElement.classList.remove('hidden');
  });

  setupCloseElement.addEventListener('click', function () {
    setupElement.classList.add('hidden');
  });

  setupForm.addEventListener('submit', function (evt) {
    setupElement.classList.add('hidden');
  });

})();
