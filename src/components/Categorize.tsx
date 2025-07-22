import FileInput from "./FileInput";
import { readCsv } from "../shared/services/CsvReader";
import { setFile, store } from "../state";
import { For } from "solid-js";

export default function Categorize() {
  function readingCsvFile(
    e: Event & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    },
  ) {
    if (!e.target?.files || !e.target.files.item(0)) {
      console.error("unexpected empty csv file input");
      return;
    }
    readCsv(e.target!.files!.item(0)!);
  }

  function settingFile(
    e: Event & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    },
  ) {
    if (e.target?.files && e.target.files.item(0)) {
      setFile(() => e.target!.files!.item(0)!);
    }
  }

  return (
    <>
      <FileInput
        label={"Précédente catégorisation"}
        defaultName={"Aucune sauvegarde"}
        accept={"application/json"}
        onChangeCallback={settingFile}
      />
      <FileInput
        label={"Export CSV"}
        defaultName={"Export de mamie"}
        accept={"text/csv"}
        onChangeCallback={readingCsvFile}
      />

      <ul>
        <For each={[...new Set(store.rows.map((row) => row.label))]}>
          {(label) => <li>{label}</li>}
        </For>
      </ul>
    </>
  );
}
