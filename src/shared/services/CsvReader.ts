import Papa from "papaparse";
import {
  DebitOrCredit,
  depenses,
  ressources,
  type CaisseEpargne,
  type Row,
  type TierT,
} from "../../types";
import { saveFile, setStore } from "../../state";

const localStorage = window.localStorage;

function retrieveCategory(label: string, cat: number): string | undefined {
  if (cat < 0 || cat > 1) {
    console.error("CsvReader: only 0 and 1 are allowed category numbers");
    return undefined;
  }
  if (saveFile()?.has(label)) {
    return saveFile()?.get(label)![cat];
  } else {
    const item = localStorage.getItem(label);
    if (item && item[cat]) {
      return item[cat];
    } else {
      return undefined; // shouldn't be reached
    }
  }
}

function mapToRow(csvLine: CaisseEpargne): Row {
  const value = parseFloat(csvLine.Debit ? csvLine.Debit : csvLine.Credit!);
  // INFO: maybe "Libelee simplifie" is not the right column to store
  const mainCategory = retrieveCategory(csvLine["Libelle simplifie"], 0);
  const subCategory = retrieveCategory(csvLine["Libelle simplifie"], 1);
  return {
    date: new Date(csvLine["Date operation"]),
    value: value,
    label: csvLine["Libelle simplifie"],
    mainCategory: mainCategory,
    subCategory: subCategory,
    edited: Boolean(mainCategory || subCategory),
  };
}

function mapToTier(csvLine: CaisseEpargne) {
  const mainCategory = retrieveCategory(csvLine["Libelle simplifie"], 0);
  const subCategory = retrieveCategory(csvLine["Libelle simplifie"], 1);
  const value = parseFloat(csvLine.Debit ? csvLine.Debit : csvLine.Credit!);
  const resOrDep = value > 0 ? ressources : depenses;
  return {
    type: value > 0 ? DebitOrCredit.Credit : DebitOrCredit.Debit,
    label: csvLine["Libelle simplifie"],
    mainCategory: mainCategory ?? Object.keys(resOrDep)[0],
    subCategory: subCategory ?? resOrDep[Object.keys(resOrDep)[0]][0],
    edited: Boolean(mainCategory || subCategory),
  };
}

export function readCsv(file: File) {
  Papa.parse<CaisseEpargne>(file, {
    header: true,
    skipEmptyLines: true, // https://github.com/mholt/PapaParse/issues/447
    complete: function (results) {
      setStore("rows", () => [...results.data.map((line) => mapToRow(line))]);
      const tiers = new Array<TierT>();
      for (const result of results.data) {
        if (!tiers.some((t) => t.label === result["Libelle simplifie"]))
          tiers.push(mapToTier(result));
      }
      setStore("tiers", tiers);
    },
  });
}
