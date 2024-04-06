/* NAVBAR */
let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');

function navHover(color1,color2){
    links.forEach((link)=>{
        link.addEventListener("mouseenter", ()=>{
            link.style.color = color1;
        });
        link.addEventListener("mouseleave", ()=>{
            link.style.color = color2;
        });
    });
};

function changeNavbar( background,) {
    navbar.classList.add(background);
};

navHover("var(--Orange)","var(--Black)");

window.addEventListener("scroll", ()=>{
    let scrolled = window.scrollY;
    
    if (scrolled > 0) {
        changeNavbar('nav-blur');
    }else{
        navbar.classList.remove('nav-blur');
        changeNavbar('nav-custom');
    };
    
});
/* Sezione SHOP */

fetch('./shop.json').then((response)=>response.json()).then((data)=> {
    let CategoryWrapper = document.querySelector('#CategoryWrapper');
    let cardWrapper = document.querySelector('#cardWrapper');
    function setCategory(params) {
        let category = data.map(el => el.category);
        let uniqueCategory = [];
        category.forEach(el => {
            if(!uniqueCategory.includes(el)){
                uniqueCategory.push(el);
            }
        });
        uniqueCategory.forEach(el => {
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = `
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="${el}">
                <label class="form-check-label" for="flexRadioDefault1">
                    ${el}
                </label>`
            CategoryWrapper.appendChild(div);    
        });
    };
    setCategory()
    /* SHOW CARDS */
    function showCard(array){
        array.sort((a,b)=> b.price - a.price);
        cardWrapper.innerHTML = '';
        array.forEach(prod=>{
            let div = document.createElement('div');
            div.classList.add('col-12','col-md-4');
            div.innerHTML = `
            <div class="card-sl m-3">
                        <div class="card-image">
                            <img src="${prod.image}"/>
                        </div>
                        <a class="card-action" href="#"><i class="fa fa-heart"></i></a>
                        <div class="card-heading">
                        <p class="font1">${prod.name}</p>
                        </div>
                        <div class="card-text">
                        <p class="font1">${prod.category}</p>
                        </div>
                        <div class="card-text pb-auto">
                        <p class="font1">${prod.price}€</p>
                        </div>
                        <a href="#" class="card-button">Aggiungi al carrello</a>
                    </div>`
                    cardWrapper.appendChild(div);
        })
    }
    showCard(data);
    /* FILTRO PER CATEGORIA */
    let radios = document.querySelectorAll('.form-check-input');
    function filterByCategory() {
        let checked = Array.from(radios).find(button=> button.checked);
        let categoryId = checked.id;
        if(categoryId == 'all'){
            showCard(data);
        } else {
            let filtered = data.filter(el => el.category == categoryId);
             return filtered;
        }
    }
    radios.forEach(input => {
        input.addEventListener('click', () =>{
            showCard(filterByCategory());
        })
    })
    /* FILTRO PER PREZZO */
    let ranged = document.querySelector('#range');
    let rangePrice = document.querySelector('#rangePrice');
    function setRangeMax() {
       let maxPrice = data[0].price;
       ranged.max = maxPrice;
       ranged.value = maxPrice;
       rangePrice.innerHTML = `${maxPrice}`;
    }
    setRangeMax();
    ranged.addEventListener('input', () => {
        rangePrice.innerHTML = `${ranged.value}`;
        filterByPrice();
    });
    function filterByPrice() {
        let filtered = data.filter(article => +article.price <= ranged.value);
        showCard(filtered);
    };
    let searchBar = document.querySelector('.search-bar');
    function filterByWord () {
        let filtered = data.filter(article => article.name.toLowerCase().includes(searchBar.value.toLowerCase()));
        showCard(filtered);
    }
    searchBar.addEventListener('input',() => {
        filterByWord();
    })
});

/* DARKMODE */
let btnDarkMode = document.querySelector('#btnDarkMode');
let isCliked = true;

btnDarkMode.addEventListener('click', () => {
    btnDarkMode.classList.add('fade-in');
    if(isCliked){ //dark mode
        document.documentElement.style.setProperty('--Black', 'rgb(250,250,250)');
        document.documentElement.style.setProperty('--White', 'rgb(26,26,26)');
        btnDarkMode.innerHTML = `<i class="fa-solid fa-sun fs-4 txt-orange"></i>`
        isCliked = false;
        localStorage.setItem('mode','dark');
        setTimeout(function() {
            btnDarkMode.classList.remove("fade-in");
        }, 1000);
    }else { // light mode
        document.documentElement.style.setProperty('--White', 'rgb(250,250,250)');
        document.documentElement.style.setProperty('--Black', 'rgb(26,26,26)');
        btnDarkMode.innerHTML = `<i class="fa-solid fa-moon fs-4 txt-orange"></i>`
        isCliked = true;
        localStorage.setItem('mode','light')
        setTimeout(function() {
            btnDarkMode.classList.remove("fade-in");
        }, 1000);
    }
});

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