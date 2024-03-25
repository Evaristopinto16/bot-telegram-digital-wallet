function hide_side_bar() {
  document.querySelector("aside").classList.add("hide_side_bar");
}

function retirar_hide_side_bar() {
  document.querySelector("aside").classList.remove("hide_side_bar");
}
function mostrar_modal_more() {
  document.querySelector(".dropdowned_more").classList.toggle("show");
}

document.addEventListener("click", (event) => {
  if (
    !document.querySelector(".lang_responsive").contains(event.target) &&
    !document.querySelector(".dropdown_lang_responsive").contains(event.target)
  ) {
    document
      .querySelector(".dropdown_lang_responsive")
      .classList.remove("show");
  }
});

function mostrar_lang_dropdown_responsive() {
  document.querySelector(".dropdown_lang_responsive").classList.toggle("show");
}

// Evento click

document.addEventListener("click", (event) => {
  if (
    !document.querySelector(".dropdowned").contains(event.target) &&
    !document.querySelector(".dropdowned_more").contains(event.target)
  ) {
    document.querySelector(".dropdowned_more").classList.remove("show");
  }
});

if (window.innerWidth <= 610) {
  document.querySelector("aside").classList.add("hide_side_bar");
  document.querySelector("aside").classList.add("non_trans");

  document.querySelector("section").classList.add("non_trans");
} else {
  document.querySelector("aside").classList.remove("hide_side_bar");
}

window.addEventListener("resize", () => {
  if (window.innerWidth <= 602) {
    document.querySelector("aside").classList.add("hide_side_bar");
  } else {
    document.querySelector("aside").classList.remove("hide_side_bar");
  }
});
