import { readCsv } from "../shared/services/CsvReader";
import { setFile } from "../state";
import FileInput from "./FileInput";

export default function Files() {
  function readingCsvFile(
    e: Event & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    },
  ) {
    if (!e.target?.files || !e.target.files.item(0)) {
      throw new Error("unexpected empty csv file input");
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
    </>
  );
}
