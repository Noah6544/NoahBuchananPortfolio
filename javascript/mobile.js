function CheckItemInView(item){
  const rectangle = item.getBoundingClientRect();
  return (
    rectangle.top + 30 >= 0 &&
    rectangle.bottom - 60<= (window.innerHeight || document.documentElement.clientHeight)
  );
  

 
}

function getRandomNumber(min, max) {
    
  return Math.random() * (max - min) + min;
    
}
function BlurEverythingExcept(exceptionObject){
  const navbarClassNames = ['navbar-item-hidden','navbar','navbar-container','navbar-item'];
  let allDivs = document.querySelectorAll("div");
  allDivs.forEach(element => {      
    if(element == exceptionObject){ // Ithink this might be redundant because of the next else if, but whatever.
      element.style.cssText = "filter: blur(0px); z-index: 2;"   //the problem has to do with trying to blur a gif. it just goes away if you try to blur a gif.
    }
    else if(navbarClassNames.includes(element.className)){
      ; /*do nothing for navbar, ignore it and don't even update CSS, cuz that ruins its abosolute pos */
    }
    else if(ignoredDivs.includes(element.id)){
      ignoredElement = document.getElementById(element.id); 
      // ignoredElement.style.cssText = "filter: blur(0px); z-index: 2;";
    }
    else if(element.id =='project-django-image'){
      // element.removeChild
    }
    else{
     
      element.style.cssText += "filter: blur(15px); transition: all 2s ease;";
    }  
    exceptionObject.style.cssText = "filter: blur(0px);"
  });
  }
    
function UnblurEverything(){
  const navbarClassNames = ['navbar-item-hidden','navbar','navbar-container','navbar-item'];
  let allDivs = document.querySelectorAll("div");

  allDivs.forEach(element => { 
    if(ignoredDivs.includes(element.id)){
      ;
    } 
    else if(navbarClassNames.includes(element.className)){
      ; /*do nothing for navbar, ignore it and don't even update CSS, cuz that ruins its abosolute pos */
    }
    else {
      element.style.cssText = "filter: blur(0px); transition: all 1s ease;";
    }  
  });
  }  
   
function Click_projectcard(){ 
  projectPopup.dataset.isopen = true;
  id = this.id;
  let delay = 0;
  //I tried to make this cleaner by getting all sub elements, but it wouldn't work, so we're going for functionality > being fancy
  const subDivList = document.querySelectorAll('.popup-subelement');
  //getting elements to insert into div
  let projectTitle = document.getElementById(id).getElementsByClassName("project-title")[0];
  let projectDescription = document.getElementById(id).getElementsByClassName("project-description")[0];
  let extendedProjectDescription = document.getElementById(id).getElementsByClassName("project-extended-description")[0];

  let projectImage = document.getElementsByClassName('project-card-image')
  // let projectExtendedDescription = document.getElementById(id).getElementsByClassName("project-extended-description")[0];

  //getting the popupcard divs that will modified (no need to make variables)
  document.getElementById("popup-Project-Title").innerHTML = projectTitle.innerHTML;
  document.getElementById("popup-Project-Description").innerHTML = projectDescription.innerHTML;
  document.getElementById("popup-Project-Extended-Description").innerHTML = extendedProjectDescription.innerHTML;

  projectPopup.classList.add("project-card-popup");

  projectPopup.classList.remove("popup-Project-initial","reverse-project-card");  
  BlurEverythingExcept(projectPopup);
  Array.from(subDivList).forEach(element => {
    element.style.animationName = 'staggerup';
    element.style.animationDuration = '2s';
    element.style.animationDelay =  delay + 's';
    element.style.animationTimingFunction = 'ease';
    element.style.animationFillMode = 'forwards';
    element.style.animationDirection = 'reverse';
    // element.style.cssText = 'opacity: 1; animation-delay: ' + delay.toString() + 's; animation: .5s ease forwards reverse staggerdown;';
    delay += .1;
  });

  xmark.style.cssText = 'transition: opacity 1s 0s;' // need to add this cuz it resets every click.
  xmark.classList.add("xmark-show");
  // if(this.getAttribute("data-is-clicked") == false){
  //   this.style.cssText = "transform: scale(.85);"
  //   this.getAttribute(Boolean("data-is-clicked")) == true;
  // }
}

