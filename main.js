let counter = 0;
(firstSelection = 0),
  (secondSelection = 0),
  (id1 = 0),
  (id2 = 0),
  (startGame = -1),
  (matchingNum = 0);

const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (startGame === -1) {
      startGame = 1;
      timer();
    }
    card.classList.add("clicked");
    if (counter === 0) {
      firstSelection = card.getAttribute("gem");
      id1 = card.getAttribute("id");
      counter++;
    } else {
      id2 = card.getAttribute("id");
      if (id1 !== id2) {
        matchingNum++;
        secondSelection = card.getAttribute("gem");
        counter = 0;
        if (firstSelection === secondSelection) {
          const correctMatching = document.querySelectorAll(
            ".card[gem='" + firstSelection + "']"
          );
          correctMatching[0].classList.add("checked");
          correctMatching[1].classList.add("checked");
          correctMatching[0].classList.remove("clicked");
          correctMatching[1].classList.remove("clicked");
        } else {
          const incorrectMatching = document.querySelectorAll(".card.clicked");
          setTimeout(() => {
            incorrectMatching[0].classList.add("shake");
            incorrectMatching[1].classList.add("shake");
          }, 300);
          setTimeout(() => {
            incorrectMatching[0].classList.remove("clicked");
            incorrectMatching[1].classList.remove("clicked");
            incorrectMatching[1].classList.remove("shake");
            incorrectMatching[0].classList.remove("shake");
          }, 800);
        }
      }
    }
  });
});

function shuffleCard() {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, i) => {
    let imgTag = card.querySelector("img");
    imgTag.src = `Memory Card Game Images/img-${arr[i]}.png`;
    let gemname = card.getAttribute("gem");
    card.setAttribute("gem", arr[i]);
  });
}
function timer() {
  let count = 39;
  const myInterval = setInterval(myTimeout1, 1000);
  function myTimeout1() {
    if (count >= 0) {
      document.getElementById("time").innerHTML = count;
    } else {
      clearInterval(myInterval);
      alert("Time Up");
      window.location.reload();
      shuffleCard();
    }
    count--;
  }
}
function checkWin() {
  if (matchingNum === 8) {
    alert("You Win");
    window.location.reload();
    shuffleCard();
  }
}
shuffleCard()
