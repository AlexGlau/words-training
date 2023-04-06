import { Button } from "./Button";
import { Answer } from "./Answer";
import { controller } from "../controllers/Controller";

export const training = {
  init(): void {
    this.letters = document.getElementById("letters");
    this.answer = document.getElementById("answer");
    this.render();
  },
  render(): void {
    this.letters.innerHTML = "";
    this.answer.innerHTML = "";

    const words = controller.getCurrentTraining();

    if (this.letters) {
      words.options.forEach((letter): void => {
        this.letters.appendChild(
          new Button(letter, this.handleClick.bind(this)).render()
        );
      });
    }
  },
  handleClick(e: MouseEvent): void {
    const letter = (e.target as HTMLButtonElement).innerHTML;

    this.answer.appendChild(
      new Answer(letter).render()
    )
  }
};
