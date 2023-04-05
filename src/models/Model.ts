import { ICurrentWord } from "../types/types";

interface IModel {
  wordsInTraining: number;
  words: ICurrentWord[];
  answer: string[];
  indexOfTraining: number;
}

export const model: IModel = {
  wordsInTraining: 6,
  words: [],
  answer: [],
  indexOfTraining: 0,
}