function Click_Xmark(){
  let delay = 0;
  //I tried to make this cleaner by getting all sub elements, but it wouldn't work, so we're going for functionality > being fancy
  let subDivList = document.getElementsByClassName('popup-subelement');
  // let projectPopup = document.getElementById('popup-Project');
  UnblurEverything();
  xmark.style.cssText = 'opacity: 0; transition: opacity .2s ease;'
  xmark.classList.remove('xmark-show');
  Array.from(subDivList).forEach(element => {
    element.style.animationName = 'staggerdown';
    element.style.animationDuration = '1s';
    element.style.animationDelay =  delay + 's';
    element.style.animationTimingFunction = 'ease';
    element.style.animationFillMode = 'forwards';
    element.style.animationDirection = 'normal';

    // element.style.cssText = 'opacity: 1; animation-delay: ' + delay.toString() + 's; animation: .5s ease forwards reverse staggerdown;';
    delay += .1;
  });
  projectPopup.classList.add('reverse-project-card','popup-Project-initial'); //LET'S GO, add the initial so it displays none, and then the animation works again. this took a lot of work to make the animation run more than once but we got it.

  projectPopup.dataset.isopen = false;

  // function wasteoftime() {
  //   if(projectPopup.getAttribute('data-is-open') == false){
  //     projectPopup.classList.add('popup-Project');
  //     console.log(projectPopup.dataset);

  //     console.log("added class!");
  //   }
  //   else {
  //     ;
  //   }
  // }
  // ALL of thE ABOVE SEEMS TO BE UNNEEDED
  // projectPopup.classList.add('popup-Project');
  }

