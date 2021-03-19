'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const navLinks = document.querySelectorAll('.nav__link');
const tabs = document.querySelectorAll('.operations__tab')
const tabContainer = document.querySelector('.operations__tab-container')
const tabContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const section1 = document.querySelector('#section--1')

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
    if ((e.target).classList.contains('navigation')) {

        const id = (e.target).getAttribute('href')
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
    }
})


//OPERATIONS TABBED CONTAINER


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

////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

//Nav links Hover Effects || Menu Fade Animation
function handleHover(e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');
        // console.log(link, siblings, logo)

        siblings.forEach(el => {
            if (el !== link) el.style.opacity = this;
        })

        logo.style.opacity = this;
    }
}
nav.addEventListener('mouseover', handleHover.bind(0.5));
//mouseenter deosnt bubble so we dont use it here and uses mouseover instead
nav.addEventListener('mouseout', handleHover.bind(1));

//The bind() method creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.

//e is automatically passed in the bind function and 'this' is equal to 0.5 & 1



////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

//STICKY NAVIGATION

// OLD WAY
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords)
// window.addEventListener('scroll', function () {
//     if (window.scrollY > initialCoords.top) {
//         nav.classList.add('sticky')
//     } else {
//         nav.classList.remove('sticky')

//     }
// })

// InterSection Observer API


// function obsCallBack(entries, observer) {
//     entries.forEach(entry => {  
//         if (entry.isIntersecting === false) {           //ENTRY is dependent on number of thresholds
//             nav.classList.add('sticky')
//         } else {
//             nav.classList.remove('sticky')

//         }
//     })



// }
// const obsOption = {
//     root: null,
//     threshold: 0.1,
// }
// const observer = new IntersectionObserver(obsCallBack, obsOption);
// observer.observe(document.querySelector('.header'))
const navHeight = nav.getBoundingClientRect().height


function stickyNav(entries, observer) {
    const [entry] = entries;
    if (entry.isIntersecting === false) {
        nav.classList.add('sticky')
    } else {
        nav.classList.remove('sticky')

    }
}

const headObserver = new IntersectionObserver(stickyNav, { root: null, threshold: 0, rootMargin: `-${navHeight}px` });
headObserver.observe(document.querySelector('.header'))

////////////////////////////////////////////////////
///////////////////////////////////////////////////

//Reveal Sections
// const allSections = document.querySelectorAll('.section')

// function revealSection(entries, observer) {
//     const [entry] = entries;
//     if (!entry.isIntersecting) return;

//     entry.target.classList.remove('section--hidden');
//     sectionObserver.unobserve(entry.target)
// }

// const sectionObserver = new IntersectionObserver(revealSection, {
//     root: null,
//     threshold: 0.15,
// });

// allSections.forEach(section => {
//     sectionObserver.observe(section);
//     section.classList.add('section--hidden');
// });
///////////////////////////////////////////////////
//////////////////////////////////////////////////

//Lazy Loading Images
const imgTarget = document.querySelectorAll('img[data-src]');
function loadImg(entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    //Replace src with data-src
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img')
    })
    imgObserver.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadImg, { root: null, threshold: 0, rootMargin: `200px` })
imgTarget.forEach(img => imgObserver.observe(img))
//////////////////////////////////////////////////////
///////////////////////////////////////////////////////

// SLIDER
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');


let curSlide = 0;
const maxSlide = slides.length;


// slides.forEach((s, i) => {
//     s.style.transform = `translateX(${i * 100}%)`
// })
function createDots() {
    slides.forEach((slide, index) => {
        dotContainer.insertAdjacentHTML('beforeend',
            `<button class= 'dots__dot' data-slide='${index}'></button>`
        )
    })
}

function activateDots(slide) {
    const dots = document.querySelectorAll('.dots__dot');
    dots.forEach(dot => {
        dot.classList.remove('dots__dot--active');
    });
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}

function goToSlide(slide) {
    slides.forEach((s, i) => {
        s.style.transform = `translateX(${100 * (i - slide)}%)`
    })
}

function nextSlide() {
    if (curSlide === maxSlide - 1) {
        curSlide = 0;
    } else {
        curSlide++;
    }
    goToSlide(curSlide);
    activateDots(curSlide);
}
function prevSlide() {
    if (curSlide === 0) {
        curSlide = maxSlide - 1;
    } else {
        curSlide--;
    }
    goToSlide(curSlide);
    activateDots(curSlide);
}



function init() {
    createDots();
    goToSlide(curSlide);
    activateDots(curSlide);
}
init();

//EVENT HANDLERS
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
document.addEventListener('keydown', function (e) {
    e.keyCode === 39 && nextSlide(); //right

    e.keyCode === 37 && prevSlide(); //left

});

dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
        const { slide } = e.target.dataset;
        goToSlide(slide);
        activateDots(slide);
    }
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