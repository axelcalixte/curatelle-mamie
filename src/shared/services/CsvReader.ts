import Papa from "papaparse";
import type { CaisseEpargne, Row } from "../../types";
import { saveFile, setStore, store } from "../../state";

function retrieveCategory(label: string, cat: number): string | undefined {
  if (cat < 0 || cat > 1) {
    console.error("CsvReader: only 0 and 1 are allowed category numbers");
    return undefined;
  }
  return saveFile()?.get(label)![cat] ??
    localStorage.getItem("label") != null
    ? localStorage.getItem("label")![cat]
    : undefined;
}

function mapToRow(csvLine: CaisseEpargne): Row {
  // INFO: maybe "Libelee simplifie" is not the right column to store
  const mainCategory = retrieveCategory(csvLine["Libelle simplifie"], 0);
  const subCategory = retrieveCategory(csvLine["Libelle simplifie"], 1);
  return {
    date: new Date(csvLine["Date operation"]),
    value: parseFloat(csvLine.Debit ? csvLine.Debit : csvLine.Credit!),
    label: csvLine["Libelle operation"],
    mainCategory: mainCategory,
    subCategory: subCategory,
    edited: Boolean(mainCategory || subCategory)
  };
}

export function readCsv(files: FileList) {
  if (!files[0]) {
    console.error("CsvReader: unexpected empty file input");
    return;
  }
  Papa.parse<CaisseEpargne>(files[0], {
    header: true,
    skipEmptyLines: true, // https://github.com/mholt/PapaParse/issues/447
    complete: function(results) {
      console.log(results)
      setStore("rows", () => [...results.data.map((line) => mapToRow(line))]);
      console.log(store.rows);
    },
  });
}
