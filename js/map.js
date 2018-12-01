'use strict';

var OFFER_TITLE_EXAMPLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPE_EXAMPLES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TIME_EXAMPLES = ['12:00', '13:00', '14:00'];
var OFFER_FEATURE_EXAMPLES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTO_EXAMPLES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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

  return mapPinElement;
};

var renderMapPins = function (mapArea, apartments) {
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < apartments.length; i++) {
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
  cardElement.querySelector('.popup__type').innerText = getOfferTypeDisplayName(apartment.offer.type);

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

var getOfferTypeDisplayName = function (type) {
  switch (type) {
    case 'palace':
      return 'Дворец';
    case 'flat':
      return 'Квартира';
    case 'house':
      return 'Дом';
    case 'bungalo':
      return 'Бунгало';
    default:
      return '';
  }
};

var renderCard = function (mapArea, apartment) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var cardElement = initCard(cardTemplate, apartment);
  mapArea.insertBefore(cardElement, mapArea.querySelector('.map__filters-container'));
};

(function () {
  var mapArea = document.querySelector('.map__pins');
  var apartments = mockApartments(mapArea.offsetWidth);

  renderMapPins(mapArea, apartments);
  renderCard(mapArea, apartments[0]);
}());
