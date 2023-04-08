import { store } from "../store";
import { IModel, ICurrentWord } from "../types/types";

export class Model implements IModel {
  public wordsInTraining;
  public words: ICurrentWord[];
  public answer: string[];
  public indexOfTraining;
  public onRender: () => void;

  constructor() {
    this.wordsInTraining = 3;
    this.words = [];
    this.answer = [];
    this.indexOfTraining = 0;

    this.createTraining();
  }

  public bindOnRender(cb: () => void) {
    this.onRender = cb;
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
    console.log(index);

    this.words[this.indexOfTraining].options.splice(index, 1);

    this.onRender();
  }

  public getCurrentTraining(): ICurrentWord {
    return this.words[this.indexOfTraining];
  }
}
