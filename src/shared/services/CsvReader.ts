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

function retrieveCategory(label: string, cat: number, value: number): string | undefined {
  if (cat !== 0 && cat !== 1) {
    throw Error("CsvReader only accepts 0 and 1 as allowed category numbers");
  }
  if (saveFile().has(label)) {
    return saveFile().get(label)?.at(cat);
  }
  const item = localStorage.getItem(label);
  if (item) {
    const categories = JSON.parse(item);
    return categories.at(cat);
  }
  return undefined;
}

function mapToRow(csvLine: CaisseEpargne): Row {
  const value = parseFloat(csvLine.Debit ? csvLine.Debit : csvLine.Credit!);
  // INFO: maybe "Libelee simplifie" is not the right column to store
  const mainCategory = retrieveCategory(csvLine["Libelle simplifie"], 0);
  const subCategory = retrieveCategory(csvLine["Libelle simplifie"], 1);
  return {
    date: new Date(csvLine["Date operation"]),
    value: value,
    _label: csvLine["Libelle simplifie"],
    label: csvLine["Libelle operation"],
    mainCategory: mainCategory,
    subCategory: subCategory,
    edited: Boolean(mainCategory || subCategory),
  };
}

function mapToTiers(data: CaisseEpargne[]) {
  const tiers: TierT[] = [];
  for (const result of data) {
    if (
      !["CHEQUE", "RETRAIT"].some(except => (result["Libelle simplifie"] as string).startsWith(except))
      && !tiers.some((t) => t.label === result["Libelle simplifie"])
    )
      tiers.push(mapToTier(result));
  }
  return tiers;
}

function mapToTier(csvLine: CaisseEpargne): TierT {
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
    complete: function(results) {
      setStore("tiers", () => mapToTiers(results.data));
      setStore("rows", () => [...results.data.map((line) => mapToRow(line))]);
    },
  });
}
