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
    /* FILTRO PER CATEGORIA */
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
            div.classList.add('col-md-4');
            div.innerHTML = `
            <div class="card-sl m-3">
                        <div class="card-image">
                            <img src="${prod.image}"/>
                        </div>
                        <a class="card-action" href="#"><i class="fa fa-heart"></i></a>
                        <div class="card-heading">
                        ${prod.name}
                        </div>
                        <div class="card-text">
                         ${prod.category}
                        </div>
                        <div class="card-text">
                        ${prod.price}€
                        </div>
                        <a href="#" class="card-button"> Purchase</a>
                    </div>`
                    cardWrapper.appendChild(div);
        })
    }
    showCard(data);
    let radios = document.querySelectorAll('.form-check-input');
    function filterByCategory() {
        let checked = Array.from(radios).find(button=> button.checked);
        let categoryId = checked.id;
        if(categoryId == 'all'){
            showCard(data);
        } else {
            let filtered = data.filter(el => el.category == categoryId);
             showCard(filtered);
        }
    }
    radios.forEach(input => {
        input.addEventListener('click', () =>{
            filterByCategory();
        })
    })
});

