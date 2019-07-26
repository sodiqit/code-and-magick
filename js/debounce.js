'use strict';

(function () {
  var lastTimeout;

  window.debounce = function (fun) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    } else {
      setTimeout(fun, 1000);
    }
  };
})();
