'use strict';

(function () {
  window.error = function (message) {
    throw new Error(message);
  };

  window.backend = {
    load: function (onLoad, onError) {
      var URL = 'https://js.dump.academy/code-and-magick/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ошибки: ' + xhr.status);
        }
      });

      xhr.addEventListener('error', function () {
        onError(xhr.statusText);
      });

      xhr.open('GET', URL);
      xhr.send();

    },
    save: function (data, onSuccess) {
      var xhr = new XMLHttpRequest();
      var URL = 'https://js.dump.academy/code-and-magick';
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        onSuccess(xhr.response);
      });

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };

  var form = document.querySelector('.setup-wizard-form');
  var setup = document.querySelector('.setup');

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      setup.classList.add('hidden');
    });
    evt.preventDefault();
  });
})();

