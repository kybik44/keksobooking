'use strict';

/**
 * Модуль Const
 *
 * Содержит константы
 * @param Const.MAP_PIN_HEIGHT - высота метки (px)
 * @param Const.MAP_PIN_HEIGHT - ширина метки (px)
 * @param Const.MAP_PIN_MAIN_ARROW_HEIGHT - высота стрелки главной метки, необходима для вычисления размеров главной метки (px)
 * @param Const.MAP_PIN_TOP_INITIAL - начальное положение главной метки на карте (px)
 * @param Const.MAP_PIN_LEFT_INITIAL - начальное положение главной метки на карте (px)
 * @param Const.MAP_PIN_TOP_MIN - ограничение области карты сверху, куда можно переместить главную метку (px)
 * @param Const.MAP_PIN_TOP_MAX - ограничение области карты снизу, куда можно переместить главную метку (px)
 * @param Const.MAX_NUMBER_OF_MAP_PINS - максимальное кол-во меток, отображаемых на карте
 * @param Const.DEBOUNCE_INTERVAL - интервал для устранения дребезга (мс)
 * @param Const.XHR_TIMEOUT - таймаут на ответ сервера при отправке формы объявления (мс)
 */
(function () {
  window.Const = {};
  window.Const.MAP_PIN_HEIGHT = 70;
  window.Const.MAP_PIN_WIDTH = 50;
  window.Const.MAP_PIN_MAIN_ARROW_HEIGHT = 16;
  window.Const.MAP_PIN_TOP_INITIAL = 375;
  window.Const.MAP_PIN_LEFT_INITIAL = 570;
  window.Const.MAP_PIN_TOP_MIN = 130;
  window.Const.MAP_PIN_TOP_MAX = 630;
  window.Const.MAX_NUMBER_OF_MAP_PINS = 5;
  window.Const.DEBOUNCE_INTERVAL = 500;
  window.Const.XHR_TIMEOUT = 5000;
})();
