'use strict';

/**
 * Модуль AdForm
 *
 * Форма ввода объявления
 * @param AdForm.activate - активация формы, поля ввода становятся доступными
 * @param AdForm.deactivate - деактивация формы, поля ввода становятся недоступными
 * @param AdForm.setAddress - заполнение поля ввода адреса на основе координат главной метки
 * @param AdForm.init - инициализация событий формы
 */
(function () {
  var adForm = document.querySelector('.ad-form');
  var addressField = adForm.querySelector('#address');
  var typeSelect = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');
  var timeinSelect = adForm.querySelector('#timein');
  var timeoutSelect = adForm.querySelector('#timeout');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var fieldsets = adForm.querySelectorAll('.ad-form__element');
  var headerFieldset = adForm.querySelector('.ad-form-header');

  var changeAdFormState = function (disabled) {
    if (disabled) {
      adForm.classList.add('ad-form--disabled');
    } else {
      adForm.classList.remove('ad-form--disabled');
    }

    headerFieldset.disabled = disabled;

    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = disabled;
    }
  };

  var onTypeChange = function (evt) {
    priceInput.min = window.Utils.offerTypeToMinPriceMap[evt.target.value];
    priceInput.placeholder = window.Utils.offerTypeToMinPriceMap[evt.target.value];
  };

  var onTimeChange = function (evt) {
    timeoutSelect.value = timeinSelect.value = evt.target.value;
  };

  var onRoomCapacityChange = function () {
    var rooms = roomNumberSelect.value;
    var capacity = capacitySelect.value;
    var validCapacityArray = window.Utils.roomToCapacityMap[rooms];

    // проверяем вместимость в зависимости от кол-ва комнат
    if (validCapacityArray.indexOf(capacity) === -1) {
      capacitySelect.setCustomValidity(window.Utils.roomToCapacityHintMap[rooms]);
    } else {
      capacitySelect.setCustomValidity('');
    }
  };

  var reset = function () {
    adForm.reset();
    typeSelect.dispatchEvent(new Event('change', {}));
    capacitySelect.setCustomValidity('');

    window.AdMap.deactivate();
    window.AdForm.deactivate();
  };

  var onResetClick = function (evt) {
    evt.preventDefault();
    reset();
  };

  var onSubmitForm = function (evt) {
    evt.preventDefault();

    var onLoad = function () {
      window.Message.success();
      reset();
    };

    var onError = function (message) {
      window.Message.error(message);
    };

    var data = new FormData(adForm);

    window.Backend.post(data, onLoad, onError);
  };

  var activateAdForm = function () {
    if (window.adFormActive === true) {
      return;
    }
    window.adFormActive = true;

    typeSelect.addEventListener('change', onTypeChange);
    timeinSelect.addEventListener('change', onTimeChange);
    timeoutSelect.addEventListener('change', onTimeChange);
    roomNumberSelect.addEventListener('change', onRoomCapacityChange);
    capacitySelect.addEventListener('change', onRoomCapacityChange);
    adForm.addEventListener('submit', onSubmitForm);
    adFormReset.addEventListener('click', onResetClick);

    changeAdFormState(false);
  };

  var deactivateAdForm = function () {
    if (window.adFormActive === false) {
      return;
    }
    window.adFormActive = false;

    changeAdFormState(true);

    typeSelect.removeEventListener('change', onTypeChange);
    timeinSelect.removeEventListener('change', onTimeChange);
    timeoutSelect.removeEventListener('change', onTimeChange);
    roomNumberSelect.removeEventListener('change', onRoomCapacityChange);
    capacitySelect.removeEventListener('change', onRoomCapacityChange);
    adForm.removeEventListener('submit', onSubmitForm);
    adFormReset.removeEventListener('click', onResetClick);
  };

  var setAddress = function (location) {
    addressField.value = location.x + ', ' + location.y;
  };

  var initAdForm = function () {
    window.AdForm.deactivate();
    setAddress(window.Pin.getMainPinLocation(true));
  };

  window.AdForm = {
    activate: activateAdForm,
    deactivate: deactivateAdForm,
    setAddress: setAddress,
    init: initAdForm
  };
})();
