import { For } from "solid-js";
import Tier from "./Tier";
import { store } from "../state";

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
