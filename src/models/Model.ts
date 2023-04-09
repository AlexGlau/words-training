import { store } from "../store";
import { IModel, ICurrentWord } from "../types/types";

export class Model implements IModel {
  public clickCount = 0;
  public wordsInTraining;
  public words: ICurrentWord[];
  public answer: string;
  public indexOfTraining;
  public onRender: () => void;
  public answerRender: () => void;

  constructor() {
    this.wordsInTraining = 3;
    this.words = [];
    this.answer = '';
    this.indexOfTraining = 0;

    this.createTraining();
  }

  public bindOnRender(cb: () => void) {
    this.onRender = cb;
  }

  public bindAnswerRender(cb: () => void): void {
    this.answerRender = cb;
  }

  private createTraining(): void {
    for (let i = 0; i < this.wordsInTraining; i++) {
      const index = Math.floor(Math.random() * store.length);
      const word = store[index];
      const options = word.split("").sort((): number => 0.5 - Math.random());
      this.words.push({ word, options, numberOfErrors: 0 });
    }
  }

  public reduceButtons(letter: string): void {
    const { options } = this.getCurrentTraining();
    const index = options.indexOf(letter);

    this.words[this.indexOfTraining].options.splice(index, 1);
  }

  public getCurrentTraining(): ICurrentWord {
    return this.words[this.indexOfTraining];
  }

  public checkAnswer(letter: string): void {
    const { word } = this.getCurrentTraining();

    // clickCount is used as an index
    if (word.indexOf(letter) === -1 || word[this.clickCount] !== letter) {
      this.words[this.indexOfTraining].numberOfErrors++;
      this.showCorrectAnswer();

      this.onRender();

      return;
    }

    this.clickCount++;
    this.answer = letter;
    this.answerRender();
    this.reduceButtons(letter);
    this.onRender();
  }

  private showCorrectAnswer(): void {
    const { word, numberOfErrors } = this.getCurrentTraining();

    if (numberOfErrors === 3) {
      const correctSequence = word.split("");
      this.words[this.indexOfTraining].options = correctSequence;
      // Don't increase it on error. Otherwise next click returns wrong letter
      this.clickCount = 0;

      setTimeout(() => {
        this.switchToNextWord();
        this.onRender();
        // this.training.clearAnswer();
        // this.training.updateNumberOfCurrentQuestion();
      }, 2000);
    }
  }

  public getAnswer(): string {
    return this.answer;
  }

  switchToNextWord(): void {
    if (this.wordsInTraining > this.indexOfTraining + 1) {
      this.indexOfTraining++;
    } else {
      // this.training.renderStat();
    }
  }
}
