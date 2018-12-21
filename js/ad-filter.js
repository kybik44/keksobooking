'use strict';

/**
 * Модуль AdFilter
 *
 * Фильтр объявлений на карте
 * @param AdFilter.getData - получить данные фильтра
 * @param AdFilter.activate - активация формы фильтрации объявлений на карте
 * @param AdFilter.deactivate - деактивация формы фильтрации объявлений на карте
 */
(function () {
  var adFilter = document.querySelector('.map__filters');
  var selectors = adFilter.querySelectorAll('.map__filter');
  var features = adFilter.querySelector('.map__features');
  var checkboxes = adFilter.querySelectorAll('.map__checkbox');

  var typeSelect = adFilter.querySelector('#housing-type');
  var priceSelect = adFilter.querySelector('#housing-price');
  var roomsSelect = adFilter.querySelector('#housing-rooms');
  var guestsSelect = adFilter.querySelector('#housing-guests');

  var resetFilter = function () {
    selectors.forEach(function (select) {
      select.value = 'any';
    });
    checkboxes.forEach(function (checkbox) {
      checkbox.checked = false;
    });
  };

  var getFilterData = function () {
    var result = {};
    result.type = typeSelect.value;
    result.price = priceSelect.value;
    var priceRange = window.Utils.housingPriceToRangeMap[priceSelect.value];
    if (priceRange) {
      result.minPrice = priceRange.min;
      result.maxPrice = priceRange.max;
    }
    result.rooms = roomsSelect.value;
    result.guests = guestsSelect.value;
    result.features = [];
    checkboxes.forEach(function (checkbox) {
      if (checkbox.checked) {
        result.features.push(checkbox.value);
      }
    });
    return result;
  };

  var updateFilterTimeout = null;

  var onFilterUpdate = function () {
    if (updateFilterTimeout) {
      clearTimeout(updateFilterTimeout);
    }

    updateFilterTimeout = setTimeout(function () {
      window.AdMap.activate();
    }, window.Const.DEBOUNCE_INTERVAL);
  };

  var changeAdFilterState = function (disabled) {
    for (var i = 0; i < selectors.length; i++) {
      selectors[i].disabled = disabled;
    }

    features.disabled = disabled;
  };

  var activateFilter = function () {
    if (window.adFilterActive === true) {
      return;
    }
    window.adFilterActive = true;

    selectors.forEach(function (selector) {
      selector.addEventListener('change', onFilterUpdate);
    });

    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener('change', onFilterUpdate);
    });

    changeAdFilterState(false);
  };

  var deactivateFilter = function () {
    if (window.adFilterActive === false) {
      return;
    }
    window.adFilterActive = false;

    changeAdFilterState(true);
    resetFilter();

    selectors.forEach(function (selector) {
      selector.removeEventListener('change', onFilterUpdate);
    });

    checkboxes.forEach(function (checkbox) {
      checkbox.removeEventListener('change', onFilterUpdate);
    });
  };

  window.AdFilter = {
    getData: getFilterData,
    activate: activateFilter,
    deactivate: deactivateFilter
  };
})();
