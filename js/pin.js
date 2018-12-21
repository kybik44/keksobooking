'use strict';

/**
 * Модуль Pin
 *
 * Управление метками на карте
 * @param Pin.removePins - удаление всех меток с карты
 * @param Pin.renderPins - отрисовка меток на карте
 * @param Pin.activate - активация метки
 * @param Pin.deactivatePin - деактивация всех меток на карте
 * @param Pin.getMainPinLocation - получение координат главной метки
 */
(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinElements = [];
  var activeMapPin = null;

  var initPin = function (apartment) {
    if (typeof apartment.offer === 'undefined') {
      return null;
    }

    var mapPinElement = mapPinTemplate.cloneNode(true);

    mapPinElement.style.left = apartment.location.x - window.Const.MAP_PIN_WIDTH / 2 + 'px';
    mapPinElement.style.top = apartment.location.y - window.Const.MAP_PIN_HEIGHT + 'px';
    mapPinElement.querySelector('img').src = apartment.author.avatar;
    mapPinElement.dataset.key = apartment.key;

    return mapPinElement;
  };

  var removePins = function () {
    if (mapPinElements && mapPinElements.length) {
      mapPinElements.forEach(function (pin) {
        pin.remove();
      });
      mapPinElements = [];
    }
    window.Card.hide();
  };

  var renderPins = function (map, apartments) {
    window.Pin.removePins();

    var fragment = document.createDocumentFragment();

    apartments.forEach(function (apartment) {
      var pin = initPin(apartment);
      if (pin) {
        fragment.appendChild(pin);
        mapPinElements.push(pin);
      }
    });

    map.appendChild(fragment);
  };

  var activatePin = function (pin, callback) {
    deactivatePin();
    pin.classList.add('map__pin--active');
    activeMapPin = pin;

    if (typeof callback === 'function') {
      callback();
    }
  };

  var deactivatePin = function () {
    if (activeMapPin) {
      activeMapPin.classList.remove('map__pin--active');
    }
  };

  var getMainPinLocation = function (initialState) {
    var location = {
      x: Math.round(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2)
    };

    // в начальном состоянии (карта неактивна), у главной метки нет стрелки, поэтому за координаты берём середину метки
    if (initialState) {
      location.y = Math.round(mapPinMain.offsetTop + mapPinMain.offsetHeight / 2);
    } else {
      location.y = Math.round(mapPinMain.offsetTop + mapPinMain.offsetHeight + window.Const.MAP_PIN_MAIN_ARROW_HEIGHT);
    }

    return location;
  };

  window.Pin = {
    removePins: removePins,
    renderPins: renderPins,
    activate: activatePin,
    deactivatePin: deactivatePin,
    getMainPinLocation: getMainPinLocation
  };
})();
