'use strict';

/**
 * Модуль Pin
 *
 * Управление метками на карте
 * @param Pin.removePins - удаление всех меток с карты
 * @param Pin.renderPins - отрисовка меток на карте
 * @param Pin.activate - активация метки
 * @param Pin.deactivatePins - деактивация всех меток на карте
 * @param Pin.getMainPinLocation - получение координат главной метки
 */
(function () {
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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
    var mapPinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < mapPinElements.length; i++) {
      mapPinElements[i].remove();
    }
    window.Card.hide();
  };

  var renderPins = function (map, apartments) {
    window.Pin.removePins();

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < apartments.length; i++) {
      var mapPinElement = initPin(apartments[i]);
      if (mapPinElement) {
        fragment.appendChild(mapPinElement);
      }
    }

    map.appendChild(fragment);
  };

  var activatePin = function (pin, callback) {
    window.Pin.deactivatePins();
    pin.classList.add('map__pin--active');
    if (typeof callback === 'function') {
      callback();
    }
  };

  var deactivatePins = function () {
    var mapPinActiveElements = document.querySelectorAll('.map__pin--active');
    for (var i = 0; i < mapPinActiveElements.length; i++) {
      mapPinActiveElements[i].classList.remove('map__pin--active');
    }
  };

  var getMainPinLocation = function (initialState) {
    var mapPinMain = document.querySelector('.map__pin--main');

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
    deactivatePins: deactivatePins,
    getMainPinLocation: getMainPinLocation
  };
})();
