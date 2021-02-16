var inkColor = document.querySelector(".color-picker").value;

makeGrid(16, 16);

document.querySelector(".color-picker").addEventListener("change", (event) => {
    inkColor = event.target.value;
    document.querySelector("button.shade").classList.remove("active");
    document.querySelector("button.random").classList.remove("active");
});
document.querySelector("button.random").addEventListener("click", (event) => {
    document.querySelector("button.random").classList.toggle("active");
    document.querySelector("button.shade").classList.remove("active");
});
document.querySelector("button.shade").addEventListener("click", (event) => {
    document.querySelector("button.shade").classList.toggle("active");
    document.querySelector("button.random").classList.remove("active");
});
document.querySelector("button.reset").addEventListener("click", (event) => {
    document.querySelectorAll(".canvas > div").forEach((div) => {
        div.removeAttribute("style");
    });
});
document.querySelector(".canvas").addEventListener("mouseover", (event) => {
    if (!event.target.classList.contains("canvas")) {
        if (document.querySelector("button.random").classList.contains("active")) {
            event.target.style.filter = null;
            event.target.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
        } else if (document.querySelector("button.shade").classList.contains("active")) {
            if (event.target.style.filter)
                event.target.style.filter = `brightness(${Number(event.target.style.filter.substring(11, 14)) - 0.1})`;
            else
                event.target.style.filter = `brightness(0.9)`
        } else {
            event.target.style.backgroundColor = inkColor;
            event.target.style.filter = null;
        }
    }
    event.stopImmediatePropagation();
});
document.querySelector(".canvas").addEventListener("click", (event) => {
    if (!event.target.classList.contains("canvas")) {
        event.target.removeAttribute("style");
    }
    event.stopImmediatePropagation();
});
document.querySelector(".grid-size > button").addEventListener("click", (event) => {
    let rows = Number(document.querySelector(".grid-size .rows").value);
    let cols = Number(document.querySelector(".grid-size .cols").value);
    makeGrid(rows, cols);
});
function makeGrid(rows, cols) {
    const gridContainer = document.querySelector(".canvas");
    gridContainer.style.setProperty("--canvas-columns", cols);
    gridContainer.style.setProperty("--canvas-rows", rows);
    gridContainer.innerHTML = "";
    for (i = 1; i <= (rows * cols); i++) {
        gridContainer.appendChild(document.createElement("div"));
    }
}