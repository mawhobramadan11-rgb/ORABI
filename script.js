/* =========================
   ORABI WEBSITE SCRIPT
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

    link.addEventListener("click", function (e) {

        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {

            e.preventDefault();

            const headerHeight =
                window.innerWidth <= 768
                    ? 68
                    : 78;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        }

    });

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
                threshold: 0.10
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
   PRODUCT SEARCH
========================= */

const searchInput =
    document.getElementById("search");

const productsGrid =
    document.getElementById("productsGrid");

const filter =
    document.getElementById("filter");


function applyProductsFilter() {

    if (!productsGrid) {
        return;
    }

    const searchValue =
        searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

    const selected =
        filter
            ? filter.value
            : "all";

    const products =
        productsGrid.querySelectorAll(".product");


    products.forEach(product => {

        const name =
            (product.dataset.name || "")
            .toLowerCase();

        const text =
            product.innerText.toLowerCase();

        const price =
            Number(product.dataset.price || 0);


        /* SEARCH */

        const matchesSearch =
            !searchValue ||
            name.includes(searchValue) ||
            text.includes(searchValue);


        /* PRICE */

        let matchesPrice = true;


        if (selected === "low") {

            matchesPrice =
                price > 0 &&
                price < 15000;

        }


        if (selected === "mid") {

            matchesPrice =
                price >= 15000 &&
                price <= 20000;

        }


        if (selected === "high") {

            matchesPrice =
                price > 20000;

        }


        product.style.display =
            matchesSearch && matchesPrice
                ? ""
                : "none";

    });

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        applyProductsFilter
    );

}


if (filter) {

    filter.addEventListener(
        "change",
        applyProductsFilter
    );

}


/* =========================
   LAPTOP 3D
   DESKTOP ONLY
========================= */

const laptop =
    document.getElementById("laptop");


if (laptop) {

    const desktop =
        window.matchMedia(
            "(min-width: 901px)"
        );


    if (desktop.matches) {

        document.addEventListener(
            "mousemove",
            (event) => {

                const x =
                    (window.innerWidth / 2 -
                    event.clientX) / 55;

                const y =
                    (window.innerHeight / 2 -
                    event.clientY) / 70;


                laptop.style.transform =
                    `rotateY(${-12 + x}deg)
                     rotateX(${5 - y}deg)`;

            }
        );

    }

}


/* =========================
   PRODUCT MODAL
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

    if (!modal) {
        return;
    }


    const modalTitle =
        document.getElementById("modalTitle");

    const modalCpu =
        document.getElementById("modalCpu");

    const modalRam =
        document.getElementById("modalRam");

    const modalStorage =
        document.getElementById("modalStorage");

    const modalGpu =
        document.getElementById("modalGpu");

    const modalPrice =
        document.getElementById("modalPrice");


    if (modalTitle) {
        modalTitle.textContent = title;
    }

    if (modalCpu) {
        modalCpu.textContent = cpu;
    }

    if (modalRam) {
        modalRam.textContent = ram;
    }

    if (modalStorage) {
        modalStorage.textContent = storage;
    }

    if (modalGpu) {
        modalGpu.textContent = gpu;
    }

    if (modalPrice) {
        modalPrice.textContent = price;
    }


    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* =========================
   CLOSE MODAL
========================= */

function closeProduct() {

    const modal =
        document.getElementById("modal");

    if (!modal) {
        return;
    }

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================
   CLOSE MODAL OUTSIDE
========================= */

const productModal =
    document.getElementById("modal");


if (productModal) {

    productModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === productModal
            ) {

                closeProduct();

            }

        }
    );

}


/* =========================
   ESC CLOSE
========================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            closeProduct();

        }

    }
);


/* =========================
   PREVENT IMAGE DRAG
========================= */

document
    .querySelectorAll("img")
    .forEach(image => {

        image.addEventListener(
            "dragstart",
            event => {

                event.preventDefault();

            }
        );

    });


/* =========================
   CLOSE MOBILE MENU
   WHEN RESIZING
========================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 768 &&
            nav
        ) {

            nav.classList.remove("active");

        }

    }
);


/* =========================
   ORABI READY
========================= */

console.log(
    "ORABI Premium Website Loaded - 11 Products."
);