import { Button } from "./Button";
import { Answer } from "./Answer";
import { controller } from "../controllers/Controller";

export const training = {
  clickCount: 0,
  isCorrect: true,
  init(): void {
    this.letters = document.getElementById("letters");
    this.answer = document.getElementById("answer");
    this.render();
  },
  render(): void {
    this.letters.innerHTML = "";

    const { options, numberOfErrors } = controller.getCurrentTraining();

    const cls = numberOfErrors > 3 ? "btn-danger" : "";

    if (this.letters) {
      options.forEach((letter): void => {
        this.letters.appendChild(
          new Button(letter, this.handleClick.bind(this), cls).render()
        );
      });
    }
  },
  clearAnswer(): void {
    this.answer.innerHTML = "";
  },
  handleClick(e: MouseEvent): void {
    const target = (e.target as HTMLButtonElement);
    const letter = target.innerHTML;

    const { options } = controller.getCurrentTraining();

    this.isCorrect = controller.checkAnswer(letter, this.clickCount);

    if (this.isCorrect) {
      this.answer.appendChild(
        new Answer(letter).render()
      );
      // If answer is correct, increase clickCount
      this.clickCount++;
      this.render();

      // When there's no options anymore, show next word
      if (options.length === 0) {
        this.clickCount = 0;
        controller.nextWord();
        // Clear answer only when word changes
        this.clearAnswer();
        this.render();
      }
    } else {
      target.classList.add("btn-danger");
    }
  }
};
