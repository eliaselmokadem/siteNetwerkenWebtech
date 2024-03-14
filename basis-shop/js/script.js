// dit is de code voor de shooping cart knop

let addToCartButtons = document.querySelectorAll(".addToCartBtn");
let cartContainer = document.getElementById("cart");
let cart = [];
let wishList = [];
for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener("click", function () {
        const productName = document.getElementById(`article${i}`).querySelector("h3").innerText;
        const productPrice = parseFloat(document.getElementById(`article${i}`).querySelector("p").innerText);
        const productImage = document.getElementById(`article${i}`).querySelector("img").src;

        let productIndex = -1;
        for (let j = 0; j < cart.length; j++) {
            if (cart[j].name === productName) {
                productIndex = j;
                break;
            }
        }

        if (productIndex >= 0) {
            cart[productIndex].quantity++;
            cart[productIndex].total = cart[productIndex].quantity * productPrice;
        } else {
            cart.push({
                name: productName,
                quantity: 1,
                price: productPrice,
                total: productPrice,
                image: productImage
            });
        }
        updateCart();
    });
}

function updateCart() {
    cartContainer.innerHTML = "<h3>Foto</h3><h3>Product</h3><h3>Aantal</h3><h3>Prijs</h3>";
    let overallTotal = 0;
    
    for (const product of cart) {
        let { name, quantity, total, image } = product;
        overallTotal += total;
        let cartItem = document.createElement("table");
        cartItem.innerHTML = `
            <td><img src="${image}" alt="${name}"></td>
            <td>${name}</td>
            <td>${quantity}</td>
            <td>€ ${total}</td>
        `;
        cartContainer.appendChild(cartItem);
    }

    let vat = overallTotal * 0.21;
    let totalExclElement = document.createElement("p");
    totalExclElement.innerText = `totaal exclusief btw: € ${overallTotal.toFixed(2)}`;
    let vatElement = document.createElement("p");
    vatElement.innerText = `btw: € ${vat.toFixed(2)}`;
    let fullTotal = document.createElement("p");
    fullTotal.innerText = `Totaal: € ${(vat + overallTotal).toFixed(2)}`;

    cartContainer.appendChild(totalExclElement);
    cartContainer.appendChild(vatElement);
    cartContainer.appendChild(fullTotal);
};



// dit is de code voor de wishlist knop

let wishlistButtons = document.querySelectorAll('.addToWishlistBtn');

for (let i = 0; i < wishlistButtons.length; i++) {
  wishlistButtons[i].addEventListener('click', function (e) {
    let article = wishlistButtons[i].closest("article");

    wishlistButtons[i].classList.toggle("colored");

    if (wishlistButtons[i].classList.contains("colored")) {
      addToWishlist(article);
    } else {
      removeFromWishlist(article);
    }
  });
}

function addToWishlist(article) {
   wishList.push(article)
}

function removeFromWishlist(article) {
   //ik heb op internet opgezocht wat het tegenovergestelde was van .push en kwam splice tegen.
   wishList.splice(article,1);
   console.log(`${article.querySelector("h3").innerText} is niet meer in de wishlist array :(`);
};



//API gedeelte
let sectionforAPI = document.getElementById("section")
let apiFunction = () => {
    const apiUrl = 'https://randomuser.me/api/?results=12';

    fetch(apiUrl)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data)
        for (let i = 0; i < data.results.length; i++) {
          sectionforAPI.innerHTML += 
          ` <section>
            <figure>
            <img src="${data.results[i].picture.large}">
            </figure>
            <br>
            <br>
            <p>
            ${data.results[i].name.title}
            ${data.results[i].name.first}
            ${data.results[i].name.last}</p>
            <br>
            <p>
            Land:  ${data.results[i].location.country}
            </p>
            </section>`
        }
      })
      .catch(error => {
        console.error(error);
      });   
};

apiFunction();
