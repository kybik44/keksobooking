'use strict';

/**
 * Модуль Const
 *
 * Содержит в себе константы
 * @param Const.MAP_PIN_HEIGHT - высота метки (px)
 * @param Const.MAP_PIN_HEIGHT - ширина метки (px)
 * @param Const.MAP_PIN_MAIN_ARROW_HEIGHT - высота стрелки главной метки, необходима для вычисления размеров главной метки (px)
 * @param Const.MAP_PIN_TOP_INITIAL - начальное положение главной метки на карте (px)
 * @param Const.MAP_PIN_LEFT_INITIAL - начальное положение главной метки на карте (px)
 * @param Const.MAP_PIN_TOP_MIN - ограничение области карты сверху, куда можно переместить главную метку (px)
 * @param Const.MAP_PIN_TOP_MAX - ограничение области карты снизу, куда можно переместить главную метку (px)
 * @param Const.OFFER_TYPE_DISPLAY_NAMES - русскоязычные названия для типов жилья
 * @param Const.OFFER_TYPE_MIN_PRICE - минимальные цены для типов жилья
 * @param Const.ADFORM_ROOM_CAPACITY_MAPPING - вместимость жилья взависимости от количества комнат
 * @param Const.ADFORM_ROOM_CAPACITY_HINT - сообщения для валидации вместимости жилья
 */
(function () {
  window.Const = {};

  window.Const.KEYCODE_ENTER = 13;
  window.Const.KEYCODE_ESC = 27;

  window.Const.MAP_PIN_HEIGHT = 70;
  window.Const.MAP_PIN_WIDTH = 50;
  window.Const.MAP_PIN_MAIN_ARROW_HEIGHT = 16;
  window.Const.MAP_PIN_TOP_INITIAL = 375;
  window.Const.MAP_PIN_LEFT_INITIAL = 570;
  window.Const.MAP_PIN_TOP_MIN = 130;
  window.Const.MAP_PIN_TOP_MAX = 630;

  window.Const.OFFER_TYPE_DISPLAY_NAMES = {
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  window.Const.OFFER_TYPE_MIN_PRICE = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  window.Const.ADFORM_ROOM_CAPACITY_MAPPING = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  window.Const.ADFORM_ROOM_CAPACITY_HINT = {
    '1': 'В 1 комнате может проживать 1 гость.',
    '2': 'В 2 комнатах может проживать 1 или 2 гостя.',
    '3': 'В 3 комнатах может проживать 1, 2 или 3 гостя.',
    '100': '100 комнат не для гостей.'
  };
})();
