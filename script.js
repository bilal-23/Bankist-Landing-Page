'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const navLinks = document.querySelectorAll('.nav__link');



/////Smooth Scrolling
btnScrollTo.addEventListener('click', function (e) {
    section1.scrollIntoView({ behavior: 'smooth' });

})

// function scrollInto(e) {
//     e.preventDefault()
//     const id = this.getAttribute('href');
//     document.querySelector(`${id}`).scrollIntoView({ behavior: 'smooth' })
// }
// //Nav Links
// navLinks.forEach(function (elem) {
//     elem.addEventListener('click', scrollInto(e))
// })


//SAME THING BUT WITH EVENT DELEGATION

//1.Add event listener to parent element
//2.Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault();
    if ((e.target).classList.contains(' nav__link')) {
        const id = (e.target).getAttribute('href')
        document.querySelector(`${id}`).scrollIntoView({ behavior: 'smooth' })
    }
})


//OPERATIONS TABBED CONTAINER
const tabs = document.querySelectorAll('.operations__tab')
const tabContainer = document.querySelector('.operations__tab-container')
const tabContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.operations__tab');
    ///Guard Clause
    if (!clicked) return;

    //Active Tab
    tabs.forEach(t => t.classList.remove('operations__tab--active'))
    tabContent.forEach(t => t.classList.remove('operations__content--active'))



    //ACTIVE AREA CONTENT
    clicked.classList.add('operations__tab--active');

    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})







///////////////

// const openModal = function () {
//     modal.classList.remove('hidden');
//     overlay.classList.remove('hidden');
// };

// const closeModal = function () {
//     modal.classList.add('hidden');
//     overlay.classList.add('hidden');
// };

// for (let i = 0; i < btnsOpenModal.length; i++)
//     btnsOpenModal[i].addEventListener('click', openModal);

// btnCloseModal.addEventListener('click', closeModal);
// overlay.addEventListener('click', closeModal);

// document.addEventListener('keydown', function (e) {
//     if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
//         closeModal();
//     }
// });