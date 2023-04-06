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
    // this.answer.innerHTML = "";

    const { options } = controller.getCurrentTraining();

    if (this.letters) {
      options.forEach((letter): void => {
        this.letters.appendChild(
          new Button(letter, this.handleClick.bind(this)).render()
        );
      });
    }
  },
  handleClick(e: MouseEvent): void {
    const target = (e.target as HTMLButtonElement);
    const letter = target.innerHTML;

    this.isCorrect = controller.checkAnswer(letter, this.clickCount);

    if (this.isCorrect) {
      this.answer.appendChild(
        new Answer(letter).render()
      );
      // If answer is correct, increase clickCount
      this.clickCount++;
      this.render();
    } else {
      target.classList.add("btn-danger");
    }
  }
};
