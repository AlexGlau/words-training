import { controller } from "../controllers/Controller";
import { StatRow } from "./StatRow";

export const stat = {
  init(): void {
    this.stat = document.getElementById("stat");
    this.render();
  },
  render(): void {
    const {
      wordsWithNoTypos,
      commonNumberOfTypos,
      wordWithMostTypos
    } = controller.getStat();

    this.stat.appendChild(
      new StatRow('Words with no typos: ', wordsWithNoTypos).render()
    );
    this.stat.appendChild(
      new StatRow('Common number of typos: ', commonNumberOfTypos).render()
    );
    this.stat.appendChild(
      new StatRow('Word with most typos: ' ,wordWithMostTypos).render()
    )
  }
}
