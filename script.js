/* =========================
   ORABI PREMIUM SCRIPT
========================= */


/* LOADER */

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader = document.getElementById("loader");

        if (loader) {
            loader.classList.add("hide");
        }

    }, 900);

});


/* NAVBAR */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

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

        const id = this.getAttribute("href");

        if (!id || id === "#") return;

        const target = document.querySelector(id);

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* SCROLL REVEAL */

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


/* LAPTOP 3D
   DESKTOP ONLY */

const laptop =
    document.getElementById("laptop3d");

if (
    laptop &&
    window.matchMedia("(min-width: 901px)").matches
) {

    document.addEventListener("mousemove", e => {

        const x =
            (window.innerWidth / 2 - e.clientX) / 70;

        const y =
            (window.innerHeight / 2 - e.clientY) / 90;

        laptop.style.transform =
            `rotateY(${x}deg) rotateX(${-y}deg) translateY(-8px)`;

    });

}


/* PRODUCT SEARCH */

const searchInput =
    document.getElementById("search");

const productsGrid =
    document.getElementById("productsGrid");

function updateProducts() {

    if (!productsGrid) return;

    const searchValue =
        searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

    const selected =
        document.getElementById("filter")
            ? document.getElementById("filter").value
            : "all";

    const products =
        productsGrid.querySelectorAll(".product");

    products.forEach(product => {

        const name =
            (product.dataset.name || "").toLowerCase();

        const text =
            product.innerText.toLowerCase();

        const price =
            Number(product.dataset.price || 0);

        let matchesSearch =
            name.includes(searchValue) ||
            text.includes(searchValue);

        let matchesFilter = true;

        if (selected === "low") {
            matchesFilter =
                price > 0 && price < 15000;
        }

        if (selected === "mid") {
            matchesFilter =
                price >= 15000 &&
                price <= 20000;
        }

        if (selected === "high") {
            matchesFilter =
                price > 20000;
        }

        product.style.display =
            matchesSearch && matchesFilter
                ? ""
                : "none";

    });

}


if (searchInput) {
    searchInput.addEventListener(
        "input",
        updateProducts
    );
}


const filter =
    document.getElementById("filter");

if (filter) {
    filter.addEventListener(
        "change",
        updateProducts
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


/* PARALLAX */

const heroBg =
    document.querySelector(".hero-bg");

window.addEventListener("scroll", () => {

    if (!heroBg) return;

    const y =
        window.scrollY * 0.18;

    heroBg.style.transform =
        `translate(-50%, calc(-50% + ${y}px))`;

});


/* REDUCE MOTION */

if (
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches
) {

    document.querySelectorAll(".reveal")
        .forEach(el => {

            el.style.transition = "none";
            el.classList.add("show");

        });

}


console.log("ORABI Premium Website Loaded");
