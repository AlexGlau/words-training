import { store } from "../store";
import {
  getWordWithMostErrors,
  getCommonNumberOfErrors,
  getWordsWithNoErrors,
} from "../utils/statistic-utils";
import { IModel, ICurrentWord, IStat } from "../types/types";

export class Model implements IModel {
  private clickCount = 0;
  private indexOfTraining: number;
  public wordsInTraining: number;
  public words: ICurrentWord[];
  public answer: string;
  public onRender: () => void;
  public answerRender: () => void;
  public renderCurrentNumberOfWord: (numberOfCurrentWord: string) => void;
  public renderStat: () => void;

  constructor() {
    this.wordsInTraining = 6;
    this.words = [];
    this.answer = "";
    this.indexOfTraining = 0;

    this.createTraining();
  }

  public bindOnRender(cb: () => void) {
    this.onRender = cb;
  }

  public bindAnswerRender(cb: () => void): void {
    this.answerRender = cb;
  }

  public bindSetCurrectNumberOfWord = (cb: () => void) => {
    this.renderCurrentNumberOfWord = cb;
  };

  public bindRenderStat = (cb: () => void): void => {
    this.renderStat = cb;
  };

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
    const { word, options } = this.getCurrentTraining();

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

    if (options.length === 0) {
      this.clickCount = 0;
      this.switchToNextWord();
    }
  }

  private showCorrectAnswer(): void {
    const { word, numberOfErrors } = this.getCurrentTraining();

    if (numberOfErrors === 3) {
      const correctSequence = word.split("");
      this.words[this.indexOfTraining].options = correctSequence;
      // Don't increase it on error. Otherwise next click returns wrong letter
      this.clickCount = 0;

      this.onRender();
      this.switchToNextWord();
    }
  }

  public getAnswer(): string {
    return this.answer;
  }

  public switchToNextWord(): void {
    if (this.wordsInTraining > this.indexOfTraining + 1) {
      setTimeout(() => {
        this.indexOfTraining++;
        // Clear previous answers
        this.answer = "";
        this.onRender();
        this.answerRender();
        this.renderCurrentNumberOfWord((this.indexOfTraining + 1).toString());
      }, 2000);
    } else {
      this.renderStat();
    }
  }

  public getNumberOfCurrentWord(): string {
    return (this.indexOfTraining + 1).toString();
  }

  public getStat(): IStat {
    return {
      wordsWithNoErrors: getWordsWithNoErrors(this.words),
      commonNumberOfErrors: getCommonNumberOfErrors(this.words),
      wordWithMostErrors: getWordWithMostErrors(this.words),
    };
  }
}
