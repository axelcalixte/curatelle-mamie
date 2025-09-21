import { readCsv } from "../shared/services/CsvReader";
import { exportMamie, sauvegarde, setExportMamie, setFile, setSauvegarde } from "../state";
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
    setExportMamie(() => e.target!.files!.item(0)!.name);
  }

  function settingFile(
    e: Event & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    },
  ) {
    if (e.target?.files && e.target.files.item(0)) {
      setFile(() => e.target!.files!.item(0)!);
      setSauvegarde(() => e.target!.files!.item(0)!.name);
    }
  }

  return (
    <>
      <FileInput
        label={"Précédente catégorisation"}
        defaultName={sauvegarde()}
        accept={"application/json"}
        onChangeCallback={settingFile}
      />
      <FileInput
        label={"Export CSV"}
        defaultName={exportMamie()}
        accept={"text/csv"}
        onChangeCallback={readingCsvFile}
      />
    </>
  );
}
