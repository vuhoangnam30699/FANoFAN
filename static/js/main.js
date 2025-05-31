
// =================== Carousel ======================== //

function carousel() {
    const multipleCardCarousel = document.querySelector("#carouselExampleControls");
    if (window.matchMedia("(min-width: 576px)").matches) {
        const carousel = new bootstrap.Carousel(multipleCardCarousel, {
            interval: false,
            wrap: false
        });
        const carouselWidth = $(".carousel-inner")[0].scrollWidth;
        const cardWidth = $(".carousel-item").width();
        let scrollPosition = 0;

        $("#carouselExampleControls .carousel-control-next").on("click", function () {
            if (scrollPosition < carouselWidth - cardWidth * 3) {
                scrollPosition += cardWidth;
                $("#carouselExampleControls .carousel-inner").animate({
                    scrollLeft: scrollPosition
                }, 600);
            }
        });

        $("#carouselExampleControls .carousel-control-prev").on("click", function () {
            if (scrollPosition > 1) {
                scrollPosition -= cardWidth;
                $("#carouselExampleControls .carousel-inner").animate({
                    scrollLeft: scrollPosition
                }, 600);
            }
        });
    } else {
        $(multipleCardCarousel).addClass("slide");
    }
}

document.addEventListener("DOMContentLoaded", carousel);



// ====================== Tooltips ======================= //


$(function () {
    $('[data-bs-toggle="tooltip"]').tooltip();
});


// ==================== Search ========================= //


$('[data-bs-toggle="search"]').on("click", function () {
    $(".search-area-wrapper").show();
    $(".search-area-input").focus();
});

$(".search-area-wrapper .close-btn").on("click", function () {
    $(".search-area-wrapper").hide();
});


// ====================== Page Active ======================= //

$(function() {
    let path = window.location.href;
    $('ul li a').each(function() {
        if (this.href === path) {
            $(this).addClass('active');
        }
    });
});

// ====================== Dropdown Active ======================= //
const dropdown = document.getElementsByClassName("dropdown-toggle");
let i;

for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    });
}