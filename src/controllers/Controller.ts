import { model } from "../models/Model";
import { store } from "../store";
import { ICurrentWord } from "../types/types";
import { training } from "../views/Training";

interface IStat {
  wordsWithNoErrors: number;
  commonNumberOfErrors: number;
  wordWithMostErrors: string;
}

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
  switchToNextWord(): void {
    const { indexOfTraining, wordsInTraining } = model;

    if (wordsInTraining > indexOfTraining + 1) {
      model.indexOfTraining++;
    } else {
      training.renderStat();
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

    if (numberOfErrors === 3) {
      const correctSequence = word.split("");
      model.words[model.indexOfTraining].options = correctSequence;
      training.clickCount = 0;
      training.render();

      setTimeout(() => {
        this.switchToNextWord();
        training.render();
        training.clearAnswer();
        training.updateNumberOfCurrentQuestion();
      }, 2000);
    }
  },
  getStat(): IStat {
    let wordsWithNoErrors = 0;
    model.words.forEach((word: ICurrentWord): void => {
      if (word.numberOfErrors === 0) {
        wordsWithNoErrors++;
      }
    });

    let commonNumberOfErrors = 0;
    model.words.forEach((word: ICurrentWord): void => {
      if (word.numberOfErrors > 0) {
        commonNumberOfErrors += word.numberOfErrors;
      }
    });

    let wordWithMostErrors = model.words[0].word;
    let firstIndex = model.words[0].numberOfErrors;
    for (let i = 1; i < model.words.length; i++) {
      if (model.words[i].numberOfErrors > firstIndex) {
        // Update previously stored number of errors
        firstIndex = model.words[i].numberOfErrors;
        wordWithMostErrors = model.words[i].word;
      }
    }

    return {
      wordsWithNoErrors,
      commonNumberOfErrors,
      wordWithMostErrors
    }
  }
}
