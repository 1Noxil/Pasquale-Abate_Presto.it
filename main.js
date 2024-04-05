/* NAVBAR */
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


// JS SWIPER
var swiper = new Swiper(".mySwiper", {
    speed: 600,
    parallax: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

// JS RECENSIONI

let userName = document.querySelector('#userName');
let userSubtitle = document.querySelector('#userSubtitle');
let userReview = document.querySelector('#userReview');
let btnReview = document.querySelector('#btnReview');
let swiperWrapper = document.querySelector('.swiper-wrapper');

let sectionreviews = {
    'reviews': [
        {'name': "Elia" , 'title': "La mia piu' bella esperienza", 'description': "bellissima esperienza personale gentile, preparato, rapido , prezzi onestissimi" },
        {'name': "Vincinzo" , 'title': "Pessima esperienza", 'description': "sito digustoso e poco professionale" },
        {'name': "Laura" , 'title': "Esperienza COOL", 'description': "Accoglienza top, qualita' prodotti eccellente, lenta la spedizione " },
        {'name': "Stefano" , 'title': "Bello", 'description': "TOP!! :) " },
        {'name': "Giammarco" , 'title': "Altrove si trova di meglio", 'description': "le scarpe si sono rotte dopo 2 giorni! SCONSIGLIATO :(" },
        {'name': "Rocco" , 'title': "Bellissima esperienza", 'description': "Abbiamo mangiato bene ma i camerieri non sono stati professionali, comodo per il mordi e fuggi" },
    ],

    'showRev':function(){
        swiperWrapper.innerHTML= '';
        this.reviews.forEach((review) => {
            let div = document.createElement('div');
            div.classList.add('swiper-slide');
            div.innerHTML = `
            <div class="title" data-swiper-parallax="-300">${review.name}</div>
            <div class="subtitle" data-swiper-parallax="-200">${review.title}</div>
            <div class="text" data-swiper-parallax="-100">
            <p>“
                ${review.description}”
            </p>
            </div>
            `
            swiperWrapper.appendChild(div);
        });
        swiper.update();
    },
    'addRev':function(){
            this.reviews.push({'name': userName.value , 'title': userSubtitle.value, 'description': userReview.value },);
    },
 }


sectionreviews.showRev();

btnReview.addEventListener('click', () => {
    sectionreviews.addRev();
    sectionreviews.showRev();
    userName.value = '';
    userSubtitle.value= '';
    userReview.value= '';
    console.log(sectionreviews.reviews);
    swiper.update();
})



/* DARKMODE */
let btnDarkMode = document.querySelector('#btnDarkMode');
let isCliked = true;

btnDarkMode.addEventListener('click', () => {
    if(isCliked){ //dark mode
        document.documentElement.style.setProperty('--Black', 'rgb(250,250,250)');
        document.documentElement.style.setProperty('--White', 'rgb(26,26,26)');
        btnDarkMode.innerHTML = `<i class="fa-solid fa-sun fs-4 txt-orange"></i>`
        isCliked = false;
        localStorage.setItem('mode','dark')
    }else { // light mode
        document.documentElement.style.setProperty('--White', 'rgb(250,250,250)');
        document.documentElement.style.setProperty('--Black', 'rgb(26,26,26)');
        btnDarkMode.innerHTML = `<i class="fa-solid fa-moon fs-4 txt-orange"></i>`
        isCliked = true;
        localStorage.setItem('mode','light')
    }
})

let mode = localStorage.getItem('mode');
if(mode === 'dark'){
    document.documentElement.style.setProperty('--Black', 'rgb(250,250,250)');
    document.documentElement.style.setProperty('--White', 'rgb(26,26,26)');
    btnDarkMode.innerHTML = `<i class="fa-solid fa-sun fs-4 txt-orange"></i>`
    isCliked = false;
} else {
    document.documentElement.style.setProperty('--White', 'rgb(250,250,250)');
    document.documentElement.style.setProperty('--Black', 'rgb(26,26,26)');
    btnDarkMode.innerHTML = `<i class="fa-solid fa-moon fs-4 txt-orange"></i>`
    isCliked = true;
}