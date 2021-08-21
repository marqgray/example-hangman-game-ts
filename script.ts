const game = new (class {
  htmlElements = {
    word: <HTMLDivElement>document.getElementById("word"),
    wrongLetters: <HTMLDivElement>document.getElementById("wrong-letters"),
    buttonPlayAgain: <HTMLButtonElement>document.getElementById("play-button"),
    popup: <HTMLDivElement>document.getElementById("popup-container"),
    notification: <HTMLDivElement>(
      document.getElementById("notification-container")
    ),
    finalMessage: <HTMLHeadingElement>document.getElementById("final-message"),
    figureParts: <NodeListOf<HTMLElement>>(
      document.querySelectorAll(".figure-part")
    ),
  };

  words: string[] = ["application", "programming", "interface", "wizard"];
  selectedWord: string =
    this.words[Math.floor(Math.random() * this.words.length)];
  correctLetters: string[] = [];
  wrongLetters: string[] = [];

  constructor() {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (this.selectedWord.indexOf(letter) > -1) {
          if (!(this.correctLetters.indexOf(letter) > -1)) {
            this.correctLetters.push(letter);

            this.displayWord();
          } else {
            this.showNotification();
          }
        } else {
          if (!(this.wrongLetters.indexOf(letter) > -1)) {
            this.wrongLetters.push(letter);

            this.updateWrongLettersElement();
          }
        }
      }
    });
    this.htmlElements.buttonPlayAgain.addEventListener("click", (e) => {
      this.correctLetters.splice(0);
      this.wrongLetters.splice(0);

      this.selectedWord =
        this.words[Math.floor(Math.random() * this.words.length)];

      this.displayWord();

      this.updateWrongLettersElement();

      this.htmlElements.popup.style.display = "none";
    });
    this.displayWord();
  }

  updateWrongLettersElement() {
    this.htmlElements.wrongLetters.innerHTML = `
      ${this.wrongLetters.length > 0 ? `<p>Wrong</p>` : ``}
      ${this.wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;

    this.htmlElements.figureParts.forEach((part, index) => {
      const errors = this.wrongLetters.length;

      if (index < errors) {
        part.style.display = "block";
      } else {
        part.style.display = "none";
      }
    });

    if (this.wrongLetters.length === this.htmlElements.figureParts.length) {
      this.htmlElements.finalMessage.innerText = "Unfortunately, you lost.";
      this.htmlElements.popup.style.display = "flex";
    }
  }

  showNotification() {
    this.htmlElements.notification.classList.add("show");
    setTimeout(() => {
      this.htmlElements.notification.classList.remove("show");
    }, 2000);
  }

  displayWord() {
    this.htmlElements.word.innerHTML = `${this.selectedWord
      .split("")
      .map(
        (letter) => `
      <span class="letter">
        ${this.correctLetters.indexOf(letter) > -1 ? letter : ""}
      </span>
      `
      )
      .join("")}`;

    const innerWord = this.htmlElements.word.innerText.replace(/\n/g, "");

    if (innerWord === this.selectedWord) {
      this.htmlElements.finalMessage.innerText = "Congratulations! You won!";
      this.htmlElements.popup.style.display = "flex";
    }
  }
})();
