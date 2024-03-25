function mostrar_lang_dropdown() {
  document.querySelector(".dropdown_lang").classList.toggle("show");
}

document.addEventListener("click", (event) => {
  if (
    !document.querySelector(".lang").contains(event.target) &&
    !document.querySelector(".dropdown_lang").contains(event.target)
  ) {
    document.querySelector(".dropdown_lang").classList.remove("show");
  }
});
