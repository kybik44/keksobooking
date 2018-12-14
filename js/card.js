'use strict';

/**
 * Модуль Card
 *
 * Управление карточкой с объявлением
 * @param show - показать карточку
 * @param hide - скрыть карточку
 */
(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');

  var initCard = function (apartment) {
    var cardElement = cardTemplate.cloneNode(true);
    var priceElement = cardElement.querySelector('.popup__text--price');
    var featuresElement = cardElement.querySelector('.popup__features');
    var photosElement = cardElement.querySelector('.popup__photos');
    var fragment = document.createDocumentFragment();

    // title
    cardElement.querySelector('.popup__title').innerText = apartment.offer.title;

    // address
    cardElement.querySelector('.popup__text--address').innerText = apartment.offer.address;

    // price
    priceElement.innerHTML = '<span>/ночь</span>';
    priceElement.insertBefore(document.createTextNode(apartment.offer.price + '₽'), priceElement.firstChild);

    // type
    cardElement.querySelector('.popup__type').innerText = window.Const.OFFER_TYPE_DISPLAY_NAMES[apartment.offer.type];

    // capacity
    cardElement.querySelector('.popup__text--capacity').innerText = apartment.offer.rooms + ' комнаты для ' + apartment.offer.guests + ' гостей';

    // time
    cardElement.querySelector('.popup__text--time').innerText = 'Заезд после ' + apartment.offer.checkin + ', выезд до ' + apartment.offer.checkout;

    // features
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
    fragment = document.createDocumentFragment();

    for (var j = 0; j < apartment.offer.photos.length; j++) {
      var photo = photosElement.querySelector('.popup__photo').cloneNode();
      photo.src = apartment.offer.photos[j];
      fragment.appendChild(photo);
    }

    while (photosElement.firstChild) {
      photosElement.removeChild(photosElement.firstChild);
    }
    photosElement.appendChild(fragment);

    // avatar
    cardElement.querySelector('.popup__avatar').src = apartment.author.avatar;

    return cardElement;
  };

  var showCard = function (mapArea, apartment) {
    var cardElement = initCard(apartment);

    window.Card.hide();

    cardElement.querySelector('.popup__close').addEventListener('click', function () {
      window.Card.hide();
      window.Pin.deactivatePins();
    });

    mapArea.appendChild(cardElement);
  };

  var hideCard = function () {
    var existingMapCard = document.querySelector('.map__card');
    if (existingMapCard) {
      existingMapCard.remove();
    }
  };

  window.Card = {
    hide: hideCard,
    show: showCard
  };
})();
