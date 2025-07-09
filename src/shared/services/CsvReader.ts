import Papa from "papaparse";
import type { CaisseEpargne, Row } from "../../types";
import { save, setStore, store } from "../../state";

const localStorage = window.localStorage;

function retrieveCategory(label: string, cat: number): string | undefined {
  if (cat < 0 || cat > 1) {
    console.error("CsvReader: only 0 and 1 are allowed category numbers");
    return undefined;
  }
  if (save()?.has(label)) {
    return save()?.get(label)![cat];
  } else {
    const item = localStorage.getItem(label);
    if (item && item[cat]) {
      return item[cat];
    } else { return undefined; }
  }
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

export function readCsv(file: File) {
  Papa.parse<CaisseEpargne>(file, {
    header: true,
    skipEmptyLines: true, // https://github.com/mholt/PapaParse/issues/447
    complete: function(results) {
      setStore("rows", () => [...results.data.map((line) => mapToRow(line))]);
    },
  });
}
