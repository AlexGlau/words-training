import { IModel, ITraining } from "../types/types";

export class Controller {
  constructor(public model: IModel, public training: ITraining) {
    // Render the app
    this.onRender();

    this.model.bindOnRender(this.onRender);
    this.model.bindAnswerRender(this.answerRenderHandler);
    this.model.bindSetCurrectNumberOfWord(this.currentWordRenderHandler);
    this.model.bindRenderStat(this.renderStatHandler);

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

  public renderStatHandler = (): void => {
    this.training.renderStat(this.model.getStat());
  }
}
