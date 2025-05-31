

// Add event scroll to "special sale" when you click the "SPECIAL OFFER" button

document.getElementById("special-offer-btn").addEventListener("click", function() {
    // Get "special sale" position
    const specialSaleOffset = document.getElementById("specialsale").offsetTop;
    
    // Make scroll smooth
    window.scrollTo({
      top: specialSaleOffset,
      behavior: "smooth"
    });
  });

  // Show Product Modal
function showProductModal(name, img, price, brand, color, dimensions, specialFeature) {
    let modalTitle = document.getElementById("modalTitle");
    let modalImage = document.getElementById("modalImage");
    let modalPrice = document.getElementById("modalPrice");
    let modalBrand = document.getElementById("modalBrand");
    let modalColor = document.getElementById("modalColor");
    let modalDimensions = document.getElementById("modalDimensions");
    let modalSpecialFeature = document.getElementById("modalSpecialFeature");
  
    modalTitle.textContent = name;
    modalImage.src = img;
    modalPrice.textContent = price;
    modalBrand.textContent = brand;
    modalColor.textContent = color;
    modalDimensions.textContent = dimensions;
    modalSpecialFeature.textContent = specialFeature;
  
    // Show the modal
  let modal = document.getElementById("productModal");
  modal.classList.add("show");
  modal.style.display = "block";

  // Add click event listener to close button
  let closeButton = document.querySelector("#productModal .btn-close");
  closeButton.addEventListener("click", function() {
    closeModal();
  });

  // Add click event listener to modal background
  modal.addEventListener("click", function(event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Function to close the modal
  function closeModal() {
    modal.classList.remove("show");
    modal.style.display = "none";
  }
  
}