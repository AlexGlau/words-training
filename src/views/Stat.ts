import { controller } from "../controllers/Controller";
import { StatRow } from "./StatRow";

export const stat = {
  init(): void {
    this.stat = document.getElementById("stat");
    this.render();
  },
  render(): void {
    const {
      wordsWithNoErrors,
      commonNumberOfErrors,
      wordWithMostErrors
    } = controller.getStat();

    this.stat.appendChild(
      new StatRow('Words with no typos: ', wordsWithNoErrors).render()
    );
    this.stat.appendChild(
      new StatRow('Common number of typos: ', commonNumberOfErrors).render()
    );
    this.stat.appendChild(
      new StatRow('Word with most typos: ' ,wordWithMostErrors).render()
    )
  }
}
