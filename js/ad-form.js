'use strict';

(function () {
  window.AdForm = {};

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

  window.AdForm.deactivate = function () {
    if (window.adFormActive === false) {
      return;
    }
    window.adFormActive = false;

    changeAdFormState(true);
  };

  window.AdForm.activate = function () {
    if (window.adFormActive === true) {
      return;
    }
    window.adFormActive = true;

    changeAdFormState(false);
  };

  window.AdForm.setAddress = function (location) {
    addressField.value = location.x + ', ' + location.y;
  };

  window.AdForm.init = function () {
    window.AdForm.deactivate();
    window.AdForm.setAddress(window.Pin.getMainPinLocation(true));

    typeSelect.addEventListener('change', function (evt) {
      priceInput.min = window.Const.OFFER_TYPE_MIN_PRICE[evt.target.value];
      priceInput.placeholder = window.Const.OFFER_TYPE_MIN_PRICE[evt.target.value];
    });

    var syncTimeSelects = function (evt) {
      timeoutSelect.value = timeinSelect.value = evt.target.value;
    };

    timeinSelect.addEventListener('change', syncTimeSelects);
    timeoutSelect.addEventListener('change', syncTimeSelects);

    var validateCapacity = function () {
      var rooms = roomNumberSelect.value;
      var capacity = capacitySelect.value;
      var validCapacityArray = window.Const.ADFORM_ROOM_CAPACITY_MAPPING[rooms];

      if (validCapacityArray.indexOf(capacity) === -1) {
        capacitySelect.setCustomValidity(window.Const.ADFORM_ROOM_CAPACITY_HINT[rooms]);
      } else {
        capacitySelect.setCustomValidity('');
      }
    };

    roomNumberSelect.addEventListener('change', validateCapacity);
    capacitySelect.addEventListener('change', validateCapacity);

    adFormReset.addEventListener('click', function (e) {
      e.preventDefault();
      adForm.reset();
      typeSelect.dispatchEvent(new Event('change', {}));
      capacitySelect.setCustomValidity('');

      window.AdMap.deactivate(function () {
        window.Pin.removePins();
        window.Card.hide();
        window.AdForm.setAddress(window.Pin.getMainPinLocation(true));
      });
      window.AdForm.deactivate();
    });
  };
})();
