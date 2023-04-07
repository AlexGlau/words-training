import { model } from "../models/Model";
import { store } from "../store";
import { ICurrentWord } from "../types/types";
import { training } from "../views/Training";

export const controller = {
  init(): void {
    this.createTraining();
    training.init();
  },
  createTraining(): void {
    for (let i = 0; i < model.wordsInTraining; i++) {
      const index = Math.floor(Math.random() * store.length);
      const word = store[index];
      const options = word.split("").sort((): number => 0.5 - Math.random());
      model.words.push({ word, options, numberOfErrors: 0 });
    }
  },
  getNumberOfWordsInTraining(): number {
    return model.wordsInTraining;
  },
  getIndex(): number {
    return model.indexOfTraining + 1;
  },
  getCurrentTraining(): ICurrentWord {
    return model.words[model.indexOfTraining];
  },
  nextWord(): void {
    const { indexOfTraining, wordsInTraining } = model;

    if (wordsInTraining > indexOfTraining + 1) {
      model.indexOfTraining++;
    }
  },
  checkAnswer(letter: string, clickCount: number): boolean {
    const { word } = this.getCurrentTraining();

    // clickCount is used as an index
    if (word.indexOf(letter) === -1 || word[clickCount] !== letter) {
      model.words[model.indexOfTraining].numberOfErrors++;
      this.showCorrectAnswer();

      return false;
    }

    this.reduceButtons(letter);

    return true;
  },
  reduceButtons(letter: string): void {
    const { options } = this.getCurrentTraining();
    const index = options.indexOf(letter);

    model.words[model.indexOfTraining].options.splice(index, 1);
  },
  showCorrectAnswer(): void {
    const { word, numberOfErrors } = this.getCurrentTraining();

    if (numberOfErrors > 3) {
      const correctSequence = word.split("");
      model.words[model.indexOfTraining].options = correctSequence;

      training.render();
    }
  }
}
