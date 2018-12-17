'use strict';

/**
 * Модуль AdMap
 *
 * Управление картой с метками
 * @param AdMap.activate - активация карты
 * @param AdMap.deactivate - деактивация карты
 * @param AdMap.init - инициализация событий карты
 */
(function () {

  var map = document.querySelector('.map');
  var mapPinsArea = document.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');
  var apartments = [];

  var activateMap = function () {
    if (window.AdMapActive) {
      return;
    }
    window.AdMapActive = true;

    document.querySelector('.map').classList.remove('map--faded');

    var onLoad = function (data) {
      apartments = data;
      window.Pin.renderPins(mapPinsArea, apartments);
      window.AdFilter.activate();
    };

    var onError = function (message) {
      window.Message.error(message);
    };

    window.Backend.get(onLoad, onError);
  };

  var deactivateMap = function () {
    if (window.AdMapActive === false) {
      return;
    }
    window.AdMapActive = false;

    map.classList.add('map--faded');
    mapPinMain.style.top = window.Const.MAP_PIN_TOP_INITIAL + 'px';
    mapPinMain.style.left = window.Const.MAP_PIN_LEFT_INITIAL + 'px';

    window.Pin.removePins();
    window.Card.hide();
    window.AdForm.setAddress(window.Pin.getMainPinLocation(true));
    window.AdFilter.deactivate();
  };

  var initMap = function () {
    window.AdMap.deactivate();

    mapPinsArea.addEventListener('click', function (evt) {
      var mapPin = evt.target.closest('.map__pin:not(.map__pin--main)');
      if (mapPin) {
        var key = mapPin.dataset.key;
        if (key) {
          window.Pin.activate(mapPin, function () {
            window.Card.show(mapPinsArea, apartments[key]);
          });
        }
      }
    });

    mapPinMain.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.x,
          y: moveEvt.y
        };

        var newCoords = {
          x: mapPinMain.offsetLeft - shift.x,
          y: mapPinMain.offsetTop - shift.y
        };

        // вычисляем границы области, где можно поставить метку
        var minY = window.Const.MAP_PIN_TOP_MIN;
        var maxY = window.Const.MAP_PIN_TOP_MAX;
        var minX = 0 - mapPinMain.offsetWidth / 2;
        var maxX = mapPinsArea.offsetWidth - mapPinMain.offsetWidth / 2;

        // не даём метке выйти за границы
        if (newCoords.y >= minY && newCoords.y <= maxY) {
          mapPinMain.style.top = newCoords.y + 'px';
        }
        if (newCoords.x >= minX && newCoords.x <= maxX) {
          mapPinMain.style.left = newCoords.x + 'px';
        }

        window.AdMap.activate();
        window.AdForm.activate();
        window.AdForm.setAddress(window.Pin.getMainPinLocation());
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        window.AdMap.activate();
        window.AdForm.activate();
        window.AdForm.setAddress(window.Pin.getMainPinLocation());

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.Const.KEYCODE_ENTER) {
      window.AdMap.activate();
      window.AdForm.activate();
      window.AdForm.setAddress(window.Pin.getMainPinLocation());
    }
  });

  window.AdMap = {
    activate: activateMap,
    deactivate: deactivateMap,
    init: initMap
  };
})();
