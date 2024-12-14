// Оголошуємо асинхронну функцію для отримання продуктів з сервера
async function getProducts() {
    // Виконуємо запит до файлу "store_db.json" та очікуємо на відповідь
    let response = await fetch("pizza.json")
    // Очікуємо на отримання та розпакування JSON-даних з відповіді
    let products = await response.json()
    // Повертаємо отримані продукти
    return products
};

let main_screen = document.querySelector(".main-screen")
let all_products_btn = document.querySelector('.all-products-btn')
let all_products = document.querySelector("#all-products")
all_products_btn.addEventListener("click", function (e){
    e.preventDefault()
    main_screen.style.display = "none"
    all_products.style.display = "block"
})

let pizza_list = document.querySelector('.pizza-list')

getProducts().then(function (products) {
    products.forEach(function (pizza) {
        pizza_list.innerHTML += getCardHtml(pizza)
    })
})

function getCardHtml(pizza) {
    return `<div class="card" style="width: 18rem;">
  <img src="img/${pizza.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${pizza.title}</h5>
    <h6>${pizza.price} грн</h6>
    <button class="btn btn-primary">Оплатити</button>
  </div>
</div>`
}

const swiper = new Swiper('.swiper', {
    // Optional parameters
    //direction: 'vertical',
    loop: true,
    autoplay: {
        delay: 5000,
    },
    slidesPerView: 1,
    updateOnWindowResize: true,
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },
    spaceBetween: 10,
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    /* scrollbar: {
      el: '.swiper-scrollbar',
    }, */
});
