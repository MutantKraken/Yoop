const pages = document.body.children;

export function setPage(id, hideOthers = true) {
  if (hideOthers) {
    for (var i = 0; i < pages.length; i++) {
      pages[i].setAttribute("hidden", true);
    }
  }
  document.getElementById(id).removeAttribute("hidden");
}