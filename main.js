let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');

function navHover(color1,color2){
    links.forEach((link)=>{
        link.addEventListener("mouseenter", ()=>{
            link.style.borderBottom = color1;
        });
        link.addEventListener("mouseleave", ()=>{
            link.style.borderBottom = color2;
        });
    });
};

function changeNavbar( background,) {
    navbar.classList.add(background);
};

navHover("2px solid var(--Orange)","transparent");

window.addEventListener("scroll", ()=>{
    let scrolled = window.scrollY;

    if (scrolled > 0) {
        changeNavbar('nav-blur');
    }else{
        navbar.classList.remove('nav-blur');
        changeNavbar('nav-custom');
    };

});

/* Feedback section */

let firstnumber = document.querySelector('#firstnumber');
let secondnumber = document.querySelector('#secondnumber');
let thirdnumber = document.querySelector('#thirdnumber');

function createInterval(number,element,timing) {
    let count = 0
    let interval = setInterval(()=> {
        if (count < number){
            count++;
            element.innerHTML = count;
        } else {
            clearInterval(interval);
        }
    },timing)
};
let check = false;
let observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting && check == false){
            createInterval(2500,firstnumber,10);
            createInterval(67,secondnumber,120);
            createInterval(6000,thirdnumber,5);
            check = true
        }
    })
});

observer.observe(firstnumber);
