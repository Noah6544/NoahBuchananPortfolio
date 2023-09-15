
document.addEventListener('DOMContentLoaded', function() {

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

function BlurEverythingExcept(exceptionObject){
  allDivs.forEach(element => {
    if(element == exceptionObject){ // Ithink this might be redundant because of the next else if, but whatever.
      element.style.cssText = "filter: blur(0px); z-index: 2;"  //the problem has to do with trying to blur a gif. it just goes away if you try to blur a gif.
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

function Click_projectcard(){ 
  projectPopup.dataset.isopen = true;
  id = this.id;
  let delay = 0;
  //I tried to make this cleaner by getting all sub elements, but it wouldn't work, so we're going for functionality > being fancy
  const subDivList = document.querySelectorAll('.popup-subelement');
  //getting elements to insert into div
  let projectTitle = document.getElementById(id).getElementsByClassName("project-title")[0];
  let projectDescription = document.getElementById(id).getElementsByClassName("project-description")[0];
  let projectImage = document.getElementsByClassName('project-card-image')
  // let projectExtendedDescription = document.getElementById(id).getElementsByClassName("project-extended-description")[0];

  //getting the popupcard divs that will modified (no need to make variables)
  document.getElementById("popup-Project-Title").innerHTML = projectTitle.innerHTML;
  document.getElementById("popup-Project-Description").innerHTML = projectDescription.innerHTML;
  projectPopup.classList.add("project-card-popup");

  projectPopup.classList.remove("popup-Project-initial","reverse-project-card");  
  BlurEverythingExcept(projectPopup);

  xmark.style.cssText = 'transition: opacity 1s 0s;' // need to add this cuz it resets every click.
  xmark.classList.add("fa-xmark-clicked");
  if(this.getAttribute("data-is-clicked") == false){
    this.style.cssText = "transform: scale(.85);"
    this.getAttribute(Boolean("data-is-clicked")) == true;
  }
}

function Click_Xmark(){
  let delay = 0;
  //I tried to make this cleaner by getting all sub elements, but it wouldn't work, so we're going for functionality > being fancy
  const subDivList = document.querySelectorAll('.popup-subelement');
  let projectPopup = document.getElementById('popup-Project');
  projectPopup.classList.add('reverse-project-card','popup-Project-initial'); //LET'S GO, add the initial so it displays none, and then the animation works again. this took a lot of work to make the animation run more than once but we got it.
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
    delay += .1;
  });
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

function onMouseMove(mouse){
  // console.log(mouse.x +  mouse.y);
}

  function staggerAnimation(elementlist,hiddenclass,showclass,delay,delayincrement,duration,typeOfDelay){
    elementlist.forEach(element => {
      element.classList.remove(hiddenclass);
      element.classList.add(showclass);
      delay += delayincrement;
      element.style.cssText = typeOfDelay +'-duration: ' + duration + 's'; 
      element.style.cssText = typeOfDelay +'-delay: ' + delay + 's'; 

      element.addEventListener('transitionend', function() {
        // Reset the transition delay
        element.style.cssText = typeOfDelay +'-delay: 0s';
    });

    })
  }


function onIconHover(){  

  let hiddendiv = document.querySelector('#hiddeninfo');
  for(let i = 0;i<iconLogoList.length;i++){
    icon = iconLogoList[i];
    if(this==icon){
      hiddendiv.innerHTML = "*"+ iconInfoList[i].innerHTML;
    }
    else{
    }
  }
  hiddendiv.innerHtml = "";

}

function navbarIconHoverIn(){
  this.style.cssText = 'position: absolute; transition: all 1s ease; left 55px;';
}


function navbarIconHoverOut(){
  this.style.cssText = 'left: 0px;';
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
// const rootStyles = getComputedStyle(document.head);

// const heymynameAnimationDuration = rootStyles.getPropertyValue('--heymyname-animation-duration');
// const mynameDescriptionDelay = rootStyles.getPropertyValue('--');

//for icons
const linkedinLogo = document.querySelector('#linkedinlogo');
const linkedininfo = document.querySelector('#linkedininfo');
const githublogo = document.querySelector('#githublogo');
const githubinfo = document.querySelector('#githubinfo');
const emailLogo = document.querySelector('#imessagelogo');
const emailinfo = document.querySelector('#emailinfo');
const iconLogoList = [linkedinLogo,githublogo,emailLogo];
const iconInfoList = [linkedininfo,githubinfo,emailinfo];



//for the landing page scroll down animations
const landingpagediv = document.querySelector('#landingpagecontainer');
const landingpagesubdivs = document.querySelectorAll("#landingpagecontainer div");
const titletext = document.querySelector('.titletext');

// for the fun fact animations
const factlist = document.getElementsByClassName('list-item');

//for projects_list
const allDivs = document.querySelectorAll("div");
const xmark = document.querySelector('#close-project');
const ignoredDivs = ['xmark','popup-Project-Description','popup-Project-Title','popup-Project-Extended-Description','my-projects-container','popup-subelement','Label','close-project'];
const projectCardList = document.querySelectorAll('.project-card-hidden'); //finally, don't do get elements by classname - AND DON'T USE DOUBLE QUOTES
const djangoWebapp = document.querySelector('#project-django-container');
projectPopup = document.querySelector('#popup-Project');



//RUNNING CODE
 //NAVBAR LOADING
  const aboutIcon = document.querySelector('#abouticon');
  const projectsIcon = document.querySelector('#projects-icon');
  const experienceIcon = document.querySelector('#experience-icon');
  const funfactsIcon = document.querySelector('#funfacts-icon');
  const homeIcon = document.querySelector('#home-icon');
  const navbarIcons = [aboutIcon,projectsIcon,experienceIcon,funfactsIcon,homeIcon];

  staggerAnimation(navbarIcons,'navbar-item-hidden','navbar-item',5,.2,1,'transition');
  


let currentPage = (((window.location.pathname).split('/'))).pop() //omits the parent directory and just return the file name.

if (currentPage == 'home.html'){ //do all the homepage stuff
  
  function onscroll(){ //this is a page specific function. needs to be included under this home.html section.
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
        factitem.style.cssText = "opacity: 1; filter: blur(0px); transform: translateX(0);";
      }    
      else { // keep this in an else statement so that the effect doesn't reset every
        // factitem.style.cssText = "opacity: 0; filter: blur(20px); transform: translateX(-2%);"; //neccesary for effect to reset on scroll up
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

  let isFirstScroll = true;
  let projectCardIndex = 1;
  for(let i = 0; i<projectCardList.length; i++){
    console.log(projectCardList[i]);
    let card = projectCardList[i]; //must have "LET/const CARD" not just card. if not doesn't work.
    card.addEventListener('click', Click_projectcard);
  };                      // U NEED THIS ANONYMOUS FUNCTION ARROW.
  window.addEventListener('scroll', onscroll);
  window.addEventListener("mousemove",onMouseMove)
  xmark.addEventListener('click', () => Click_Xmark());
  iconLogoList.forEach(element => {
    element.addEventListener('mouseover',onIconHover);  
  });
  staggerAnimation(iconLogoList,'icon-hidden','icon',5,.2,'transition');

} else if (currentPage == 'about.html'){ //do all the about page stuff
  
}

});

