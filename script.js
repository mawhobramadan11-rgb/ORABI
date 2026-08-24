```javascript
/* =========================================================
   ORABI PREMIUM SCRIPT
========================================================= */


/* =========================================================
   LOADER
========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader = document.getElementById("loader");

        if (loader) {
            loader.classList.add("hide");
        }

    }, 900);

});


/* =========================================================
   MOBILE MENU
========================================================= */

const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

if (menu && nav) {

    menu.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {
            nav.classList.remove("active");
        });

    });

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e) {

        const selector = this.getAttribute("href");

        if (!selector || selector === "#") return;

        const target = document.querySelector(selector);

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold:0.12
            }
        );

    revealElements.forEach(element => {
        observer.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("show");
    });

}


/* =========================================================
   PREMIUM LAPTOP PARALLAX
   DESKTOP ONLY
========================================================= */

const laptop =
    document.getElementById("laptop3d");

const desktop =
    window.matchMedia("(min-width: 901px)");

if (laptop && desktop.matches) {

    let targetX = -10;
    let targetY = 5;

    let currentX = targetX;
    let currentY = targetY;

    document.addEventListener("mousemove", e => {

        targetX =
            (window.innerWidth / 2 - e.clientX) / 45 - 4;

        targetY =
            (window.innerHeight / 2 - e.clientY) / 65 + 3;

    });

    function animateLaptop() {

        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;

        laptop.style.transform =
            `rotateY(${currentX}deg)
             rotateX(${-currentY}deg)
             translateY(-5px)`;

        requestAnimationFrame(animateLaptop);
    }

    animateLaptop();

}


/* =========================================================
   PRODUCT SEARCH
========================================================= */

const searchInput =
    document.getElementById("search");

const productsGrid =
    document.getElementById("productsGrid");

function searchProducts() {

    if (!searchInput || !productsGrid) return;

    const value =
        searchInput.value
        .toLowerCase()
        .trim();

    const products =
        productsGrid.querySelectorAll(".product");

    products.forEach(product => {

        const name =
            (product.dataset.name || "")
            .toLowerCase();

        const text =
            product.innerText
            .toLowerCase();

        const match =
            name.includes(value) ||
            text.includes(value);

        product.style.display =
            match ? "" : "none";

    });

}

if (searchInput) {

    searchInput.addEventListener(
        "input",
        searchProducts
    );

}


/* =========================================================
   PRICE FILTER
========================================================= */

const filter =
    document.getElementById("filter");

function filterProducts() {

    if (!productsGrid || !filter) return;

    const selected =
        filter.value;

    const products =
        productsGrid.querySelectorAll(".product");

    products.forEach(product => {

        const price =
            Number(product.dataset.price || 0);

        let show = true;

        if (selected === "low") {

            show =
                price > 0 &&
                price < 15000;

        }

        else if (selected === "mid") {

            show =
                price >= 15000 &&
                price <= 20000;

        }

        else if (selected === "high") {

            show =
                price > 20000;

        }

        product.style.display =
            show ? "" : "none";

    });

}

if (filter) {

    filter.addEventListener(
        "change",
        filterProducts
    );

}


/* =========================================================
   PRODUCT MODAL
========================================================= */

function showProduct(
    title,
    cpu,
    ram,
    storage,
    gpu,
    price
) {

    const modal =
        document.getElementById("modal");

    if (!modal) return;

    const fields = {
        modalTitle:title,
        modalCpu:cpu,
        modalRam:ram,
        modalStorage:storage,
        modalGpu:gpu,
        modalPrice:price
    };

    Object.entries(fields).forEach(
        ([id,value]) => {

            const element =
                document.getElementById(id);

            if (element) {
                element.textContent = value;
            }

        }
    );

    modal.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


function closeProduct() {

    const modal =
        document.getElementById("modal");

    if (!modal) return;

    modal.classList.remove("active");

    document.body.style.overflow =
        "";

}


/* =========================================================
   CLOSE MODAL
========================================================= */

const productModal =
    document.getElementById("modal");

if (productModal) {

    productModal.addEventListener(
        "click",
        e => {

            if (e.target === productModal) {
                closeProduct();
            }

        }
    );

}

document.addEventListener(
    "keydown",
    e => {

        if (e.key === "Escape") {
            closeProduct();
        }

    }
);


/* =========================================================
   3D TILT FOR PRODUCT CARDS
========================================================= */

if (window.matchMedia("(min-width: 901px)").matches) {

    document
        .querySelectorAll(".product")
        .forEach(card => {

            card.addEventListener(
                "mousemove",
                e => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        e.clientX - rect.left;

                    const y =
                        e.clientY - rect.top;

                    const rotateY =
                        ((x / rect.width) - .5) * 4;

                    const rotateX =
                        ((y / rect.height) - .5) * -4;

                    card.style.transform =
                        `translateY(-10px)
                         perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)`;

                }
            );

            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform = "";

                }
            );

        });

}


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar =
    document.querySelector(".navbar");

window.addEventListener(
    "scroll",
    () => {

        if (!navbar) return;

        if (window.scrollY > 30) {

            navbar.style.background =
                "rgba(5,5,5,.88)";

        } else {

            navbar.style.background =
                "rgba(5,5,5,.55)";

        }

    },
    {passive:true}
);


/* =========================================================
   ORABI READY
========================================================= */

console.log(
    "ORABI Premium Experience Loaded."
);
```
