
// =====================================================
// ================== SEARCH ===========================
// =====================================================

fetch("./static/js/products.json")
.then(response => response.json())
.then(data => {
    const best_Seller = data.bestseller;
    const special_Offer = data["special-offer"];

    const resultsBox = document.querySelector(".result-box");
    const inputBox = document.getElementById("input-box");

    const allProducts = best_Seller.concat(special_Offer);

    inputBox.onkeyup = function () {
      let result = [];
      let input = inputBox.value.toLowerCase();

      if (input.toLowerCase().replace(/\s/g, "") === "best" || input.toLowerCase().replace(/\s/g, "") === "seller" || input.toLowerCase().replace(/\s/g, "") === "bestseller" ||  input.toLowerCase().replace(/\s/g, "") === "special-offer") {
        result = allProducts;
      } else if (input.length) {
        result = allProducts.filter((product) => {
          return (
            product.name.toLowerCase().includes(input) ||
            product.price.toLowerCase().includes(input) ||
            product.brand.toLowerCase().includes(input) ||
            product.color.toLowerCase().includes(input) ||
            product.type.toLowerCase().includes(input)
          );
        });
      }

      display(result, input);
    };

    function display(result, input) {
      const content = result.map((product) => {
        let additionalInfo = "";

        if (product.price.toLowerCase().includes(input)) {
          additionalInfo += `Price: ${product.price}<br>`;
        }
        if (product.brand.toLowerCase().includes(input)) {
          additionalInfo += `Brand: ${product.brand}<br>`;
        }
        if (product.color.toLowerCase().includes(input)) {
          additionalInfo += `Color: ${product.color}<br>`;
        }
        if (product.type.toLowerCase().includes(input)) {
          additionalInfo += `Type: ${product.type}<br>`;
        }

        return `<li data-id='${product.name}'>
                  <img src='${product.img}' alt='${product.name}' style='width: 50px; height: 50px; object-fit: cover;' />
                  ${product.name}<br>
                  ${additionalInfo}
                </li>`;
      });

      resultsBox.innerHTML = "<ul>" + content.join("") + "</ul>";
      
      const liItems = document.querySelectorAll(".result-box li");
      liItems.forEach((li) => {
        li.addEventListener("click", (event) => {
          const productId = event.target.getAttribute("data-id");
          window.location.href = "product-detail.html?id=" + encodeURIComponent(productId);
        });
      });
      
      if (result.length > 0) {
        resultsBox.style.display = "block";
      } else {
        resultsBox.style.display = "none";
      }
    }
});


// =====================================================
// ================== RESULT ===========================
// =====================================================

function displayProductInfo(productInfo) {
    const productInfoContainer = document.getElementById('product-info');
    productInfoContainer.innerHTML = `
                <img class="col-5 border-1" src="${productInfo.img}" alt="">
                <div class="detailproduct col-7 text-white bg-danger py-3 px-5">
                    <h3 class="title text-center ">${productInfo.name}</h3>
                    <p><strong>Type:</strong> ${productInfo.type}</p>
                    <p><strong>Price:</strong> ${productInfo.price}</p>
                    <p><strong>Brand:</strong> ${productInfo.brand}</p>
                    <p><strong>Color:</strong> ${productInfo.color}</p>
                    <p><strong>Dimensions:</strong> ${productInfo.dimensions}</p>
                    <p><strong>Special Feature:</strong> ${productInfo.specialFeature}</p>
                    <div class="d-flex justify-content-center">
                        <button class="text-center px-2 py-2" style="background-color: white; transition: background-color 0.3s;" 
                            onmouseover="this.style.backgroundColor='black';" 
                            onmouseout="this.style.backgroundColor='white';">
                            <a href="contact.html" class="text-danger" style="color: black; transition: color 0.3s;">For Distributors</a>
                        </button>
                    </div>
<!--                    <div class="buttonflex text-center mt-2 mb-3" >-->
<!--                        <a href="contact.html" class="px-2 py-3 bg-gray-800 text-white" style="border-radius: 5px">For Distribute</a>-->
<!--                    </div>-->

            `;
}


const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');


fetch("./static/js/products.json")
    .then(response => response.json())
    .then(data => {
        const best_Seller = data.bestseller;
        const special_Offer = data["special-offer"];

        const productInfo = best_Seller.concat(special_Offer).find(product => product.name === productId);
        if (productInfo) {
            displayProductInfo(productInfo);
        } else {
            console.log('Product not found');
        }
    })
    .catch(error => {
        console.log('Error fetching product data:', error);
    });