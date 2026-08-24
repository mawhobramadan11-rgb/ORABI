/* =========================
   ORABI WEBSITE SCRIPT
========================= */


/* LOADER */

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader = document.getElementById("loader");

        if (loader) {
            loader.classList.add("hide");
        }

    }, 1000);

});


/* MOBILE MENU */

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


/* SMOOTH SCROLL */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e) {

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* SCROLL REVEAL */

const revealElements =
    document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
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


/* PRODUCT SEARCH */

const searchInput =
    document.getElementById("search");

const productsGrid =
    document.getElementById("productsGrid");

function searchProducts() {

    if (!productsGrid || !searchInput) return;

    const value =
        searchInput.value.toLowerCase().trim();

    const products =
        productsGrid.querySelectorAll(".product");

    products.forEach(product => {

        const name =
            (product.dataset.name || "").toLowerCase();

        const text =
            product.innerText.toLowerCase();

        const found =
            name.includes(value) ||
            text.includes(value);

        product.style.display =
            found ? "" : "none";

    });

}

if (searchInput) {

    searchInput.addEventListener(
        "input",
        searchProducts
    );

}


/* PRICE FILTER */

const filter =
    document.getElementById("filter");

function filterProducts() {

    if (!productsGrid || !filter) return;

    const selected = filter.value;

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


/* PRODUCT MODAL */

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

    document.getElementById("modalTitle").textContent =
        title;

    document.getElementById("modalCpu").textContent =
        cpu;

    document.getElementById("modalRam").textContent =
        ram;

    document.getElementById("modalStorage").textContent =
        storage;

    document.getElementById("modalGpu").textContent =
        gpu;

    document.getElementById("modalPrice").textContent =
        price;

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* CLOSE MODAL */

function closeProduct() {

    const modal =
        document.getElementById("modal");

    if (!modal) return;

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


/* CLOSE MODAL BY CLICKING OUTSIDE */

const productModal =
    document.getElementById("modal");

if (productModal) {

    productModal.addEventListener("click", e => {

        if (e.target === productModal) {
            closeProduct();
        }

    });

}


/* ESC */

document.addEventListener("keydown", e => {

    if (e.key === "Escape") {
        closeProduct();
    }

});


console.log("ORABI website loaded successfully.");
