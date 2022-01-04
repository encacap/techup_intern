const WOW = require("wow.js");

(() => {
    const menuButton = document.querySelector("#menu_button");
    const menuContainer = document.querySelector(".header-menu");

    new WOW().init();

    menuButton.onclick = () => {
        menuContainer.classList.toggle("active");
    };
})();
