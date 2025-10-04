import { createMemo, createResource, createSignal } from "solid-js";
import { Step, type Row, type TierT } from "./types";
import { createStore } from "solid-js/store";

const [tab, setTab] = createSignal<number>(Step.Files);
const [exportMamie, setExportMamie] = createSignal("Export de mamie");
const [sauvegarde, setSauvegarde] = createSignal("Aucune sauvegarde");
const [file, setFile] = createSignal<File>();
const [saveFileResource] = createResource(file, readingSaveFile);

const [store, setStore] = createStore({
  tiers: [] as TierT[],
  rows: [] as Row[],
});

async function readingSaveFile(file: File) {
  return JSON.parse(await file.text());
}

const saveFile = createMemo(() => {
  return new Map<string, string[]>(saveFileResource());
});

export {
  tab,
  setTab,
  store,
  setStore,
  setFile,
  saveFile,
  exportMamie,
  setExportMamie,
  sauvegarde,
  setSauvegarde,
};
