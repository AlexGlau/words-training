import { Button } from "./Button";
// import { Answer } from "./Answer";
// import { stat } from "./Stat";
// import { controller } from "../controllers/Controller";

import { ITraining, ICurrentWord } from "../types/types";

export class Training implements ITraining {
  public clickCount = 0;
  private isCorrect = true;
  private letters = document.getElementById("letters");
  private answer = document.getElementById("answer");
  private currentQuestion = document.getElementById("current_question");

  constructor () {
    // this.render();
  }

  // public init(): void {
  //   this.letters = document.getElementById("letters");
  //   this.answer = document.getElementById("answer");
  //   this.currentQuestion = document.getElementById("current_question");
  //   // Number words in one training should be set only once
  //   // so there's no need in a method
  //   this.render();
  // }

  public renderNumberOfWords(value: string): void {
    document.getElementById("total_questions").innerHTML = value;
  }

  public render(word: ICurrentWord): void {
    this.letters.innerHTML = "";

    const { options, numberOfErrors } = word;

    const cls = numberOfErrors === 3 ? "btn-danger" : "";

    if (this.letters) {
      options.forEach((letter): void => {
        this.letters.appendChild(
          new Button(letter, /*this.handleClick.bind(this),*/ cls).render()
        );
      });
    }
  }

  // updateNumberOfCurrentQuestion(): void {
  //   if (this.currentQuestion) {
  //     this.currentQuestion.innerHTML = controller.getIndex().toString();
  //   }
  // }

  // renderStat(): void {
  //   this.letters.innerHTML = "";
  //   this.answer.innerHTML = "";

  //   stat.init();
  // }

  // clearAnswer(): void {
  //   this.answer.innerHTML = "";
  // }

  public onAnswer(handler: (s: string) => void): void {
    this.letters.addEventListener("click", (e: MouseEvent) => {
      const target = (e.target as HTMLButtonElement);
      handler(target.innerHTML);
    });
  }

  handleClick(e: MouseEvent): void {
    const target = (e.target as HTMLButtonElement);
    console.log(target);

    // const letter = target.innerHTML;

    // const { options } = controller.getCurrentTraining();

    // this.isCorrect = controller.checkAnswer(letter, this.clickCount);

    // if (this.isCorrect) {
    //   this.answer.appendChild(
    //     new Answer(letter).render()
    //   );
    //   // If answer is correct, increase clickCount
    //   this.clickCount++;
    //   this.render();

    //   // When there's no options anymore, show next word
    //   if (options.length === 0) {
    //     this.clickCount = 0;
    //     controller.switchToNextWord();
    //     this.updateNumberOfCurrentQuestion();
    //     // Clear answer only when word changes
    //     this.clearAnswer();
    //     this.render();
    //   }
    // } else {
    //   target.classList.add("btn-danger");
    // }
  }
}
