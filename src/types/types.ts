export interface ICurrentWord {
  word: string;
  options: string[];
  numberOfErrors: number;
}

export interface IModel {
  clickCount: number;
  wordsInTraining: number;
  words: ICurrentWord[];
  answer: string;
  indexOfTraining: number;
  bindOnRender(cb: () => void): void;
  getCurrentTraining(): ICurrentWord;
  reduceButtons(letter: string): void;
  checkAnswer(letter: string): void;
  getAnswer(): string;
  bindAnswerRender(cb: () => void): void;
  getNumberOfCurrentWord(): string;
  bindSetCurrectNumberOfWord(cb: () => void): void;
  switchToNextWord(): void;
  getStat(): IStat;
  bindRenderStat(cb: () => void): void;
}

export type El = HTMLElement | null;

export interface ITraining {
  clickCount: number;
  onAnswer(handler: (s: string) => void): void;
  renderNumberOfWords(value: string): void;
  render(word: ICurrentWord): void;
  renderAnswers(letter: string): void;
  setNumberOfCurrentWord(numberOfWord: string): void;
  renderStat(statistics: IStat): void;
}

export interface IStat {
  wordsWithNoErrors: number;
  commonNumberOfErrors: number;
  wordWithMostErrors: string;
}
