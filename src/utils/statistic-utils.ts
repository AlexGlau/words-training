import { ICurrentWord } from "../types/types";

export function getWordsWithNoErrors(words: ICurrentWord[]): number {
  return words.reduce((acc: number, word: ICurrentWord): number => {
    if (word.numberOfErrors === 0) {
      acc++;
    }

    return acc;
  }, 0);
}

export function getCommonNumberOfErrors(words: ICurrentWord[]): number {
  return words.reduce(
    (acc: number, word: ICurrentWord) => acc + word.numberOfErrors,
    0
  );
}

export function getWordWithMostErrors(words: ICurrentWord[]): string {
  let wordWithMostErrors = "";
  const errors = words[0].numberOfErrors;
  let index = 0;

  for (let i = 1; i < words.length; i++) {
    if (words[i].numberOfErrors > errors) {
      index = i;
    }
  }

  wordWithMostErrors = words[index].word;

  return wordWithMostErrors;
}
