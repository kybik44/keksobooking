'use strict';

/**
 * Модуль Utils
 *
 * Содержит вспомогательные структуры данных и методы
 * @param Utils.KeyCode - коды клавиатуры
 * @param Utils.offerTypeToDisplayNameMap - русскоязычные названия для типов жилья
 * @param Utils.offerTypeToMinPriceMap - минимальные цены для типов жилья
 * @param Utils.roomCapacityMap - вместимость жилья взависимости от количества комнат
 * @param Utils.roomCapacityHintMap - сообщения для валидации вместимости жилья
 */
(function () {
  window.Utils = {};

  window.Utils.KeyCode = {
    ENTER: 13,
    ESC: 27
  };

  window.Utils.offerTypeToDisplayNameMap = {
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  window.Utils.offerTypeToMinPriceMap = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  window.Utils.roomToCapacityMap = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  window.Utils.roomToCapacityHintMap = {
    '1': 'В 1 комнате может проживать 1 гость.',
    '2': 'В 2 комнатах может проживать 1 или 2 гостя.',
    '3': 'В 3 комнатах может проживать 1, 2 или 3 гостя.',
    '100': '100 комнат не для гостей.'
  };

  window.Utils.housingPriceToRangeMap = {
    'low': [0, 10000],
    'middle': [10000, 50000],
    'high': [50000, Infinity]
  };

  window.Utils.getDistance = function (location1, location2) {
    return Math.round(Math.sqrt(Math.pow(location2.x - location1.x, 2) + Math.pow(location2.y - location1.y, 2)));
  };
})();
