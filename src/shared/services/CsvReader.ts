import Papa from "papaparse";
import type { CaisseEpargne, Row } from "../../types";
import { setStore } from "../../state";

function mapToRow(csvLine: CaisseEpargne): Row {
  return {
    date: new Date(csvLine["Date operation"]),
    value: parseFloat(csvLine.Debit ? csvLine.Debit : csvLine.Credit!),
    label: csvLine["Libelle operation"],
    mainCategory: undefined,
    subCategory: undefined,
    edited: false,
  };
}

export function readCsv(files: FileList) {
  if (!files[0]) {
    return;
  }
  Papa.parse<CaisseEpargne>(files[0], {
    header: true,
    skipEmptyLines: true, // https://github.com/mholt/PapaParse/issues/447
    complete: function(results) {
      console.log(results)
      setStore("rows", () => [...results.data.map((line) => mapToRow(line))]);
    },
  });
}
