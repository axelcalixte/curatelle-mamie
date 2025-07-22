import { createMemo, createResource, createSignal } from "solid-js";
import { Step, type Row, type TierT } from "./types";
import { createStore } from "solid-js/store";

const [tab, setTab] = createSignal<number>(Step.Files);

const [store, setStore] = createStore({
  tiers: [] as TierT[],
  rows: [] as Row[],
  sums: [] as number[],
});

const [file, setFile] = createSignal<File>();
const [saveFileResource] = createResource(file, readingSaveFile);

async function readingSaveFile(file: File) {
  return JSON.parse(await file.text());
}

const saveFile = createMemo(() => {
  try {
    return new Map<string, string[]>(saveFileResource());
  } catch (e) {
    console.error(e);
  }
});

export { tab, setTab, store, setStore, setFile, saveFile };
