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

  var matchFilter = function (apartment, filterData) {
    if (!filterData) {
      return true;
    }

    var offer = apartment.offer;

    if (filterData.type !== 'any') {
      if (offer.type !== filterData.type) {
        return false;
      }
    }

    if (filterData.price !== 'any') {
      if (offer.price < filterData.minPrice || offer.price > filterData.maxPrice) {
        return false;
      }
    }

    if (filterData.rooms !== 'any') {
      if (offer.rooms !== +filterData.rooms) {
        return false;
      }
    }

    if (filterData.guests !== 'any') {
      if (offer.guests !== +filterData.guests) {
        return false;
      }
    }

    if (filterData.features && filterData.features.length) {
      for (var i = 0; i < filterData.features.length; i++) {
        if (offer.features.indexOf(filterData.features[i]) === -1) {
          return false;
        }
      }
    }

    return true;
  };

  var filterApartments = function (filterData) {
    var matchingApartments = apartments.filter(function (apartment) {
      return matchFilter(apartment, filterData);
    });

    if (matchingApartments.length <= window.Const.MAX_NUMBER_OF_MAP_PINS) {
      return matchingApartments;
    }

    // БОНУС-ФИЧА: если кол-во подходящих объявлений больше MAX_NUMBER_OF_MAP_PINS, то сортируем по расстоянию до главной метки
    var mainPinLocation = window.Pin.getMainPinLocation();

    var apartmentsWithDistance = matchingApartments.map(function (apartment) {
      return {
        apartment: apartment,
        distanceToMainPin: window.Utils.getDistance(apartment.location, mainPinLocation)
      };
    });

    // чем ближе - тем лучше (сортируем по возрастанию)
    apartmentsWithDistance.sort(function (item1, item2) {
      return item1.distanceToMainPin - item2.distanceToMainPin;
    });

    return apartmentsWithDistance.slice(0, window.Const.MAX_NUMBER_OF_MAP_PINS).map(function (item) {
      return item.apartment;
    });
  };

  var updateMap = function (filterData) {
    window.Pin.renderPins(mapPinsArea, filterApartments(filterData));
  };

  var activateMap = function () {
    if (window.AdMapActive) {
      var filterDate = window.AdFilter.getData();
      updateMap(filterDate);
      return;
    }
    window.AdMapActive = true;

    document.querySelector('.map').classList.remove('map--faded');

    var onLoad = function (data) {
      apartments = data;

      apartments.forEach(function (apartment, i) {
        // добавим ключ к каждому объявлению, для связи метки и карточки, которую показываем при клике на метку
        apartment.key = i;
      });

      updateMap();
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
    window.AdForm.setAddress(window.Pin.getMainPinLocation(true));
    window.AdFilter.deactivate();
  };

  var initMap = function () {
    window.AdMap.deactivate();

    mapPinsArea.addEventListener('click', function (evt) {
      var mapPin = evt.target.closest('.map__pin:not(.map__pin--main)');
      if (!mapPin) {
        return;
      }

      var apartment = apartments.find(function (item) {
        return item.key === +mapPin.dataset.key;
      });

      if (apartment) {
        window.Pin.activate(mapPin, function () {
          window.Card.show(mapPinsArea, apartment);
        });
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

        activateMap();
        window.AdForm.activate();
        window.AdForm.setAddress(window.Pin.getMainPinLocation());
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        activateMap();
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
    if (evt.keyCode === window.Utils.KeyCode.ENTER) {
      activateMap();
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
