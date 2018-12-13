'use strict';

(function () {
  var getRandomValueFromRange = function (min, max) {
    return Math.round(min + (max - min) * Math.random());
  };

  var getRandomValueFromArray = function (arr) {
    return arr[Math.floor(arr.length * Math.random())];
  };

  var mixArray = function (arr) {
    return arr.slice().sort(function () {
      return Math.round(Math.random());
    });
  };

  window.Data = {};

  window.Data.mock = function (areaWidth) {
    var apartments = [];

    for (var i = 0; i < 8; i++) {
      var apartment = {};

      apartment.key = i;

      apartment.author = {};
      apartment.author.avatar = 'img/avatars/user0' + (i + 1) + '.png';

      apartment.location = {};
      apartment.location.x = getRandomValueFromRange(0, areaWidth);
      apartment.location.y = getRandomValueFromRange(130, 630);

      apartment.offer = {};
      apartment.offer.title = window.Const.OFFER_TITLE_EXAMPLES[i];
      apartment.offer.address = apartment.location.x + ', ' + apartment.location.y;
      apartment.offer.price = getRandomValueFromRange(1000, 1000000);
      apartment.offer.type = getRandomValueFromArray(Object.keys(window.Const.OFFER_TYPE_DISPLAY_NAMES));
      apartment.offer.rooms = getRandomValueFromRange(1, 5);
      apartment.offer.guests = getRandomValueFromRange(1, 10);
      apartment.offer.checkin = getRandomValueFromArray(window.Const.OFFER_TIME_EXAMPLES);
      apartment.offer.checkout = getRandomValueFromArray(window.Const.OFFER_TIME_EXAMPLES);
      apartment.offer.features = mixArray(window.Const.OFFER_FEATURE_EXAMPLES).slice(Math.round(window.Const.OFFER_FEATURE_EXAMPLES.length * Math.random()));
      apartment.offer.description = '';
      apartment.offer.photos = mixArray(window.Const.OFFER_PHOTO_EXAMPLES);

      apartments.push(apartment);
    }

    return apartments;
  };
})();
