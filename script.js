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
const facttitle = document.getElementById("funfactstitle");
const factlist = document.getElementsByClassName('funfact-item');

//for projects_list
const projectcardlist = document.querySelectorAll(".project-card");
const previousArrow = document.querySelector(".previousArrow");
const nextArrow = document.querySelector(".nextArrow");


//Event Listener Functions:
function setActiveCard(card){
  card.classList.remove("inactive-card","left-inactive","right-inactive");
  card.classList.add("active-card");
}

function setLeftCard(card){
  card.classList.remove("active-card","right-inactive","inactive-card");
  card.classList.add("left-inactive");
}

function setRightCard(card){
  card.classList.remove("active-card","left-inactive","inactive-card");
  card.classList.add("right-inactive");
}

function setInactiveCards(card,index){
  if (index + 2 < card.length) {
    card[index+2].classList.remove("active-card","left-inactive","right-inactive");
    card[index+2].classList.add("inactive-card");
  }
  if (index - 2 >= 0) {
    card[index-2].classList.remove("active-card","left-inactive","right-inactive");
    card[index-2].classList.add("inactive-card");
  }
  card[index].innerHTML = index;
}

function Click_projectcard(card){

  if(card.dataset.isClicked == "False"){
    card.style.cssText = "transform: scale(2);";
    card.dataset.isClicked = "True";
  }
  else{
    card.style.cssText = "transform: scale(1);";
    card.dataset.isClicked = "False";
  }
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

for(let i = 0; i<projectcardlist.length; i++){
  const card = projectcardlist[i]; //must have "LET/const CARD" not just card. if not doesn't work.
  card.addEventListener('click', () => Click_projectcard(card));
  card.innerHTML  += projectCardIndex;
}                        // U NEED THIS ANONYMOUS FUNCTION ARROW.


//moves the carosel in the clockwise direction
previousArrow.addEventListener('click', () => { //messin with arrow functions shorthadnd
  setLeftCard(projectcardlist[projectCardIndex]);
  projectCardIndex-= 1;
  if(projectCardIndex < 0){
    projectCardIndex = (projectcardlist.length - 1); // minus 1 because lists start from 0 so the length is actually 1 shorter than we'd expect
  }
  setActiveCard(projectcardlist[projectCardIndex]);
  setRightCard(projectcardlist[projectCardIndex-1]);  
  setInactiveCards(projectcardlist,projectCardIndex);
    // something about like manually setting hte positions and cases if
    // the index = 0 or if index = the last one.

})
 

//this has a carosel moving counterclockwise
nextArrow.addEventListener('click',() =>{ //messin with arrow functions shorthadnd
  setRightCard((projectcardlist[projectCardIndex]));
  projectCardIndex+= 1;
  if(projectCardIndex >= projectcardlist.length){
    projectCardIndex = 0;
  }
  setActiveCard(projectcardlist[projectCardIndex]);
  setLeftCard(projectcardlist[projectCardIndex+1]);
  setInactiveCards(projectcardlist,projectCardIndex);
})

window.addEventListener('scroll', onscroll);

});

