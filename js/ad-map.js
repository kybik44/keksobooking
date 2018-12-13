'use strict';

(function () {
  window.AdMap = {};

  var map = document.querySelector('.map');
  var mapPinsArea = document.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');

  window.AdMap.deactivate = function (callback) {
    if (window.AdMapActive === false) {
      return;
    }
    window.AdMapActive = false;

    map.classList.add('map--faded');
    mapPinMain.style.top = window.Const.MAP_PIN_TOP_INITIAL + 'px';
    mapPinMain.style.left = window.Const.MAP_PIN_LEFT_INITIAL + 'px';

    if (typeof callback === 'function') {
      callback();
    }
  };

  window.AdMap.activate = function (callback) {
    if (window.AdMapActive) {
      return;
    }
    window.AdMapActive = true;

    document.querySelector('.map').classList.remove('map--faded');

    if (typeof callback === 'function') {
      callback();
    }
  };

  window.AdMap.init = function () {
    window.AdMap.deactivate();

    var apartments = window.Data.mock(mapPinsArea.offsetWidth);

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

        window.AdMap.activate(function () {
          window.Pin.renderPins(mapPinsArea, apartments);
        });
        window.AdForm.activate();
        window.AdForm.setAddress(window.Pin.getMainPinLocation());
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        window.AdMap.activate(function () {
          window.Pin.renderPins(mapPinsArea, apartments);
        });
        window.AdForm.activate();
        window.AdForm.setAddress(window.Pin.getMainPinLocation());

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };
})();
