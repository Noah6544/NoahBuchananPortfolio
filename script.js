document.addEventListener('DOMContentLoaded', function() {

function CheckItemInView(item){
  const rectangle = item.getBoundingClientRect();
  return (
    rectangle.top >= 0 &&
    rectangle.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

//GETTING ITEM 

//getting root variables

const rootStyles = getComputedStyle(document.head);

const heymynameAnimationDuration = rootStyles.getPropertyValue('--heymyname-animation-duration');
const mynameDescriptionDelay = rootStyles.getPropertyValue('--')

//for the landing page scroll down animations
const landingpagediv = document.querySelector('#landingpagecontainer');
const landingpageInitialHeight = landingpagediv.getBoundingClientRect().top;
const titletext = document.querySelector('.titletext');
const landingpagediv_rect = landingpagediv.getBoundingClientRect();
// const heyDiv = document.$(#landingpagecontainer);
const mynameDiv = document.getElementById(myname);
const descriptionDiv = document.getElementById(description);
const portraitimgDiv = document.getElementById(portraitimg); 

// for the fun fact animations
const factlist = document.getElementsByClassName('funfact-item');


function onscroll() {

  const viewportHeight = window.innerHeight; //check height of window.
  
  //checking for fact list stuff
  for(let i=0;i<factlist.length;i++){
    factitem = factlist[i];
    factitem.style.cssText = "opacity: 0; filter: blur(10px); letter-spacing: -5px;"
    if(CheckItemInView(factitem)){
      factitem.style.cssText = "opacity: 1; filter: blur(0px); letter-spacing: normal;"
    }    
  }

  //for landingpage stuff

  
  if((landingpagediv_rect.top / -53)> landingpageInitialHeight){ // if we're scrolled
    //this is some ratio I found for the top to the point at which  I want it to animation something else
    const titletext = document.querySelector('.titletext');
    const titletextSubdivs = titletext.querySelectorAll('div');

    // heyDiv.style.animation = "3s ease reverse 0s 1 slidein;";
    for(let i = 0; i<titletextSubdivs.length;i++){
      console.log("YOU WE MADE IT CHEIF");

      const landingpageitem = titletextSubdivs[i] ;
      console.log(landingpageitem);
      landingpageitem.style.animation = "3s ease reverse  n  mm0s 1 slidein-reverse";
    }
  } 

  //for the titlelists animations 
  const titlelist = document.getElementsByClassName('titletext');

  // for(let i=0;i<titlelist.length'i++){
  //   titleitem = titlelist[i];
  // }
}

window.addEventListener('scroll',onscroll);

});