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
  var successMessage = null;
  var errorMessage = null;

  var showSuccessMessage = function () {
    successMessage = successTemplate.cloneNode(true);
    mainSection.appendChild(successMessage);

    var onSuccessClick = function () {
      if (successMessage === null) {
        return;
      }

      successMessage.remove();
      successMessage = null;
      document.removeEventListener('keydown', onEscSuccess);
    };

    var onEscSuccess = function (evt) {
      if (evt.keyCode === window.Utils.KeyCode.ESC) {
        onSuccessClick();
      }
    };

    successMessage.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onEscSuccess);
  };

  var showErrorMessage = function (message) {
    errorMessage = errorTemplate.cloneNode(true);
    if (message) {
      errorMessage.querySelector('.error__message').innerText = message;
    }
    mainSection.appendChild(errorMessage);

    var onErrorClick = function () {
      if (errorMessage === null) {
        return;
      }
      errorMessage.remove();
      errorMessage = null;
      document.removeEventListener('keydown', onEscError);
    };

    var onEscError = function (evt) {
      if (evt.keyCode === window.Utils.KeyCode.ESC) {
        onErrorClick();
      }
    };

    errorMessage.addEventListener('click', onErrorClick);
    errorMessage.querySelector('.error__button').addEventListener('click', onErrorClick);
    document.addEventListener('keydown', onEscError);
  };

  window.Message = {
    success: showSuccessMessage,
    error: showErrorMessage
  };
})();
