'use strict';

/**
 * Модуль Message
 *
 * Отображение пользовательских сообщений
 * @param Message.success - информационное сообщение
 * @param Message.error - сообщение об ошибке
 */
(function () {
  var mainSection = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var showSuccessMessage = function () {
    var successMessage = successTemplate.cloneNode(true);

    successMessage.addEventListener('click', function () {
      successMessage.remove();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.Utils.KeyCode.ESC) {
        successMessage.remove();
      }
    });

    mainSection.appendChild(successMessage);
  };

  var showErrorMessage = function (message) {
    var errorMessage = errorTemplate.cloneNode(true);

    if (message) {
      errorMessage.querySelector('.error__message').innerText = message;
    }

    errorMessage.addEventListener('click', function () {
      errorMessage.remove();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.Utils.KeyCode.ESC) {
        errorMessage.remove();
      }
    });

    errorMessage.querySelector('.error__button').addEventListener('click', function () {
      errorMessage.remove();
    });

    mainSection.appendChild(errorMessage);
  };

  window.Message = {
    success: showSuccessMessage,
    error: showErrorMessage
  };
})();
