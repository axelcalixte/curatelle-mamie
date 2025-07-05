import FileInput from "./FileInput";
import type { Setter } from "solid-js";
import { readCsv } from "../shared/services/CsvReader";

export default function Categorize() {

  function callback(e, setFile: Setter<string>) {
    setFile(() => {
      let fileList = e.target!.files!;
      readCsv(fileList);
      return fileList.length > 0
        ? fileList[0].name
        : "export de mamie";
    })
  }

  return (
    <FileInput
      label={"Export CSV"}
      defaultName={"Export de mamie"}
      onChangeCallback={callback}
    />
  
  );
}
