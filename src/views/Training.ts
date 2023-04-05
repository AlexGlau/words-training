import { Button } from "./Button";
import { controller } from "../controllers/Controller";

interface ITraining {
  init(): void;
  render(): void;
}

export const training: ITraining = {
  init(): void {
    this.letters = document.getElementById("letters");
    this.render();
  },
  render(): void {
    const words = controller.getWords();

    if (this.letters) {
      words[0].options.forEach((letter) => {
        this.letters.appendChild(new Button(letter).render());
      });
    }
  }
};
