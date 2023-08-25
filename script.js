document.addEventListener('DOMContentLoaded', function() {

function please(element){
  const observer = new IntersectionObserver((entires) =>
  entires.forEach((entry) => {
    if(entry.isIntersecting){
      return true;
    }
    else{
      return false;
    }
  })
  );
}

  const CheckItemInViewnew = new IntersectionObserver((entries) => { //figure out this issue and why it's not working
  entries.forEach(element => {
    if(element.isIntersecting){
      return true;
    }
    else{
      return false;
    }
  });
  
});

function CheckItemInView(item){
  const rectangle = item.getBoundingClientRect();
  return (
    rectangle.top + 30 >= 0 &&
    rectangle.bottom - 60<= (window.innerHeight || document.documentElement.clientHeight)
  );
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//GETTING ITEMS
// const rootStyles = getComputedStyle(document.head);

// const heymynameAnimationDuration = rootStyles.getPropertyValue('--heymyname-animation-duration');
// const mynameDescriptionDelay = rootStyles.getPropertyValue('--');

//for icons
const linkedinLogo = document.getElementById('linkedinlogo');
const githublogo = document.getElementById('githublogo');
const emailLogo = document.getElementById('imessagelogo');
const iconLogoList = [linkedinLogo,githublogo,emailLogo];


//for the landing page scroll down animations
const landingpagediv = document.querySelector('#landingpagecontainer');
const landingpagesubdivs = document.querySelectorAll("#landingpagecontainer div");
const landingpageInitialHeight = landingpagediv.getBoundingClientRect().top;
const titletext = document.querySelector('.titletext');
const landingpagediv_rect = landingpagediv.getBoundingClientRect();

// for the fun fact animations
const factlist = document.getElementsByClassName('list-item');

//for projects_list
const allDivs = document.querySelectorAll("div");
const ignoredDivs = ['xmark','popup-Project-Description','popup-Project-Title','popup-Project-Extended-Description','my-projects-container','popup-subelement','Label'];
const projectCardList = document.querySelectorAll('.project-card-hidden'); //finally, don't do get elements by classname - AND DON'T USE DOUBLE QUOTES
const djangoWebapp = document.querySelector('#project-django-container');
projectPopup = document.querySelector('#popup-Project');

const xmark = document.querySelector('.fa-xmark');

function BlurEverythingExcept(exceptionObject){
  allDivs.forEach(element => {
    if(element == exceptionObject){ // Ithink this might be redundant because of the next else if, but whatever.
      element.style.cssText = "filter: blur(0px); z-index: 2;"
    }
    else if(ignoredDivs.includes(element.id)){
      ignoredElement = document.getElementById(element.id); 
      ignoredElement.style.cssText = "filter: blur(0px); z-index: 2;";
    }
    else{
      element.style.cssText = "filter: blur(3px); transition: all 2s ease;";
    }  
    exceptionObject.style.cssText = "filter: blur(0px);"
  });
}

function UnblurEverything(){
  allDivs.forEach(element => { 
    if(ignoredDivs.includes(element.id)){
      ;
    } 
    else {
      element.style.cssText = "filter: blur(0px);";

    }  
  });
}
//Event Listener Functions:

function Click_projectcard(card){ 
  projectPopup.dataset.isopen = true;
  console.log(projectPopup.dataset);
  projectPopup.classList.add('popup-Project');
  id = card.id;
  let delay = 0;
  //I tried to make this cleaner by getting all sub elements, but it wouldn't work, so we're going for functionality > being fancy
  const subDivList = document.querySelectorAll('.popup-subelement');

  //getting elements to insert into div
  projectTitle = document.getElementById(id).getElementsByClassName("project-title")[0];
  projectDescription = document.getElementById(id).getElementsByClassName("project-description")[0];
  //getting the popupcard divs that will modified (no need to make variables)
  document.getElementById("popup-Project-Title").innerHTML = projectTitle.innerHTML;
  document.getElementById("popup-Project-Description").innerHTML = projectDescription.innerHTML;
  projectPopup.classList.remove("popup-Project","reverse-project-card");  
  projectPopup.classList.add("project-card-popup");
  BlurEverythingExcept(projectPopup);
  xmark.style.top = '0';
  xmark.style.right = '0'
  xmark.style.cssText = 'transition: opacity 1s 0s;' // need to add this cuz it resets every click.
  xmark.classList.add("fa-xmark-clicked");
  if(card.getAttribute("data-is-clicked") == false){
    card.style.cssText = "transform: scale(.85);"
    card.getAttribute(Boolean("data-is-clicked")) == true;
  }
}

function Click_Xmark(){
  let delay = 0;
  //I tried to make this cleaner by getting all sub elements, but it wouldn't work, so we're going for functionality > being fancy
  const subDivList = document.querySelectorAll('.popup-subelement');
  let projectPopup = document.getElementById('popup-Project');
  projectPopup.classList.add('reverse-project-card');

  UnblurEverything();
  xmark.style.cssText = 'opacity: 0; transition: opacity .2s;'
  xmark.classList.remove('fa-xmark-clicked');
  subDivList.forEach(element => {
    element.style.animationName = 'staggerup';
    element.style.animationDuration = '1s';
    element.style.animationDelay =  delay + 's';
    element.style.animationTimingFunction = 'ease';
    element.style.animationFillMode = 'forwards';
    // element.style.cssText = 'opacity: 1; animation-delay: ' + delay.toString() + 's; animation: .5s ease forwards reverse staggerdown;';
    delay += .05;
  });
  projectPopup.dataset.isopen = false;

  function wasteoftime() {
    if(projectPopup.getAttribute('data-is-open') == false){
      projectPopup.classList.add('popup-Project');
      console.log(projectPopup.dataset);

      console.log("added class!");
    }
    else {
      ;
    }
  }
  // projectPopup.classList.add('popup-Project');
}

function onMouseMove(mouse){
  // console.log(mouse.x +  mouse.y);
}

function staggerAnimation(elementlist,hiddenclass,showclass,delay,delayincrement){
  elementlist.forEach(element => {
    element.classList.remove(hiddenclass);
    element.classList.add(showclass);
    delay += delayincrement;
    element.style.cssText = 'transition-delay: ' + delay + 's';
  })

}

let isFirstScroll = true;

function onscroll(){
  if(CheckItemInView(djangoWebapp) && isFirstScroll){
    staggerAnimation(projectCardList,'project-card-hidden','project-card',0.1,0.1);
    isFirstScroll = false;
  }
  else{
    projectCardList.forEach(element => {
      element.style.cssText = 'transition-delay: 0s';
    })
  }
 

  const viewportHeight = window.innerHeight; //check height of window.
  //checking for fact list stuff
  for(let i=0;i<factlist.length;i++){
    factitem = factlist[i];
    if(CheckItemInView(factitem)){
      factitem.style.cssText = "opacity: 1; filter: blur(0px); transform: translateX(0); letter-spacing: normal;";
    }    
    else { // keep this in an else statement so that the effect doesn't reset every
      factitem.style.cssText = "opacity: 0; filter: blur(20px); transform: translateX(-50%);letter-spacing: -2px;"; //neccesary for effect to reset on scroll up
  }}



  //for landingpage stuff
  for(let i = 0; i<landingpagesubdivs.length;i++){
    let scrollAmount = window.scrollY;
    let landingpageitem = landingpagesubdivs[i];
    let origional = landingpageitem;
    if(scrollAmount > 150){//(landingpagediv_rect.top / -20)<landingpageInitialHeight){ // if we're scrolled
      // landingpageitem.style.cssText = "animation: " + landingpageitem.dataset.duration + " ease forwards reverse " + landingpageitem.dataset.delay + " 1 slidein;";
    }
    //this is some ratio I found for the top to the point at which  I want it to animation something else
    // heyDiv.style.animation = "3s ease reverse 0s 1 slidein;";
    else {
      landingpageitem.style.cssText = "filter: blur(0px);";
    }
  }  
}

function onIconHover(event){  
  let hiddendiv = document.getElementById('hiddeninfo-show');
  this.innerHTML = "chicken";
}
 
//RUNNING CODE

let projectCardIndex = 1;

for(let i = 0; i<projectCardList.length; i++){
  console.log(projectCardList[i]);
  let card = projectCardList[i]; //must have "LET/const CARD" not just card. if not doesn't work.
  card.addEventListener('click', () => Click_projectcard(card));
  
};                      // U NEED THIS ANONYMOUS FUNCTION ARROW.

window.addEventListener('scroll', onscroll);
window.addEventListener("mousemove",onMouseMove)
xmark.addEventListener('click', () => Click_Xmark());
// iconLogoList.forEach(element => {
//   element.addEventListener('mouseover',onIconHover);  
// });
staggerAnimation(iconLogoList,'icon-hidden','icon',5,.2);
});