function onload(){ //changed it so that it loads all list items on load in conjunction with all other items.
  const viewportHeight = window.innerHeight; //check height of window.
  //checking for fact list stuff
  let delay = 0; 
  Array.from(factlist).forEach(factitem => {
    factitem.style.cssText = "opacity: 1; filter: blur(0px); transform: translateX(0); transition-delay: " + delay + "s";
      delay += .1; 
  })
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


//Event Listener Functions:




function staggerAnimation(elementlist,hiddenclass,showclass,delay,delayincrement,duration,typeOfDelay){
  elementlist.forEach(element => {
    element.classList.remove(hiddenclass);
    element.classList.add(showclass);
    delay += delayincrement;
    element.style.cssText = typeOfDelay +'-duration: ' + duration + 's'; 
    element.style.cssText = typeOfDelay +'-delay: ' + delay + 's'; 

    element.addEventListener('transitionend', function() {
      // Reset the transition delay
      element.style.cssText += typeOfDelay +'-delay: 0s';
      element.style.cssText += 'pointer-events: all;' /* this is needed for the projects card */
  });

  })
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

//GETTING ITEMS
const menu = document.getElementById("menu");
const navbar = document.getElementById("navbar")
var isOpen = false;
console.log(window.innerWidth);
menu.addEventListener("click", function(){
  menu.classList.toggle("menu-open");

  if(isOpen){
    navbar.classList.remove("navbar")
    navbar.classList.add("navbar-hidden")
    isOpen = false;
  }
  else{
    navbar.classList.remove("navbar-hidden")
    navbar.classList.add("navbar")
    isOpen = true;
  }


})

// for the fun fact animations
const factlist = document.getElementsByClassName('list-item');
let allDivs = document.querySelectorAll("div");

//for projects_list
const ignoredDivs = ['project-image','projectspage-container','my-projects-container','xmark','popup-Project','popup-Project-Description','popup-Project-Title','popup-Project-Extended-Description','popup-subelement','Label'];    
const projectCardList = document.querySelectorAll('.project-card-hidden'); //finally, don't do get elements by classname - AND DON'T USE DOUBLE QUOTES
const xmark = document.querySelector('#xmark');
projectPopup = document.querySelector('#popup-Project');

//RUNNING CODE
 

let currentPage = (((window.location.pathname).split('/'))).pop() //omits the parent directory and just return the file name.
// if (screen.width <= 699) {
//   document.location = 'mobile.html';
// }
if (currentPage == 'index.html' || !currentPage || currentPage == ""){ //do all the homepage stuff


} else if (currentPage == 'about' || currentPage == 'about.html'){ //do all the about page stuff
  document.location = 'mobile.html';
  const winWidth = window.innerWidth;
  const winHeight = window.innerHeight;

  let hoverMeDiv = document.getElementById('hoverme');
  let descriptionTextDiv = document.querySelector('.description-text')

  let goofyClickDiv = document.getElementById('goofyClick')
 
  let scrollAmount = 0;
  let scrollSpeed = 0.01;
  let scrollSpeedInitial = 0.06; // Initial speed to reset back to later on
  let maxSpeed = 1 // Maximum speed, has to do with adding 20 to the scroll idk y.
  const growthRate = 1.025; // RATE of acceleratoin
  const slowRate = 1.015; //RATE of deceleration (idek how to spell that...)
  let isHovering = false;
  let imageGallery = document.querySelector('#about-image-gallery');
  let imageGalleryImages = document.getElementsByClassName('aboutimage');
  Array.from(imageGalleryImages).forEach(element => {
    element.addEventListener('mouseenter', function() {
      element.style.cssText = "transform: translateY(0px);";
      // currentImageDescription = document.getElementById(element.id+"1");
      isHovering = true;
    })
    element.addEventListener('mouseleave', function() {
      isHovering = false;
    })
  });

  function scrollGallery() {
    let currentTopImage = document.querySelector('.imageWrapper');
    let currentTopImageRect = currentTopImage.getBoundingClientRect();

    if(scrollSpeed == maxSpeed) {
      scrollAmount += parseFloat(scrollSpeed.toFixed(1));
    }
    else{
      scrollAmount += scrollSpeed;
    }

    count = 1;

    Array.from(imageGalleryImages).forEach(element => {
      if (currentTopImageRect.bottom <= 0) {
        // // actualElement = document.querySelector('.aboutimage #'+ );
        let parentDiv = currentTopImage;

        imageGallery.appendChild(parentDiv);
        Array.from(imageGalleryImages).forEach(img => {
          let imageGallery = document.querySelector('#about-image-gallery');

          imageGallery.style.cssText = "transform: translateY(" + (scrollAmount + window.scrollY + 19)  + "px);"; /* FIRST TRY WITH THE SCROLL Y LETS GO IT WORKED IM...not that smart.. BUT ALMOST!!!!*/
        });
      }
      else
      {
       element.parentElement.style.cssText = "transform: translateY(-"+scrollAmount+"px);";    

      }
      });

   
    if(isHovering){
      scrollSpeed = Number(Math.max(scrollSpeedInitial, scrollSpeed / slowRate));}
    else {
      scrollSpeed = Number(Math.min(maxSpeed, scrollSpeed * growthRate));
    }
  

  requestAnimationFrame(scrollGallery);

}

  scrollGallery();


}
  else if (currentPage == 'projects.html'){
    
    let isFirstScroll = true;
    let projectCardIndex = 1;

    for(let i = 0; i<projectCardList.length; i++){
      let card = projectCardList[i]; //must have "LET/const CARD" not just card. if not doesn't work.
      card.addEventListener('click', Click_projectcard);
    };                      // U NEED THIS ANONYMOUS FUNCTION ARROW.
      staggerAnimation(projectCardList,'project-card-hidden','project-card',.2,0.1,10,'transition');
      isFirstScroll = true;
  

      // projectCardList.forEach(element => {
      //   element.style.cssText = 'transition-delay: 0s';
      // })
      xmark.addEventListener('click', () => Click_Xmark());

  }
  else if (currentPage == 'experience.html'){
    window.addEventListener('load', onload());

  }
  else if (currentPage == 'funfacts.html'){

    window.addEventListener('load', onload);

  }

  else if(currentPage =='contact.html'){
    window.addEventListener('load', onload());

  };

