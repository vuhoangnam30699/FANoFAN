

// =============== best seller ================ //

var bestSellerContainer = document.getElementById("displayElement");
var categoryButtons = document.querySelectorAll("#pills-bar li");

// Show products by category
function displayProductsByCategory(category) {
  bestSellerContainer.innerHTML = "";

  fetch("./static/js/products.json")
    .then(response => response.json())
    .then(data => {
      var bestSellerProducts = data.bestseller;
      
      bestSellerProducts.forEach(product => {
        if (product.type === category) {
          var productHtml = `
            <div class="col-lg-3 col-md-6 col-sm-6 mb-3">
              <div class="card">
                <div class="card-body">
                  <img class="card-img-top" src="${product.img}" alt="${product.name}" data-toggle="modal" data-target="#productModal" 
                  onclick="showProductModal('${product.name}', '${product.img}', '${product.price}', '${product.brand}', '${product.color}', 
                  '${product.dimensions}', '${product.specialFeature}')">
                  <div class="title-title">
                    <h4 class="card-title text-center">${product.name}</h4>
                    <p class="card-text text-center">${product.price}</p>
                  </div>
                </div>
              </div>
            </div>
          `;
          bestSellerContainer.insertAdjacentHTML("beforeend", productHtml);
        }
      });
    });
}

// Select category
function selectCategory(category) {
  categoryButtons.forEach(button => {
    button.classList.remove("active");
  });

  var selectedButton = document.getElementById(category);
  selectedButton.classList.add("active");

  displayProductsByCategory(category);
}

// Handle event on click of category button

categoryButtons.forEach(button => {
  button.addEventListener("click", function() {
    var category = this.getAttribute("id");
    selectCategory(category);
  });
});

// Show default products

displayProductsByCategory("cellingfan");


// ============== special offer =============== //

var specialOfferContainer = document.getElementById("display_special");
var specialOfferProducts = []; // Save all special offer's products
var currentPage = 1; // Current page
var productsPerPage = 6; // Number products per page

// Create a page button click handler
function createPageButtonClickHandler(page) {
  return function() {
    goToPage(page);
  }
}

// Display number of pages and buttons
function displayPageButtons() {
  var totalPages = Math.ceil(specialOfferProducts.length / productsPerPage);
  var pageButtonsContainer = document.getElementById("pageButtons");
  pageButtonsContainer.innerHTML = ""; // Xóa nút trang cũ

  for (var i = 1; i <= totalPages; i++) {
    var pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.classList.add("page-btn");
    if (i === currentPage) {
      pageButton.classList.add("active");
    }

    pageButton.addEventListener("click", createPageButtonClickHandler(i));

    pageButtonsContainer.appendChild(pageButton);
  }
}

// Display the products in current page
function displayCurrentPageProducts() {
  specialOfferContainer.innerHTML = ""; // Xóa nội dung hiển thị cũ

  var startIndex = (currentPage - 1) * productsPerPage;
  var endIndex = startIndex + productsPerPage;
  var currentProducts = specialOfferProducts.slice(startIndex, endIndex);

  currentProducts.forEach(product => {
    var productHtml = `
      <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
        <div class="card">
          <div class="card-body">
            <img class="card-img-top" src="${product.img}" alt="${product.name}" data-toggle="modal" data-target="#productModal" onclick="showProductModal('${product.name}', '${product.img}', '${product.price}', '${product.brand}', '${product.color}', '${product.dimensions}', '${product.specialFeature}')">
            <div class="title-title">
              <h4 class="card-title text-center">${product.name}</h4>
              <p class="old-price text-center" style="text-decoration: line-through">${product.oldPrice}</p>
              <p class="card-text text-center">${product.price}</p>
            </div>
          </div>
        </div>
      </div>
    `;
    specialOfferContainer.insertAdjacentHTML("beforeend", productHtml);
  });

  displayPageButtons();
}

// Go to previous page
function goToPreviousPage() {
  if (currentPage > 1) {
    currentPage--;
    displayCurrentPageProducts();
  }
}

// Go to next page
function goToNextPage() {
  var totalPages = Math.ceil(specialOfferProducts.length / productsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayCurrentPageProducts();
  }
}

// Display the current page
function goToPage(page) {
  currentPage = page;
  displayCurrentPageProducts();
}

// Takes data from JSON

fetch("./static/js/products.json")
  .then(response => response.json())
  .then(data => {
    specialOfferProducts = data["special-offer"];
    displayCurrentPageProducts();
  });



