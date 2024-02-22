import Lenis from '@studio-freight/lenis'

import { gsap } from "gsap/dist/gsap";
    
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import Swiper from 'swiper';


gsap.registerPlugin(ScrollTrigger);

// LENIS SMOOTH SCROLL
let lenis;
if (Webflow.env("editor") === undefined) {
  lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 0.6,
    gestureOrientation: "vertical",
    normalizeWheel: false,
    smoothTouch: false
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}
$("[data-lenis-start]").on("click", function () {
  lenis.start();
});
$("[data-lenis-stop]").on("click", function () {
  lenis.stop();
});
$("[data-lenis-toggle]").on("click", function () {
  $(this).toggleClass("stop-scroll");
  if ($(this).hasClass("stop-scroll")) {
    lenis.stop();
  } else {
    lenis.start();
  }
});





$(".slider-main_component").each(function (index) {
  let loopMode = false;
  if ($(this).attr("loop-mode") === "true") {
    loopMode = true;
  }
  let sliderDuration = 300;
  if ($(this).attr("slider-duration") !== undefined) {
    sliderDuration = +$(this).attr("slider-duration");
  }
  const swiper = new Swiper($(this).find(".swiper")[0], {
    speed: sliderDuration,
    loop: loopMode,
    autoHeight: false,
    centeredSlides: loopMode,
    followFinger: true,
    freeMode: false,
    slideToClickedSlide: false,
    slidesPerView: 1,
    spaceBetween: "4%",
    rewind: false,
    autoplay: true,
    mousewheel: {
      forceToAxis: true
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },
    breakpoints: {
      // mobile landscape
      480: {
        slidesPerView: 1,
        spaceBetween: "4%"
      },
      // tablet
      768: {
        slidesPerView: 1,
        spaceBetween: "4%"
      },
      // desktop
      992: {
        slidesPerView: 1,
        spaceBetween: "4%"
      }
    },
    pagination: {
      el: $(this).find(".swiper-bullet-wrapper")[0],
      bulletActiveClass: "is-active",
      bulletClass: "swiper-bullet",
      bulletElement: "button",
      clickable: true
    },
    navigation: {
      nextEl: $(this).find(".swiper-next")[0],
      prevEl: $(this).find(".swiper-prev")[0],
      disabledClass: "is-disabled"
    },
    scrollbar: {
      el: $(this).find(".swiper-drag-wrapper")[0],
      draggable: true,
      dragClass: "swiper-drag",
      snapOnRelease: true
    },
    slideActiveClass: "is-active",
    slideDuplicateActiveClass: "is-active"
  });
});


//GASP
let mm = gsap.matchMedia();

mm.add("(min-width: 800px)", () => {
 let scrollTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".staggerimages",
    start: "-35% top",
    end: "bottom bottom",
    markers: false,
   // toggleActions: "play pause resume reverse"
  },
});

scrollTL.from(".animated-image", {
  opacity: 0,
  y: "6rem",
  duration: 1,
  stagger: { amount: 0.4, from: "Start" },
  duration: 1,
});

//-----------------------------------------------------------------------------------------------

let fadecat = gsap.timeline({
  scrollTrigger: {
    trigger: ".sectioncategory",
    start:  "-25% top",
    end: "bottom bottom",
    markers: true,
   // toggleActions: "play pause resume reverse"
  },
});

fadecat.from(".gallery", {
  opacity: 0,
  y: "6rem",
  duration: 1,
  stagger: { amount: 0.4, from: "Start" },
  duration: 1,
});

//-------------------------------------------------------------------------------------

let recentg = gsap.timeline({
  scrollTrigger: {
    trigger: ".sectionrecent",
    start: "-25% top",
    end: "bottom bottom",
    markers: false,
  //  toggleActions: "play none none reverse"

  },
});

recentg.from(".recentcard", {
  opacity: 0,
  y: "6rem",
  duration: 1,
  stagger: { amount: 0.4, from: "Start" },
  duration: 1,
});
});

mm.add("(max-width: 799px)", () => {
  // mobile setup code here...

gsap.from(".animated-image", {
  opacity: 0,
  y: "6rem",
  duration: 1,
  stagger: { amount: 0.4, from: "Start" },
  duration: 1,
});

//-----------------------------------------------------------------------------------------------

let fadecat = gsap.timeline({
  scrollTrigger: {
    trigger: ".section_category",
    start:  "-25% top",
    end: "bottom bottom",
    markers: false,
   // toggleActions: "play pause resume reverse"
  },
});

fadecat.from(".gallery", {
  opacity: 0,
  y: "6rem",
  duration: 1,
  stagger: { amount: 0.4, from: "Start" },
  duration: 1,
});

//-------------------------------------------------------------------------------------

let recentg = gsap.timeline({
  scrollTrigger: {
    trigger: ".sectionrecent",
    start: "-25% top",
    end: "bottom bottom",
    markers: false,
  //  toggleActions: "play none none reverse"

  },
});

recentg.from(".recentcard", {
  opacity: 0,
  y: "6rem",
  duration: 1,
  stagger: { amount: 0.4, from: "Start" },
  duration: 1,
});
});
