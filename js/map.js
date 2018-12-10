'use strict';

var MAP_PIN_ARROW_HEIGHT = 22;

var OFFER_TITLE_EXAMPLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var OFFER_TYPE_EXAMPLES = ['bungalo', 'flat', 'house', 'palace'];
var OFFER_TYPE_DISPLAY_NAMES = {
  'bungalo': 'Бунгало',
  'flat': 'Квартира',
  'house': 'Дом',
  'palace': 'Дворец'
};
var OFFER_TYPE_MIN_PRICE = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};
var OFFER_TIME_EXAMPLES = ['12:00', '13:00', '14:00'];
var OFFER_FEATURE_EXAMPLES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTO_EXAMPLES = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var ADFORM_ROOM_CAPACITY_MAPPING = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};
var ADFORM_ROOM_CAPACITY_HINT = {
  '1': 'В 1 комнате может проживать 1 гость.',
  '2': 'В 2 комнатах может проживать 1 или 2 гостя.',
  '3': 'В 3 комнатах может проживать 1, 2 или 3 гостя.',
  '100': '100 комнат не для гостей.'
};

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

var mockApartments = function (areaWidth) {
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
    apartment.offer.title = OFFER_TITLE_EXAMPLES[i];
    apartment.offer.address = apartment.location.x + ', ' + apartment.location.y;
    apartment.offer.price = getRandomValueFromRange(1000, 1000000);
    apartment.offer.type = getRandomValueFromArray(OFFER_TYPE_EXAMPLES);
    apartment.offer.rooms = getRandomValueFromRange(1, 5);
    apartment.offer.guests = getRandomValueFromRange(1, 10);
    apartment.offer.checkin = getRandomValueFromArray(OFFER_TIME_EXAMPLES);
    apartment.offer.checkout = getRandomValueFromArray(OFFER_TIME_EXAMPLES);
    apartment.offer.features = mixArray(OFFER_FEATURE_EXAMPLES).slice(Math.round(OFFER_FEATURE_EXAMPLES.length * Math.random()));
    apartment.offer.description = '';
    apartment.offer.photos = mixArray(OFFER_PHOTO_EXAMPLES);

    apartments.push(apartment);
  }

  return apartments;
};

var initMapPin = function (template, apartment) {
  var mapPinElement = template.cloneNode(true);

  mapPinElement.style.left = apartment.location.x - mapPinElement.offsetWidth / 2 + 'px';
  mapPinElement.style.top = apartment.location.y - mapPinElement.offsetHeight + 'px';
  mapPinElement.querySelector('img').src = apartment.author.avatar;
  mapPinElement.dataset.key = apartment.key;

  return mapPinElement;
};

var renderMapPins = function (mapArea, apartments) {
  var existingMapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  // remove existing pins
  for (var i = 0; i < existingMapPins.length; i++) {
    existingMapPins[i].remove();
  }

  for (i = 0; i < apartments.length; i++) {
    var mapPinElement = initMapPin(mapPinTemplate, apartments[i]);
    fragment.appendChild(mapPinElement);
  }

  mapArea.appendChild(fragment);
};

var initCard = function (template, apartment) {
  var cardElement = template.cloneNode(true);

  // title
  cardElement.querySelector('.popup__title').innerText = apartment.offer.title;

  // address
  cardElement.querySelector('.popup__text--address').innerText = apartment.offer.address;

  // price
  var priceElement = cardElement.querySelector('.popup__text--price');
  priceElement.innerHTML = '<span>/ночь</span>';
  priceElement.insertBefore(document.createTextNode(apartment.offer.price + '₽'), priceElement.firstChild);

  // type
  cardElement.querySelector('.popup__type').innerText = OFFER_TYPE_DISPLAY_NAMES[apartment.offer.type];

  // capacity
  cardElement.querySelector('.popup__text--capacity').innerText = apartment.offer.rooms + ' комнаты для ' + apartment.offer.guests + ' гостей';

  // time
  cardElement.querySelector('.popup__text--time').innerText = 'Заезд после ' + apartment.offer.checkin + ', выезд до ' + apartment.offer.checkout;

  // features
  var featuresElement = cardElement.querySelector('.popup__features');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < apartment.offer.features.length; i++) {
    var listItem = document.createElement('li');
    listItem.classList.add('popup__feature');
    listItem.classList.add('popup__feature--' + apartment.offer.features[i]);
    fragment.appendChild(listItem);
  }

  while (featuresElement.firstChild) {
    featuresElement.removeChild(featuresElement.firstChild);
  }
  featuresElement.appendChild(fragment);

  // description
  cardElement.querySelector('.popup__description').innerText = apartment.offer.description;

  // photos
  var photosElement = cardElement.querySelector('.popup__photos');
  fragment = document.createDocumentFragment();

  for (var j = 0; j < apartment.offer.photos.length; j++) {
    var photoElement = document.createElement('img');
    photoElement.classList.add('popup__photo');
    photoElement.width = 45;
    photoElement.height = 40;
    photoElement.alt = 'Фотография жилья';
    photoElement.src = apartment.offer.photos[j];
    fragment.appendChild(photoElement);
  }

  while (photosElement.firstChild) {
    photosElement.removeChild(photosElement.firstChild);
  }
  photosElement.appendChild(fragment);

  // avatar
  cardElement.querySelector('.popup__avatar').src = apartment.author.avatar;

  return cardElement;
};

