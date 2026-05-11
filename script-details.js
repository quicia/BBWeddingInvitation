document.querySelectorAll(".photo-card")
.forEach(card => {

  let locked = false;

  card.addEventListener("click", () => {

    if (locked) return;
    locked = true;

    const img = card.querySelector("img");

    // 🔥 start animacji
    card.classList.add("shrink");

    // 🔥 FORCE render (stabilność animacji)
    void card.offsetWidth;

    setTimeout(() => {

      if (card.id === "card1") {
        img.src = "PARTYTHEME.png";
      } else if (card.id === "card2") {
        img.src = "WHERE.png";
      } else if (card.id === "card3") {
        img.src = "ACTIVITIES.png";
      } else if (card.id === "card4") {
        img.src = "GIFTS.png";
      }

      card.classList.remove("shrink");

    }, 200);

  });

});

const nextPageBtn = document.getElementById("guestBtn");
console.log(nextPageBtn)

  nextPageBtn.addEventListener("click", () => {

  window.location.href = "guestlist.html";

});

document.getElementById("downloadBtn")
.addEventListener("click", () => {

  const link = document.createElement("a");
  link.href = "deets.pdf";
  link.download = "deets.pdf";

  document.body.appendChild(link);
  link.click();
  link.remove();

});