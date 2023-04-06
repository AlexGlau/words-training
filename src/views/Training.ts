import { Button } from "./Button";
import { controller } from "../controllers/Controller";

export const training = {
  init(): void {
    this.letters = document.getElementById("letters");
    this.render();
  },
  render(): void {
    const words = controller.getCurrentTraining();

    if (this.letters) {
      words.options.forEach((letter): void => {
        this.letters.appendChild(
          new Button(letter, this.handleClick).render()
        );
      });
    }
  },
  handleClick(): void {
    console.log("click");
  }
};
