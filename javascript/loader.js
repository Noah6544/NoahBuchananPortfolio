var script = document.createElement('script');
if(window.innerWidth > 700) {
    script.src = "/javascript/script.js";

}
else{
    script.src = "/javascript/mobile.js";
}

script.type = 'text/javascript';
script.defer = true;

document.getElementsByTagName('head')[0].appendChild(script);

