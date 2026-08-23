/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader = document.getElementById("loader");

        if (loader) {
            loader.classList.add("hide");
        }

    }, 1000);

});


/* =========================
   CURSOR
========================= */

const cursorDot = document.querySelector(".cursor-dot");
const cursorGlow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {

    if (cursorDot) {
        cursorDot.style.left = e.clientX + "px";
        cursorDot.style.top = e.clientY + "px";
    }

    if (cursorGlow) {
        cursorGlow.style.left = e.clientX + "px";
        cursorGlow.style.top = e.clientY + "px";
    }

});


/* =========================
   3D LAPTOP
========================= */

const laptop = document.getElementById("laptop3d");

document.addEventListener("mousemove", (e) => {

    if (!laptop) return;

    const x = (window.innerWidth / 2 - e.clientX) / 45;
    const y = (window.innerHeight / 2 - e.clientY) / 60;

    laptop.style.transform =
        `rotateY(${x}deg) rotateX(${-y}deg) translateY(-5px)`;

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
   SCROLL REVEAL
========================= */

const observer = new IntersectionObserver(

    (entries) => {

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

document.querySelectorAll(".reveal").forEach(element => {

    observer.observe(element);

});


/* =========================
   PRODUCT SEARCH
========================= */

const search = document.getElementById("search");
const filter = document.getElementById("filter");

const products = document.querySelectorAll(".product");


function filterProducts(){

    const searchValue =
        search ? search.value.toLowerCase().trim() : "";

    const filterValue =
        filter ? filter.value : "all";


    products.forEach(product => {

        const name =
            product.dataset.name.toLowerCase();

        const price =
            Number(product.dataset.price);


        const matchesSearch =
            name.includes(searchValue);


        let matchesFilter = true;


        if (filterValue === "low") {

            matchesFilter =
                price > 0 && price < 15000;

        }

        if (filterValue === "mid") {

            matchesFilter =
                price >= 15000 && price <= 20000;

        }

        if (filterValue === "high") {

            matchesFilter =
                price > 20000;

        }


        if (matchesSearch && matchesFilter) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

}


if (search) {
    search.addEventListener("input", filterProducts);
}

if (filter) {
    filter.addEventListener("change", filterProducts);
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
){

    document.getElementById("modalTitle").textContent = title;

    document.getElementById("modalCpu").textContent = cpu;

    document.getElementById("modalRam").textContent = ram;

    document.getElementById("modalStorage").textContent = storage;

    document.getElementById("modalGpu").textContent = gpu;

    document.getElementById("modalPrice").textContent = price;


    document.getElementById("modal").classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeProduct(){

    document.getElementById("modal").classList.remove("active");

    document.body.style.overflow = "";

}


/* إغلاق المودال عند الضغط خارج المربع */

const modal = document.getElementById("modal");

if (modal) {

    modal.addEventListener("click", (e) => {

        if (e.target === modal) {

            closeProduct();

        }

    });

}


/* ESC لإغلاق المودال */

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        closeProduct();

    }

});


/* =========================
   PARALLAX HERO
========================= */

const heroLight = document.querySelector(".hero-light");

document.addEventListener("mousemove", (e) => {

    if (!heroLight) return;

    const x =
        (e.clientX / window.innerWidth - 0.5) * 30;

    const y =
        (e.clientY / window.innerHeight - 0.5) * 30;

    heroLight.style.transform =
        `translate(${x}px,${y}px)`;

});


/* =========================
   PHONE NUMBER
========================= */

console.log(
    "ORABI | عرابي",
    "01030983469",
    "01091592643"
);/* =========================
   PREMIUM PRODUCT BUTTON
========================= */

document.querySelectorAll(".product-bottom button").forEach(button => {

    button.addEventListener("click", () => {

        // تأثير ضغط بسيط
        button.style.transform = "scale(.94)";

        setTimeout(() => {
            button.style.transform = "";
        }, 150);

    });

});


/* =========================
   MODAL GLOW FOLLOW MOUSE
========================= */

const modalBox = document.querySelector(".modal-box");

if (modalBox) {

    modalBox.addEventListener("mousemove", (e) => {

        const rect = modalBox.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        modalBox.style.background = `
            radial-gradient(
                circle at ${x}px ${y}px,
                rgba(230,0,0,.10),
                transparent 35%
            ),
            #101010
        `;

    });

    modalBox.addEventListener("mouseleave", () => {

        modalBox.style.background = `
            radial-gradient(
                circle at 85% 10%,
                rgba(230,0,0,.12),
                transparent 35%
            ),
            #101010
        `;

    });

}