/////////////////////////////////////////////////////////////////////
//  Object Path
/////////////////////////////////////////////////////////////////////
gsap.registerPlugin(MotionPathPlugin);

const tween = gsap.timeline();
tween.to(".paper-plane", {
  duration: 4,
  ease: Linear.easeNone,
  motionPath: {
    path: [
      { x: 100, y: -20 },
      { x: 300, y: 10 },
      { x: 500, y: 100 },
      { x: 750, y: -100 },
      { x: 350, y: -50 },
      { x: 600, y: 100 },
      { x: 800, y: 0 },
      { x: window.innerWidth, y: -250 },
    ],
    curviness: 0.99,
    autoRotate: true,
  },
});

const controller = new ScrollMagic.Controller();
const scene = new ScrollMagic.Scene({
  triggerElement: ".animation",
  duration: 3000,
  triggerHook: 0,
})
  .setTween(tween)
  .setPin(".animation")
  .addTo(controller);

/////////////////////////////////////////////////////////////////////
//  Letter Animation (Name)
/////////////////////////////////////////////////////////////////////

const logo = document.querySelectorAll("#logo-name path");
var animationLengthTime = 1.6;
var animationDelayTime = 0.25;
var fillAnimationTime = 0.5;
var fillAnimationDelayTime =
  animationLengthTime + logo.length * animationDelayTime;

//Set fill animation
document.querySelectorAll("#logo-name")[0].style.animation =
  "fill " +
  fillAnimationTime +
  "s ease forwards " +
  fillAnimationDelayTime +
  "s";
//Path animation for each letter
for (let i = 0; i < logo.length; i++) {
  //console.log(`Letter ${i} is ${logo[i].getTotalLength()}`);
  var delayIndex = logo.length - i - 1;
  var path = logo[i],
    length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;
  path.style.display = "block";
  path.style.animation =
    "line-anim " +
    animationLengthTime +
    "s ease forwards " +
    animationDelayTime * delayIndex +
    "s";
  setTimeout(
    fixStroke.bind(undefined, path),
    (delayIndex * animationDelayTime + animationLengthTime) * 1000
  );
}

function fixStroke(path) {
  path.style.strokeDasharray = 0;
}

/////////////////////////////////////////////////////////////////////
//  Parallax
/////////////////////////////////////////////////////////////////////
/**/
var parallaxScene = document.getElementById("parallax");
var parallaxInstance = new Parallax(parallaxScene, {
  selector: ".parallax",
  relativeInput: true,
});
parallaxInstance.limit(0, false);
/**/

/////////////////////////////////////////////////////////////////////
//  Navbar
/////////////////////////////////////////////////////////////////////

const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    //Toggle nav
    nav.classList.toggle("nav-active");

    //Animate Links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 5 + 0.2
        }s`;
      }
    });

    //Burger Animation
    burger.classList.toggle("toggle");
  });
};

navSlide();
