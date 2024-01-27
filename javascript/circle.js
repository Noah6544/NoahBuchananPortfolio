const circle = document.getElementById('circle');

console.log(document.getElementsByClassName('project-card'));

window.addEventListener('mousemove', function(e){
    const mouseX = e.clientX;
    const mouseY = e.clientY; 
    circle.style.transform = `translate(${mouseX-15}px, ${mouseY-15}px)`
    keyframes =[{transform:`translate(${mouseX-15}px, ${mouseY-15}px)`}]
    circle.animate(keyframes,{duration: 1500})
})

divsToHover = ['#menu','#abouticon','#projects-icon','#experience-icon','#contact-icon','#home-icon','#linkedinlogo','#githublogo','#imessagelogo','#speedModifierDiv','#project-django-container']

// was trying to make it so that i don't have to manually type each id, but rather one class, take all those class objects and put them back into divs to hover, working on it.

// Array.from(divsToHover).forEach(initialElement => {
//     if(initialElement.startsWith(".")){ /*if the element is a class, we want all classes*/
//         console.log("true");    
//         list = document.getElementsByClassName(initialElement);
//         console.log(initialElement)
//         Array.from(list).forEach(element => {
//             divsToHover.push(element)
//         })
//     console.log(divsToHover);
//     console.log("confusion");
//     const index = divsToHover.indexOf(initialElement); //removes initialClass element
//     if (index > -1) { 
//         divsToHover.splice(index, 1);
//     }
// }
// })

console.log(divsToHover);

Array.from(divsToHover).forEach(element => {
    
    element = document.querySelector(element)
    console.log(element);
    element.addEventListener('mouseover', function(){
        circle.classList.toggle("circle-hovering");
   })   
   element.addEventListener('mouseout', function(){
        circle.classList.toggle("circle-hovering");
})})    




try {
    Array.from(divsToHover).forEach(element => {
    
        element = document.querySelector(element)
        console.log(element);
        element.addEventListener('mouseover', function(){
            circle.classList.toggle("circle-hovering");
       })   
       element.addEventListener('mouseout', function(){
            circle.classList.toggle("circle-hovering");
    })})    
    
  } catch (error) {
    console.error(error);
  }
  