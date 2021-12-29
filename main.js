/* ------------------------------------------------------ */
/*                    Get DOM Elements                    */
/* ------------------------------------------------------ */

/* Navigation Elements */
const MAIN = document.querySelector('.main')
const NAV = document.querySelector('.nav')
const NAVBAR_TOGGLE = NAV.querySelector('.navbar-toggle');
const NAVBAR = NAV.querySelector('.navbar')
const NAV_LINKS = NAVBAR.querySelectorAll('.nav-link');

/* Slide Elements */
const SLIDES = MAIN.querySelectorAll('.slide');
const SLIDE_BTNS = MAIN.querySelectorAll('.slide-btn');
const SHOP_LINK = MAIN.querySelectorAll('.shop-link');


/* ------------------------------------------------------ */
/*                 Mobile Navigation Menu                 */
/* ------------------------------------------------------ */
NAVBAR_TOGGLE.addEventListener('click', function() {
    if (NAV.classList.contains('expanded')) {
        NAV.classList.remove('expanded');
        document.body.style.position = 'initial';
        MAIN.classList.remove('blur');
        NAVBAR_TOGGLE.setAttribute('aria-expanded', 'false');
    }
    else {
        NAV.classList.add('expanded');
        document.body.style.position = 'fixed';
        MAIN.classList.add('blur');
        NAVBAR_TOGGLE.setAttribute('aria-expanded', 'true');
    }
})

/* If user clicks outside of the navigation menu, close navigation menu */
MAIN.addEventListener('click', () => {
    if (NAV.classList.contains('expanded')) {
        NAV.classList.remove('expanded');
        document.body.style.position = 'initial';
        MAIN.classList.remove('blur');
        NAVBAR_TOGGLE.setAttribute('aria-expanded', 'false');
    }
})


/* Skip 'focus' on nav-links while they are hidden from view */
NAV_LINKS[0].addEventListener('focus', () => {
    if (window.getComputedStyle(NAVBAR).transform !== 'none') SLIDE_BTNS[0].focus();
})
NAV_LINKS[NAV_LINKS.length - 1].addEventListener('focus', () => {
    if (window.getComputedStyle(NAVBAR).transform !== 'none') NAVBAR_TOGGLE.focus();
})

/* When 'prev' button receives 'focus', close navigation menu if expanded */
SLIDE_BTNS[0].addEventListener('focus', () => {
    if (NAV.classList.contains('expanded')) {
        NAV.classList.remove('expanded');
        document.body.style.position = 'initial';
        MAIN.classList.remove('blur');
        NAVBAR_TOGGLE.setAttribute('aria-expanded', 'false');
    }
})

/* --------------- Window Resizing Issues --------------- */
let resizeTimer;
/* When user resizes browser window... */
window.addEventListener("resize", () => {
    /* Close navigation menu if expanded */
    if (NAV.classList.contains('expanded')) {
        NAV.classList.remove('expanded');
        document.body.style.position = 'initial';
        MAIN.classList.remove('blur');
        NAVBAR_TOGGLE.setAttribute('aria-expanded', 'false');
    }
    /* Prevent animations from triggering */
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
    }, 400);
});

/* ------------------------------------------------------ */
/*                         Slider                         */
/* ------------------------------------------------------ */
let slideIndex = 0;

SLIDE_BTNS.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (e.target.id === 'prev') {
            slideIndex--;
            if (slideIndex < 0) slideIndex = 2;
        }
        else if (e.target.id === 'next') {
            slideIndex++;
            if (slideIndex > 2) slideIndex = 0;
        }

        for (let slide of SLIDES) {
            if (slide.classList.contains('active')) slide.classList.remove('active');
        }
        SLIDES[slideIndex].classList.add('active');

        /* Make 'shop links' unfocusable for hidden slides */
        for (let link of SHOP_LINK) {
            if (!link.hasAttribute('tabindex')) link.setAttribute('tabindex', '-1');
        }
        /* Make 'shop link' focusable for displayed slide */
        SHOP_LINK[slideIndex].removeAttribute('tabindex');
    })
})
