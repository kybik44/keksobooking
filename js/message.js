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
    successMessage.addEventListener('click', hideSuccessMessage);
    mainSection.appendChild(successMessage);

    document.addEventListener('keydown', onEscSuccess);
  };

  var onEscSuccess = function (evt) {
    if (evt.keyCode === window.Utils.KeyCode.ESC) {
      hideSuccessMessage();
    }
  };

  var hideSuccessMessage = function () {
    if (successMessage === null) {
      return;
    }

    successMessage.remove();
    successMessage = null;
    document.removeEventListener('keydown', onEscSuccess);
  };

  var showErrorMessage = function (message) {
    errorMessage = errorTemplate.cloneNode(true);

    if (message) {
      errorMessage.querySelector('.error__message').innerText = message;
    }

    errorMessage.addEventListener('click', hideErrorMessage);
    errorMessage.querySelector('.error__button').addEventListener('click', hideErrorMessage);
    mainSection.appendChild(errorMessage);

    document.addEventListener('keydown', onEscError);
  };

  var onEscError = function (evt) {
    if (evt.keyCode === window.Utils.KeyCode.ESC) {
      hideErrorMessage();
    }
  };

  var hideErrorMessage = function () {
    if (errorMessage === null) {
      return;
    }
    errorMessage.remove();
    errorMessage = null;
    document.removeEventListener('keydown', onEscError);
  };

  window.Message = {
    success: showSuccessMessage,
    error: showErrorMessage
  };
})();
