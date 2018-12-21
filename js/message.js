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

  var showMessage = function (template, errorMessage) {
    var messageElem = template.cloneNode(true);

    if (errorMessage) {
      var errorTextElem = messageElem.querySelector('.error__message');
      if (errorMessage) {
        errorTextElem.innerText = errorMessage;
      }
    }

    mainSection.appendChild(messageElem);

    var onMessageClick = function () {
      if (messageElem) {
        messageElem.remove();
        document.removeEventListener('keydown', onEsc);
      }
    };

    var onEsc = function (evt) {
      if (evt.keyCode === window.Utils.KeyCode.ESC) {
        onMessageClick();
      }
    };

    messageElem.addEventListener('click', onMessageClick);
    var errorButton = messageElem.querySelector('.error__button');
    if (errorButton) {
      errorButton.addEventListener('click', onMessageClick);
    }
    document.addEventListener('keydown', onEsc);
  };

  var showSuccessMessage = function () {
    showMessage(successTemplate);
  };

  var showErrorMessage = function (message) {
    showMessage(errorTemplate, message);
  };

  window.Message = {
    success: showSuccessMessage,
    error: showErrorMessage
  };
})();
