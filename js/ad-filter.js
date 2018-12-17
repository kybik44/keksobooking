'use strict';

/**
 * Модуль AdFilter
 *
 * Фильтр объявлений на карте
 * @param AdFilter.activate - активация формы фильтрации объявлений на карте
 * @param AdFilter.deactivate - деактивация формы фильтрации объявлений на карте
 */
(function () {
  var adFilter = document.querySelector('.map__filters');
  var selectors = adFilter.querySelectorAll('.map__filter');
  var features = adFilter.querySelector('.map__features');

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

    changeAdFilterState(false);
  };

  var deactivateFilter = function () {
    if (window.adFilterActive === false) {
      return;
    }
    window.adFilterActive = false;

    changeAdFilterState(true);
  };

  window.AdFilter = {
    activate: activateFilter,
    deactivate: deactivateFilter
  };
})();
