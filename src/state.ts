import { createMemo, createResource, createSignal } from "solid-js";
import { Step, type Row } from "./types";
import { createStore } from "solid-js/store";

const [tab, setTab] = createSignal<number>(Step.Categorize);
const [store, setStore] = createStore({
  rows: [] as Row[],
  sums: [] as number[],
});

const [file, setFile] = createSignal<File>();
const [saveFileResource] = createResource(file, readingSaveFile);

async function readingSaveFile(file: File) {
  try {
    return JSON.parse(await file.text());
  } catch (e) {
    alert(e);
    console.error(e);
  }
}

const save = createMemo(() => {
  try {
    return new Map<string, string[]>(saveFileResource());
  } catch (e) {
    console.error(e);
  }
})

export { tab, setTab, store, setStore, setFile, save };
