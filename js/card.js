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
  var openedCard = null;

  var initCard = function (apartment) {
    if (typeof apartment.offer === 'undefined') {
      return null;
    }

    var cardElem = cardTemplate.cloneNode(true);
    var titleElem = cardElem.querySelector('.popup__title');
    var addressElem = cardElem.querySelector('.popup__text--address');
    var priceElem = cardElem.querySelector('.popup__text--price');
    var typeElem = cardElem.querySelector('.popup__type');
    var capacityElem = cardElem.querySelector('.popup__text--capacity');
    var timeElem = cardElem.querySelector('.popup__text--time');
    var featuresElem = cardElem.querySelector('.popup__features');
    var descriptionElem = cardElem.querySelector('.popup__description');
    var photosElem = cardElem.querySelector('.popup__photos');
    var avatarElem = cardElem.querySelector('.popup__avatar');

    // title
    if (apartment.offer.title) {
      titleElem.innerHTML = apartment.offer.title;
    } else {
      titleElem.remove();
    }

    // address
    if (apartment.offer.address) {
      addressElem.innerText = apartment.offer.address;
    } else {
      addressElem.remove();
    }

    // price
    if (apartment.offer.price) {
      priceElem.innerHTML = '<span>/ночь</span>';
      priceElem.insertBefore(document.createTextNode(apartment.offer.price + '₽'), priceElem.firstChild);
    } else {
      priceElem.remove();
    }

    // type
    if (apartment.offer.type) {
      typeElem.innerText = window.Utils.offerTypeToDisplayNameMap[apartment.offer.type];
    } else {
      typeElem.remove();
    }

    // capacity
    if (apartment.offer.rooms && apartment.offer.guests) {
      capacityElem.innerText = apartment.offer.rooms + ' комнаты для ' + apartment.offer.guests + ' гостей';
    } else {
      capacityElem.remove();
    }

    // time
    if (apartment.offer.checkin && apartment.offer.checkout) {
      timeElem.innerText = 'Заезд после ' + apartment.offer.checkin + ', выезд до ' + apartment.offer.checkout;
    } else {
      timeElem.remove();
    }

    // features
    if (apartment.offer.features && apartment.offer.features.length) {
      featuresElem.innerHTML = '';

      apartment.offer.features.forEach(function (feature) {
        var listItem = document.createElement('li');
        listItem.classList.add('popup__feature');
        listItem.classList.add('popup__feature--' + feature);
        featuresElem.appendChild(listItem);
      });
    } else {
      featuresElem.remove();
    }

    // description
    if (apartment.offer.description) {
      cardElem.querySelector('.popup__description').innerText = apartment.offer.description;
    } else {
      descriptionElem.remove();
    }

    // photos
    if (apartment.offer.photos && apartment.offer.photos.length) {
      var photoTemplate = photosElem.querySelector('.popup__photo');
      photosElem.innerHTML = '';

      apartment.offer.photos.forEach(function (photoUrl) {
        var photoElem = photoTemplate.cloneNode();
        photoElem.src = photoUrl;
        photosElem.appendChild(photoElem);
      });
    } else {
      photosElem.remove();
    }

    // avatar
    if (apartment.author && apartment.author.avatar && !apartment.author.avatar.endsWith('default.png')) {
      avatarElem.src = apartment.author.avatar;
    } else {
      avatarElem.remove();
    }

    return cardElem;
  };

  var showCard = function (mapArea, apartment) {
    hideCard();

    openedCard = initCard(apartment);
    if (openedCard === null) {
      return;
    }
    mapArea.appendChild(openedCard);

    openedCard.querySelector('.popup__close').addEventListener('click', function () {
      hideCard();
      window.Pin.deactivatePin();
    });

    document.addEventListener('keydown', onEsc);
  };

  var onEsc = function (evt) {
    if (evt.keyCode === window.Utils.KeyCode.ESC) {
      hideCard();
      window.Pin.deactivatePin();
    }
  };

  var hideCard = function () {
    if (openedCard) {
      openedCard.remove();
      document.removeEventListener('keydown', onEsc);
    }
  };

  window.Card = {
    show: showCard,
    hide: hideCard
  };
})();
