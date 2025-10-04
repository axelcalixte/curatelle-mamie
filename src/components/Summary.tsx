import { For, onMount } from "solid-js";
import { store } from "../state";

export default function Summary() {
  const rows = () => store.rows;
  const subCatsSums = new Map<string, number>();

  let exportButton!: HTMLButtonElement;

  function getEveryUniqueSubCats() {
    for (const row of rows()) {
      if (!subCatsSums.has(row.subCategory!)) {
        subCatsSums.set(row.subCategory!, row.value * 100);
      } else {
        subCatsSums.set(
          row.subCategory!,
          row.value * 100 + subCatsSums.get(row.subCategory!)!,
        );
      }
    }
  }

  function mappedSums() {
    function cached() {
      if (subCatsSums.size > 0) return subCatsSums;
      else {
        getEveryUniqueSubCats();
        return subCatsSums;
      }
    }
    return [...cached()].map(([key, value]) => ({ key, value }));
  }

  function createMapOfLibelleCats() {
    return JSON.stringify(
      store.tiers
        .filter((tier) => tier.mainCategory && tier.subCategory)
        .map((tier) => [tier.label, [tier.mainCategory, tier.subCategory]]),
    );
  }

  onMount(() => {
    exportButton.addEventListener("click", async () => {
      const handle = await window.showSaveFilePicker({
        startIn: "documents",
        suggestedName: "comptes_de_mamie_sauvegarde.json",
        types: [
          {
            description: "JaveScript Object Notation file",
            accept: { "application/json": [".json"] },
          },
        ],
      });
      const writer = await handle.createWritable();
      await writer.write(createMapOfLibelleCats());
      await writer.close();
    });
  });

  return (
    <>
      <div class="columns">
        <div class="column has-text-centered">
          <h3 class="title is-3"> RESSOURCES </h3>
          <table class="table">
            <tbody>
              <For each={mappedSums().filter((x) => x.value > 0)}>
                {(entry) => (
                  <tr>
                    <td>{entry.key}</td>
                    <td>{entry.value / 100}</td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
        <div class="column has-text-centered">
          <h3 class="title is-3"> DEPENSES </h3>
          <table class="table">
            <tbody>
              <For each={mappedSums().filter((x) => x.value < 0)}>
                {(entry) => (
                  <tr>
                    <td>{entry.key}</td>
                    <td>{entry.value / 100}</td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </div>
      <div class="columns">
        <button class="button is-info mx-auto" ref={exportButton}>
          Exporter la sauvegarde
        </button>
      </div>
    </>
  );
}
