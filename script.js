const symbols = [
  "APPLE.jpg",
  "SEVEN.jpg",
  "STRAWBERRY.jpg",
  "BAR.jpg",
  "DAY.jpg",
  "MONTH.jpg",
  "YEAR.jpg"
];

const cardContainer = document.getElementById("cardsContainer");

// 🔥 tworzenie kart
for (let i = 1; i <= 3; i++) {

  const card = document.createElement("div");
  card.classList.add("card");
  card.id = `card${i}`;

  const img = document.createElement("img");
  img.src = "Cardback.jpg";

  const reel = document.createElement("div");
  reel.classList.add("reel");
  reel.id = `reel${i}`;

  // 🔥 budowanie reel
  for (let j = 0; j < 80; j++) {
    const symbol = document.createElement("img");
    symbol.src = symbols[j % symbols.length];
    reel.appendChild(symbol);
  }

  card.appendChild(img);
  card.appendChild(reel);

  cardContainer.appendChild(card);
}

const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {

    if(entry.isIntersecting) {
      entry.target.classList.add("show");
    }

  });
});

fadeElements.forEach((el) => observer.observe(el));


function spawnBarSpam() {

  const layer = document.getElementById("barExplosion");
  
  const cardGameIntro = document.getElementById("cardGame");

  // 🔥 ukrycie tylko raz
  cardGameIntro.style.transition = "opacity 2s";
  cardGameIntro.style.opacity = "0";
  cardGameIntro.style.pointerEvents = "none";

  setTimeout(() => {
    cardGameIntro.style.display = "none";
  }, 2000);

  document.querySelectorAll(".barTitle")
  .forEach(title => {

    title.style.transition = "opacity 2s";
    title.style.opacity = "1";
    title.style.pointerEvents = "none";

  });
  const deetsBtn = document.getElementById("deetsBtn");
  deetsBtn.style.opacity = "1";
  deetsBtn.style.pointerEvents = "auto";

  let i = 0;

  const interval = setInterval(() => {

    if (i >= 150) {
      clearInterval(interval);
      return;
    }

    const img = document.createElement("img");
    img.src = "BAR.jpg";
    img.style.width = "300px";
    img.style.height = "auto";
    img.classList.add("bar-particle");

    const x = Math.random() * window.innerWidth - 20;
    const y = Math.random() * window.innerHeight - 30;

    img.style.left = x + "px";
    img.style.top = y + "px";

    img.style.position = "absolute";
    img.style.width = "120px";

    layer.appendChild(img);

    // 🔥 animacja wejścia
    setTimeout(() => {
      //img.style.transform =
      //  `translate(${(Math.random()-0.5)*300}px,
      //              ${(Math.random()-0.5)*300}px)
      //   scale(1.2)`;
      img.style.opacity = "1";
    }, 10);


    // 💀 życie elementu = 1 sekunda
    setTimeout(() => {
      img.style.opacity = "0";
      //img.style.transform += " scale(0.5)";
    }, 2000);

    // 🧹 usunięcie z DOM
    setTimeout(() => {
      img.remove();
    }, 1500);

    i++;

  }, 20); // 🔥 tempo spawnu (im mniejsze tym bardziej "burst")
}


function clearBarSpam() {
  document.getElementById("barExplosion").innerHTML = "";
}

const finalResults1 = {
  reel1: "DAY.jpg", // DAY
  reel2: "MONTH.jpg", // MONTH
  reel3: "YEAR.jpg"  // YEAR
};

const finalResults2 = {
  reel1: "BAR.jpg", // BAR
  reel2: "BAR.jpg", // BAR
  reel3: "BAR.jpg"  // BAR
};

function getIndex(symbol) {
  return symbols.indexOf(symbol);
}

const spinBtn = document.getElementById("spinBtn");
const headerText = document.getElementById("headerText");

let cardsRevealed = 0;
document.querySelectorAll(".card").forEach(card => {
  let locked = false;  
  card.addEventListener("click", () => {
    if(locked) return;
    locked = true;
    cardsRevealed++;
    if (cardsRevealed == 3){
      setTimeout(() => {
        headerText.textContent = "no luck... try spinning!!"
        spinBtn.style.opacity = "1";
        spinBtn.style.pointerEvents = "auto";
      }, 500);
      
    }
    card.classList.add("shrink");

    const img = card.querySelector("img");
    setTimeout(() => {

      if (card.id === "card1") {
        img.src = "APPLE.jpg";
      }

      else if (card.id === "card2") {
        img.src = "STRAWBERRY.jpg";
      }

      else if (card.id === "card3") {
        img.src = "SEVEN.jpg";
      }
      card.classList.remove("shrink");
    }, 200);      
  });   
});

const btn = document.getElementById("spinBtn");


let spinsDone = 0;

btn.addEventListener("click", () => {

  let spins;
  const currentSpin = spinsDone; // 🔥 zapamiętanie stanu

  if (spinsDone < 2) {
    spinsDone++;
  }

  document.querySelectorAll(".reel").forEach((reel, index) => {
    const symbolHeight = reel.querySelector("img").offsetHeight;
    // 🔥 kontrolowany wynik zależny od stanu PRZED zmianą
    let targetSymbol;

    if (currentSpin === 0) {
      targetSymbol = finalResults1[reel.id];
      spins = 5;
    } else {
      spins = 1;
      targetSymbol = finalResults2[reel.id];
    }

    const finalIndex = getIndex(targetSymbol) + 1; // 🔥 TO JEST KLUCZ

    const offset =
      (spins * symbols.length + finalIndex)
      * symbolHeight;

    reel.style.transition =
      `transform ${2 + index}s ease-out`;

    reel.style.transform =
      `translateY(-${offset}px)`;

  });
  setTimeout(() => {
  if (spinsDone === 1){
    headerText.textContent = "it's a date... but what does it mean?? keep spinning"
  } else {
    headerText.textContent = ""
      setTimeout(() => {
        spawnBarSpam();
      }, 500);

      /*setTimeout(() => {
        clearBarSpam();
      }, 8500);*/
  } 
  }, 3500);
});


const nextPageBtn =
  document.getElementById("deetsBtn");

  nextPageBtn.addEventListener("click", () => {

  window.location.href = "details.html";

});

