import { ICurrentWord, IModel, ITraining } from "../types/types";

// interface IStat {
//   wordsWithNoErrors: number;
//   commonNumberOfErrors: number;
//   wordWithMostErrors: string;
// }

export class Controller {
  constructor(public model: IModel, public training: ITraining) {
    // Render the app
    this.onRender();

    this.model.bindOnRender(this.onRender);
    this.model.bindAnswerRender(this.answerRenderHandler);
    this.model.bindSetCurrectNumberOfWord(this.currentWordRenderHandler)

    this.training.renderNumberOfWords(
      this.model.wordsInTraining.toString()
    );

    this.training.onAnswer(this.onAnswerHandler);
  }

  public onRender = (): void => {
    this.training.render(this.model.getCurrentTraining());
  }

  private onAnswerHandler = (letter: string): void => {
    this.model.checkAnswer(letter);
  }

  public answerRenderHandler = (): void => {
    this.training.renderAnswers(this.model.getAnswer());
  }

  public currentWordRenderHandler = (): void => {
    this.training.setNumberOfCurrentWord(
      this.model.getNumberOfCurrentWord()
    );
  }

  // getNumberOfWordsInTraining(): number {
  //   return this.model.wordsInTraining;
  // }



  // getStat(): IStat {
  //   let wordsWithNoErrors = 0;
  //   this.model.words.forEach((word: ICurrentWord): void => {
  //     if (word.numberOfErrors === 0) {
  //       wordsWithNoErrors++;
  //     }
  //   });

  //   let commonNumberOfErrors = 0;
  //   this.model.words.forEach((word: ICurrentWord): void => {
  //     if (word.numberOfErrors > 0) {
  //       commonNumberOfErrors += word.numberOfErrors;
  //     }
  //   });

  //   let wordWithMostErrors = this.model.words[0].word;
  //   let firstIndex = this.model.words[0].numberOfErrors;
  //   for (let i = 1; i < this.model.words.length; i++) {
  //     if (this.model.words[i].numberOfErrors > firstIndex) {
  //       // Update previously stored number of errors
  //       firstIndex = this.model.words[i].numberOfErrors;
  //       wordWithMostErrors = this.model.words[i].word;
  //     }
  //   }

  //   return {
  //     wordsWithNoErrors,
  //     commonNumberOfErrors,
  //     wordWithMostErrors
  //   }
  // }
}
