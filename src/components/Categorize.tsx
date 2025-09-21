import { For, onCleanup } from "solid-js";
import Tier from "./Tier";
import { setStore, store } from "../state";
import { produce } from "solid-js/store";

export default function Categorize() {
  function tiers() {
    return store.tiers;
  }

  let headerFooter = () => (
    <tr>
      <th>Edité</th>
      <th>Libellé</th>
      <th>Catégorie</th>
      <th>Sous-catégorie</th>
    </tr>
  );

  onCleanup(() => {
    for (const tier of tiers()) {
      setStore(
        "rows",
        (r) => r._label === tier.label,
        produce((row) => {
          row.mainCategory = tier.mainCategory;
          row.subCategory = tier.subCategory;
        }),
      );
    }
  });

  return (
    <table class="table mx-auto">
      <thead>{headerFooter()}</thead>
      <tbody>
        <For each={tiers()} fallback={<></>}>
          {(tier) => <Tier tier={tier} />}
        </For>
      </tbody>
      <tfoot>{headerFooter()}</tfoot>
    </table>
  );
}
