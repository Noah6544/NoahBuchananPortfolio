document.addEventListener('DOMContentLoaded', function() {

function CheckItemInView(item){
  const rectangle = item.getBoundingClientRect();
  return (
    rectangle.top >= 0 &&
    rectangle.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

//GETTING ITEMS
// const rootStyles = getComputedStyle(document.head);

// const heymynameAnimationDuration = rootStyles.getPropertyValue('--heymyname-animation-duration');
// const mynameDescriptionDelay = rootStyles.getPropertyValue('--');

//for the landing page scroll down animations
const landingpagediv = document.querySelector('#landingpagecontainer');
const landingpagesubdivs = document.querySelectorAll("#landingpagecontainer div");
const landingpageInitialHeight = landingpagediv.getBoundingClientRect().top;
const titletext = document.querySelector('.titletext');
const landingpagediv_rect = landingpagediv.getBoundingClientRect();

// for the fun fact animations
const factlist = document.getElementsByClassName('funfact-item');

//for projects_list
const projectCardList = document.querySelectorAll(".project-card");
projectPopup = document.querySelector(".popup-Project");
const xmark = document.querySelector(".fa-xmark");


//Event Listener Functions:

function Click_projectcard(card){ 
  id = card.id;
  projectTitle = document.getElementById(id).getElementsByClassName("project-title")[0];
  projectDescription =  document.getElementById(id).getElementsByClassName("project-description")[0];
  projectPopup.classList.remove("popup-Project");  
  projectPopup.classList.add("project-card-popup");
  if(card.getAttribute("data-is-clicked") == false){
    card.style.cssText = "transform: scale(.85);"
    card.getAttribute(Boolean("data-is-clicked")) == true;
  }


  

}

function onMouseMove(mouse){
  // console.log(mouse.x +  mouse.y);
}

function onscroll() {
  const viewportHeight = window.innerHeight; //check height of window.
  //checking for fact list stuff
  for(let i=0;i<factlist.length;i++){
    factitem = factlist[i];
    if(CheckItemInView(factitem)){
      factitem.style.cssText = "opacity: 1; filter: blur(0px); transform: translateX(0); letter-spacing: normal;";
    }    
    else { // keep this in an else statement so that the effect doesn't reset every
      factitem.style.cssText = "opacity: 0; filter: blur(20px); transform: translateX(-50%);letter-spacing: -2px;"; //neccesary for effect to reset on scroll up
    }
  }

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
 
//RUNNING CODE

let projectCardIndex = 1;

for(let i = 0; i<projectCardList.length; i++){
  console.log(projectCardList[i]);
  let card = projectCardList[i]; //must have "LET/const CARD" not just card. if not doesn't work.
  card.addEventListener('click', () => Click_projectcard(card));
  
};                      // U NEED THIS ANONYMOUS FUNCTION ARROW.

window.addEventListener('scroll', onscroll);
window.addEventListener("mousemove",onMouseMove)


});

