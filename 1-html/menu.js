"use strict";

function menuDisplayOnMobile() {
  const menuButton = document.getElementById("hamburguer_icon");
  const menuContent = document.getElementById("menu_content");

  if (window.innerWidth <= 992) {
    menuButton.addEventListener("click", function (event) {
      event.preventDefault();
      menuContent.classList.toggle("displayMenu");
    });
  }
}

menuDisplayOnMobile();

window.addEventListener("resize", menuDisplayOnMobile);
