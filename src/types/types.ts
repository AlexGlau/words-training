export interface ICurrentWord {
  word: string;
  options: string[];
  numberOfErrors: number;
}

export interface ITraining {
  wordsInTraining: number;
  words: ICurrentWord[];
  indexOfTraining: number;
  answer: string[];
}
