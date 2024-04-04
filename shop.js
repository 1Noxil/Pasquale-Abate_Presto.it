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
    function setRange(params) {
        let range = data.map(el => el.price);
        let rangeLength = range.length - 1;
        range.sort((a,b)=> b.price - a.price);
        ranged.max = range[0];
        ranged.min = range[rangeLength];
    }
    setRange();
});

