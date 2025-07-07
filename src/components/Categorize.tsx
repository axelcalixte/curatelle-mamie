import FileInput from "./FileInput";
import type { Setter } from "solid-js";
import { readCsv } from "../shared/services/CsvReader";

export default function Categorize() {

  function readingCsvFile(e/*, setFile: Setter<string>*/) {
    // FIX: better error handling on e is required and to be extracted in utils
    if (!e.target.files.item(0)) {
      console.error("CsvReader: unexpected empty file input");
      return;
    }
    readCsv(e.target.files.item(0));
  }

  function readingSaveFile(e, setSaveFile: Setter<Map<string, string[]>>) {
    setSaveFile(() => {
      let fileList = e.target!.files! as FileList;
      console.log(fileList.item(0));
      return new Map();
    })
  }

  return (
    <>
      <FileInput
        label={"Export CSV"}
        defaultName={"Export de mamie"}
        accept={"text/csv"}
        onChangeCallback={readingCsvFile}
      />
      <FileInput
        label={"Précédente catégorisation"}
        defaultName={"Aucune sauvegarde"}
        accept={"application/json"}
        onChangeCallback={readingSaveFile}
      />
    </>


  );
}
