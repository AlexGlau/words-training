import { StatRow } from "./StatRow";
import { IStat } from "../types/types";

export class Stat {
  private stat: HTMLElement;

  constructor(public statistics: IStat) {
    this.stat = document.getElementById("stat");
  }

  public render(): void {
    const { wordsWithNoErrors, commonNumberOfErrors, wordWithMostErrors } =
      this.statistics;

    this.stat.appendChild(
      new StatRow("Words with no typos: ", wordsWithNoErrors).render()
    );
    this.stat.appendChild(
      new StatRow("Common number of typos: ", commonNumberOfErrors).render()
    );
    this.stat.appendChild(
      new StatRow("Word with most typos: ", wordWithMostErrors).render()
    );
  }
}
