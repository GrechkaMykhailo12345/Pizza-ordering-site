// Оголошуємо асинхронну функцію для отримання продуктів з сервера
async function getProducts() {
    // Виконуємо запит до файлу "store_db.json" та очікуємо на відповідь
    let response = await fetch("pizza.json")
    // Очікуємо на отримання та розпакування JSON-даних з відповіді
    let products = await response.json()
    // Повертаємо отримані продукти
    return products
};

// Функція для отримання значення кукі за ім'ям
function getCookieValue(cookieName) {
    // Розділяємо всі куки на окремі частини
    const cookies = document.cookie.split(';')
    // Шукаємо куки з вказаним ім'ям
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim() // Видаляємо зайві пробіли
        // Перевіряємо, чи починається поточне кукі з шуканого імені
        if (cookie.startsWith(cookieName + '=')) {
            // Якщо так, повертаємо значення кукі
            return cookie.substring(cookieName.length + 1) // +1 для пропуску "="
        }
    }
    // Якщо кукі з вказаним іменем не знайдено, повертаємо порожній рядок 
    return ''
}

class ShoppingCart {
    constructor() {
        this.items = {}
        this.loadCartFromCookies()
    }

    // Зберігання кошика в кукі
    saveCartToCookies() {
        let cartJSON = JSON.stringify(this.items);
        document.cookie = `cart=${cartJSON}; max-age=${60 * 60 * 24 * 7}; path=/`;
    }

    // Завантаження кошика з кукі
    loadCartFromCookies() {
        let cartCookie = getCookieValue('cart');
        if (cartCookie && cartCookie !== '') {
            this.items = JSON.parse(cartCookie);
        }
    }

    addItem(product) {
        if (this.items[pizza.id]) {
            this.items[pizza.id].quantity += 1
        } else {
            this.items[pizza.id] = product
            this.items[pizza.id].quantity = 1
        }
        this.saveCartToCookies()
    }
}

let cart = new ShoppingCart()

function addToCard(event) {
    let data = event.target.getAttribute('data-product')
    let pizza = JSON.parse(data)
    cart.addItem(pizza)

    console.log(cart.items)
}

getProducts().then(function (products) {

    if (pizza_list) {
        products.forEach(function (pizza) {
            pizza_list.innerHTML += getCardHtml(pizza)
        })
        let addBtn_list = document.querySelectorAll(".add-cart-btn")
        addBtn_list.forEach(function (btn) {
            btn.addEventListener("click", addToCard)
        })
    }

})

function getCartItem(pizza) {
    return `
         <div class="card my-2">
                <div class="row m-2 ">
                    <div class="col-2">
                        <img src="img/${pizza.image}" class="img-fluid">
                    </div>
                    <div class="col-6">
                        <h5>${pizza.title}</h5>
                    </div>
                    <div class="col-2">${pizza.quantity} шт.</div>
                    <div class="col-2">
                        <h4>${pizza.price * pizza.quantity} грн</h4>
                    </div>
                </div>
            </div>
    `
}

let main_screen = document.querySelector(".main-screen")
let all_products_btn = document.querySelector('.all-products-btn')
let all_products = document.querySelector("#all-products")
let first_page = document.querySelector("#first-page")
let about_btn = document.querySelector('.about-btn')
let about = document.querySelector('#about')
all_products_btn.addEventListener("click", function (e) {
    e.preventDefault()
    main_screen.style.display = "none"
    all_products.style.display = "block"
})

about_btn.addEventListener("click", function (e) {
    e.preventDefault()
    main_screen.style.display = "none"
    about_btn.style.display = "block"
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
    <button class="btn btn-primary">Додати в кошик</button>
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

let searchForm = document.querySelector('#searchForm')
searchForm.addEventListener('submit', searchProducts);

function searchProducts(event) {
    event.preventDefault();

    let query = doucment.querySelector('#searchForm').value.toLowerCase();
    let pizza_list = document.querySelector('.pizza-list');
    pizza_list.innerHTML = '';


    getProducts().then(function (products) {
        let pizza_list = document.querySelector('.pizza-list')
        products.forEach(function (pizza) {
            if (pizza.title.toLowerCase().includes(query) ||
               pizza.description.toLowerCase().includes(query)) {
            pizza_list.innerHTML += getCardHtml(pizza)
        }
    })
    let buyButtons = document.querySelectorAll('.pizza-list .cart-btn');
    buyButtons.forEach(function (button) {
        button.addEventListener('click', addToCard);

        });
    })
}