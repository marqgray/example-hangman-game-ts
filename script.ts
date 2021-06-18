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
    figureParts: document.querySelectorAll(".figure-part"),
  };

  words: string[] = ["application", "programming", "interface", "wizard"];
  selectedWord: string =
    this.words[Math.floor(Math.random() * this.words.length)];
  correctLetters: string[] = [];
  wrongLetters: string[] = [];

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
  }
})();
