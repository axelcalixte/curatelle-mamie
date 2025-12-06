import { escape, unescape } from "@std/html/entities";

import "./style.css";

function onReady() {
  tabSwitch();
  fileInputs();
}

function tabSwitch() {
  const tabs = document.querySelectorAll("li:has(> a:first-child)");
  if (tabs.length !== 4) {
    throw new Error("tabSwitch doesn't have the right number of tabs");
  }

  tabs[0].classList.add("is-active");

  tabs.forEach((node) => {
    node.addEventListener("click", () => {
      tabs.forEach((tab) => tab.classList.remove("is-active"));
      node.classList.add("is-active");
    });
  });
}

function fileInputs() {
  const [saveFile, exportFile] = Array.from(document.querySelectorAll(".file-input") as NodeListOf<HTMLInputElement>);
  const [saveFileLabel, exportFileLabel] = Array.from(document.querySelectorAll("span.file-label") as NodeListOf<HTMLSpanElement>);
  const [saveFileName, exportFileName] = Array.from(document.querySelectorAll("span.file-name") as NodeListOf<HTMLSpanElement>);

  const saveFileInput = {
    input: saveFile,
    label: saveFileLabel,
    name: saveFileName
  };

  console.log(saveFileInput);

  saveFileInput.input.addEventListener("change", (e) => {
    const file = (e.target!.files[0]);
    saveFileInput.name.innerHTML = escape(file.name);
  });

  const exportFileInput = {
    input: exportFile,
    label: exportFileLabel,
    name: exportFileName
  };

  console.log(exportFileInput);

}

document.addEventListener("readystatechange", onReady, false);

// import { readCsv } from "../shared/services/CsvReader";
// import {
//   exportMamie,
//   sauvegarde,
//   setExportMamie,
//   setFile,
//   setSauvegarde,
// } from "../state";
// import FileInput from "./FileInput";
//
// export default function Files() {
//   function readingCsvFile(
//     e: Event & {
//       currentTarget: HTMLInputElement;
//       target: HTMLInputElement;
//     },
//   ) {
//     if (!e.target?.files || !e.target.files.item(0)) {
//       throw new Error("unexpected empty csv file input");
//     }
//     readCsv(e.target!.files!.item(0)!);
//     setExportMamie(() => e.target!.files!.item(0)!.name);
//   }
//
//   function settingFile(
//     e: Event & {
//       currentTarget: HTMLInputElement;
//       target: HTMLInputElement;
//     },
//   ) {
//     if (e.target?.files && e.target.files.item(0)) {
//       setFile(() => e.target!.files!.item(0)!);
//       setSauvegarde(() => e.target!.files!.item(0)!.name);
//     }
//   }
//
//   return (
//     <>
//       <FileInput
//         label={"Précédente catégorisation"}
//         defaultName={sauvegarde()}
//         accept={"application/json"}
//         onChangeCallback={settingFile}
//       />
//       <FileInput
//         label={"Export CSV"}
//         defaultName={exportMamie()}
//         accept={"text/csv"}
//         onChangeCallback={readingCsvFile}
//       />
//     </>
//   );
// }
