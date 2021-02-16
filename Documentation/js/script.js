let headerLinks = document.querySelector(".nav-link");
let options = {
    root: null,
    rootMargin: '-40px 0px 0px 0px',
    threshold: 1
}

let updateNavigation = (entries) => {
    entries.forEach(entry => {
        let section = entry.target.parentElement.parentElement;
        if (!entry.isIntersecting && entry.boundingClientRect.top <= 40) {
            removeActiveClass();
            document.querySelector("a[href='#" + section.id + "']").classList.add("active");
        } else if (entry.isIntersecting && entry.boundingClientRect.top <= 200) {
            removeActiveClass();
            let previousSection = section.previousElementSibling;
            document.querySelector("a[href='#" + previousSection.id + "']").classList.add("active");
        }
    });
}
function removeActiveClass() {
    if (document.querySelector(".nav-link.active"))
        document.querySelector(".nav-link.active").classList.remove("active");
}

//run if navbar is on left ie for tablets and laptops
if (window.getComputedStyle(document.getElementById("navbar")).getPropertyValue("position") === "fixed") {
    let observer = new IntersectionObserver(updateNavigation, options);
    document.querySelectorAll("header > h2").forEach(header => {
        observer.observe(header);
    });
}

