document.addEventListener('DOMContentLoaded', function() {
import * as MainFunctions from './javascript/script.js';


const navbarIcons = [aboutIcon,projectsIcon,experienceIcon,funfactsIcon,homeIcon];
navbarIcons.forEach(element => {
    element.style.cssText = "background-color: black;";
});
MainFunctions.staggerAnimation(navbarIcons,'navbar-item-hidden','navbar-item',0,.2);


});