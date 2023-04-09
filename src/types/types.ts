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
}

export type El = HTMLElement | null;

export interface ITraining {
  clickCount: number;
  // isCorrect: boolean;
  // letters: El;
  // answer: El;
  // currentQuestion: El;
  // init(): void;
  onAnswer(handler: (s: string) => void): void;
  renderNumberOfWords(value: string): void;
  render(word: ICurrentWord): void;
  renderAnswers(letter: string): void;
  setNumberOfCurrentWord(numberOfWord: string): void;
  // renderStat(): void;
  // clearAnswer(): void;
  // handleClick(e: MouseEvent): void;
}
