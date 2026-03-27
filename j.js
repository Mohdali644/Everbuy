document.addEventListener("DOMContentLoaded", () => {

  // Select the search input
  const searchInput = document.querySelector("input");

  if (!searchInput) {
    console.error("Search input not found");
    return;
  }

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      showPopup();
    }
  });

  function showPopup() {
    // Create popup
    const popup = document.createElement("div");

    popup.innerText = "Coming Soon";

    // JS-only styling
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.background = "#111";
    popup.style.color = "#fff";
    popup.style.padding = "20px 30px";
    popup.style.borderRadius = "8px";
    popup.style.fontSize = "18px";
    popup.style.zIndex = "10000";
    popup.style.boxShadow = "0 10px 25px rgba(0,0,0,0.4)";

    document.body.appendChild(popup);

    // Auto close after 2 seconds
    setTimeout(() => {
      popup.remove();
    }, 2000);
  }

});

function scrollToTop() {
  window.scrollTo( {
    top: 0,
    behavior: "smooth"
  });
}