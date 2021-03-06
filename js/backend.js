'use strict';

/**
 * Модуль Backend
 *
 * Содержит методы для работы с сервером
 * @param Backend.get - получение данных с сервера
 * @param Backend.post - отправка данных на сервер
 */
(function () {
  var get = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = window.Const.XHR_TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === window.Utils.HttpStatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.send();
  };

  var post = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = window.Const.XHR_TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === window.Utils.HttpStatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.open('POST', 'https://js.dump.academy/keksobooking');
    xhr.send(data);
  };

  window.Backend = {
    get: get,
    post: post
  };
})();
