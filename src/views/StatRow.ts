export class StatRow {
  constructor(private label: string, private value: string | number) {}

  public render(): Node {
    const statRow = document.createElement("div");
    statRow.className = "pt-1 pb-1";

    const statRowLabel = document.createElement("span");
    statRowLabel.textContent = this.label;
    statRow.appendChild(statRowLabel);

    const statRowValue = document.createElement("span");
    statRowValue.textContent = this.value.toString();
    statRow.appendChild(statRowValue);

    return statRow;
  }
}
