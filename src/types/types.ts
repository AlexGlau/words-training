export interface ICurrentWord {
  word: string;
  options: string[];
  numberOfErrors: number;
}

export interface IModel {
  wordsInTraining: number;
  words: ICurrentWord[];
  answer: string[];
  indexOfTraining: number;
  bindOnRender(cb: () => void): void;
  getCurrentTraining(): ICurrentWord;
  reduceButtons(letter: string): void;
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
  // updateNumberOfCurrentQuestion(): void;
  // renderStat(): void;
  // clearAnswer(): void;
  // handleClick(e: MouseEvent): void;
}