var renderCard = function (mapArea, apartment) {
  var existingMapCard = document.querySelector('.map__card');
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var cardElement = initCard(cardTemplate, apartment);

  if (existingMapCard) {
    existingMapCard.remove();
  }

  cardElement.querySelector('.popup__close').addEventListener('click', function () {
    cardElement.remove();
  });

  mapArea.insertBefore(cardElement, mapArea.querySelector('.map__filters-container'));
};

var deactivateAdForm = function (disabled) {
  if (typeof disabled === 'undefined') {
    disabled = true;
  }

  var adForm = document.querySelector('.ad-form');
  var header = adForm.querySelector('.ad-form-header');
  var fieldsets = adForm.querySelectorAll('.ad-form__element');

  if (disabled) {
    adForm.classList.add('ad-form--disabled');
  } else {
    adForm.classList.remove('ad-form--disabled');
  }

  header.disabled = disabled;

  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = disabled;
  }
};

var activateAdForm = function () {
  deactivateAdForm(false);
};

var deactivateMap = function () {
  document.querySelector('.map').classList.add('map--faded');
};

var activateMap = function () {
  document.querySelector('.map').classList.remove('map--faded');
};

var getMapPinLocation = function (initialState) {
  var mapPinMain = document.querySelector('.map__pin--main');

  if (initialState) {
    return {
      x: Math.round(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2),
      y: Math.round(mapPinMain.offsetTop + mapPinMain.offsetHeight / 2)
    };
  } else {
    return {
      x: Math.round(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2),
      y: Math.round(mapPinMain.offsetTop + mapPinMain.offsetHeight + MAP_PIN_ARROW_HEIGHT)
    };
  }
};

var setAddressField = function (location) {
  document.querySelector('#address').value = location.x + ', ' + location.y;
};

var initMap = function () {
  var mapArea = document.querySelector('.map__pins');
  var mapPinMain = mapArea.querySelector('.map__pin--main');
  var apartments = mockApartments(mapArea.offsetWidth);

  mapArea.addEventListener('click', function (evt) {
    var target = evt.target;

    while (target !== mapArea) {
      if (target.classList.contains('map__pin')) {
        var key = target.dataset.key;
        if (key) {
          renderCard(mapArea, apartments[key]);
        }
        return;
      }
      target = target.parentNode;
    }
  });

  mapPinMain.addEventListener('mouseup', function () {
    activateMap();
    renderMapPins(mapArea, apartments);
    activateAdForm();
    setAddressField(getMapPinLocation());
  });
};

var initAdForm = function () {
  var adForm = document.querySelector('.ad-form');
  var typeSelect = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');
  var timeinSelect = adForm.querySelector('#timein');
  var timeoutSelect = adForm.querySelector('#timeout');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');
  var adFormReset = adForm.querySelector('.ad-form__reset');

  setAddressField(getMapPinLocation(true));

  typeSelect.addEventListener('change', function (evt) {
    priceInput.min = OFFER_TYPE_MIN_PRICE[evt.target.value];
    priceInput.placeholder = OFFER_TYPE_MIN_PRICE[evt.target.value];
  });

  timeinSelect.addEventListener('change', function (evt) {
    for (var i = 0; i < timeoutSelect.options.length; i++) {
      var option = timeoutSelect.options[i];
      if (evt.target.value === option.value) {
        option.selected = true;
      }
    }
  });

  timeoutSelect.addEventListener('change', function (evt) {
    for (var i = 0; i < timeinSelect.options.length; i++) {
      var option = timeinSelect.options[i];
      if (evt.target.value === option.value) {
        option.selected = true;
      }
    }
  });

  var checkCapacity = function (rooms, capacity) {
    var validCapacityArray = ADFORM_ROOM_CAPACITY_MAPPING[rooms];
    if (validCapacityArray.indexOf(capacity) === -1) {
      return ADFORM_ROOM_CAPACITY_HINT[rooms];
    }
    return '';
  };

  roomNumberSelect.addEventListener('change', function (evt) {
    var rooms = evt.target.value;
    var capacity = capacitySelect.value;
    capacitySelect.setCustomValidity(checkCapacity(rooms, capacity));
  });

  capacitySelect.addEventListener('change', function (evt) {
    var rooms = roomNumberSelect.value;
    var capacity = evt.target.value;
    capacitySelect.setCustomValidity(checkCapacity(rooms, capacity));
  });

  adFormReset.addEventListener('click', function (e) {
    e.preventDefault();
    adForm.reset();
    typeSelect.dispatchEvent(new Event('change', {}));
    setAddressField(getMapPinLocation());
  });
};

deactivateMap();
deactivateAdForm();
initMap();
initAdForm();

