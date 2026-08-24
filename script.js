/* =========================
   ORABI WEBSITE
========================= */


/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader = document.getElementById("loader");

        if (loader) {
            loader.classList.add("hide");
        }

    }, 900);

});


/* =========================
   MOBILE MENU
========================= */

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


/* =========================
   SMOOTH SCROLL
========================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e) {

        const target =
            document.querySelector(
                this.getAttribute("href")
            );

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================
   SEARCH
========================= */

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

        const content =
            product.innerText
            .toLowerCase();

        const found =
            name.includes(value) ||
            content.includes(value);

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


/* =========================
   PRICE FILTER
========================= */

const filter =
    document.getElementById("filter");

function filterProducts() {

    if (!filter || !productsGrid) return;

    const value = filter.value;

    const products =
        productsGrid.querySelectorAll(".product");

    products.forEach(product => {

        const price =
            Number(product.dataset.price || 0);

        let show = true;

        if (value === "low") {

            show =
                price > 0 &&
                price < 15000;

        }

        if (value === "mid") {

            show =
                price >= 15000 &&
                price <= 20000;

        }

        if (value === "high") {

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


/* =========================
   PRODUCT DETAILS
========================= */

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

    document.getElementById(
        "modalTitle"
    ).textContent = title;

    document.getElementById(
        "modalCpu"
    ).textContent = cpu;

    document.getElementById(
        "modalRam"
    ).textContent = ram;

    document.getElementById(
        "modalStorage"
    ).textContent = storage;

    document.getElementById(
        "modalGpu"
    ).textContent = gpu;

    document.getElementById(
        "modalPrice"
    ).textContent = price;

    modal.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


/* =========================
   CLOSE PRODUCT
========================= */

function closeProduct() {

    const modal =
        document.getElementById("modal");

    if (!modal) return;

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================
   CLOSE MODAL OUTSIDE
========================= */

const modal =
    document.getElementById("modal");

if (modal) {

    modal.addEventListener("click", (e) => {

        if (e.target === modal) {

            closeProduct();

        }

    });

}


/* =========================
   ESC
========================= */

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        closeProduct();

    }

});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(
                            entry.target
                        );

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


/* =========================
   NO CUSTOM CURSOR
========================= */

const oldCursorDot =
    document.querySelector(".cursor-dot");

const oldCursorGlow =
    document.querySelector(".cursor-glow");

if (oldCursorDot) {
    oldCursorDot.remove();
}

if (oldCursorGlow) {
    oldCursorGlow.remove();
}


/* =========================
   READY
========================= */

console.log(
    "ORABI — Website Ready"
);
