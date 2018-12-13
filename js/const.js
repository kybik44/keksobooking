'use strict';

(function () {
  window.Const = {};

  window.Const.MAP_PIN_HEIGHT = 70;
  window.Const.MAP_PIN_WIDTH = 50;
  window.Const.MAP_PIN_MAIN_ARROW_HEIGHT = 16;
  window.Const.MAP_PIN_TOP_INITIAL = 375;
  window.Const.MAP_PIN_LEFT_INITIAL = 570;
  window.Const.MAP_PIN_TOP_MIN = 130;
  window.Const.MAP_PIN_TOP_MAX = 630;

  window.Const.OFFER_TITLE_EXAMPLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

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

  window.Const.OFFER_TIME_EXAMPLES = ['12:00', '13:00', '14:00'];
  window.Const.OFFER_FEATURE_EXAMPLES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  window.Const.OFFER_PHOTO_EXAMPLES = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

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
