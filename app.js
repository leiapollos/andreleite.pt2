/////////////////////////////////////////////////////////////////////
//  Full Page Animation
/////////////////////////////////////////////////////////////////////

/*new fullpage('#fullpage', {
  navigation: true,
});*/


/////////////////////////////////////////////////////////////////////
//  Object Path
/////////////////////////////////////////////////////////////////////
gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(ScrollToPlugin)

const tween = gsap.timeline();
const bottom =  0;
const width = window.innerWidth;
tween.to(".paper-plane", {
  duration: 3,
  ease: Linear.easeNone,
  autoRotate: true,
  motionPath: {path: "#line", autoRotate: true,},
  /*{
    path: [
      { x: width * 0, y: bottom-30 },
      { x: width * 0.1, y: bottom },
      { x: width * 0.3, y: bottom-30 },
      { x: width * 0.4, y: bottom-30 },
      { x: width * 0.6, y: bottom },
      { x: width * 0.7, y: bottom-30 },
      { x: width * 0.9, y: bottom-30 },
    ],
    curviness: 0.5,
    autoRotate: true,
  },*/
});

const controller = new ScrollMagic.Controller();
const scene = new ScrollMagic.Scene({
  triggerElement: ".animation",
  duration: 2000,
  triggerHook: 0,
})
  .setTween(tween)
  .setPin(".animation")
  .addTo(controller);


var revealElements = document.getElementsByClassName("elementsToReveal");
const numberOfElements = revealElements.length;

scene.on("progress", function (event) {

    const line = document.getElementById("line");
    //line.style.width = (event.progress*100).toString() + "%";
    line.style.strokeDashoffset = ((1920-(event.progress*1920*0.85)));
    //console.log("Scene progress changed to " + line.style.strokeDashoffset + " " + event.progress);
    for(var i = 0; i < numberOfElements; i++){
      if(event.progress*100>=((i)*(100/numberOfElements))+10){
        //console.log(i + " on");
        addVisible(revealElements[i]);
      }else{
        
        //console.log(i + " off");
        removeVisible(revealElements[i]);
      }
    }
});

/*scene.on("end", function (event) {
  if(event.scrollDirection == "FORWARD"){
    gsap.to(window, {duration: 0.05, scrollTo:"#project"});
  }
});

scene.on("start", function (event) {
  if(event.scrollDirection == "REVERSE"){
    gsap.to(window, {duration: 0.05, scrollTo:"#parallax"});
  }
});*/

function addVisible(element){
  if(!element.classList.contains('visible'))
    element.classList.add('visible');
}
function removeVisible(element){
  if(element.classList.contains('visible'))
    element.classList.remove('visible');
}

/*const parallax = new ScrollMagic.Scene({
  triggerElement: ".background-parallax",
  duration: 20,
  triggerHook: 0,
})
  .setPin(".background-parallax")
  .addTo(controller);

parallax.on("end", function (event) {
  if(event.scrollDirection == "FORWARD"){
    gsap.to(window, {duration: 0.05, scrollTo:"#camera"});
  }
});

const project = new ScrollMagic.Scene({
  triggerElement: ".projects",
  duration: 20,
  triggerHook: 0,
})
  .setPin(".projects")
  .addTo(controller);

project.on("start", function (event) {
  if(event.scrollDirection == "REVERSE"){
    gsap.to(window, {duration: 0.05, scrollTo:"#camera"});
  }
});*/



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
VanillaTilt.init(document.querySelectorAll(".card"), {
  max: 25,
  speed: 50
});
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

/////////////////////////////////////////////////////////////////////
//  Projects
/////////////////////////////////////////////////////////////////////
