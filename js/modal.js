'use strict';

var showModal = function(result) {

    console.log(params.progress);
    var elements = document.getElementsByClassName(".show");

    while (elements.length > 0) {
        elements[0].classList.remove('show');
    }

    document.querySelector("#game-result").innerHTML = result;
    document.querySelector("#modal-one").classList.add('show');
    document.querySelector('#modal-overlay').classList.add('show');
};

var modalLinks = document.querySelectorAll('.show-modal');

for (var i = 0; i < modalLinks.length; i++) {
    modalLinks[i].addEventListener('click', showModal);
}

var hideModal = function(event) {
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.remove('show');
};

var closeButtons = document.querySelectorAll('.modal .close');

for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', hideModal);
}

document.querySelector('#modal-overlay').addEventListener('click', hideModal);

var modals = document.querySelectorAll('.modal');

for (var i = 0; i < modals.length; i++) {
    modals[i].addEventListener('click', function(event) {
        event.stopPropagation();
    });
}