import { For } from "solid-js";
import Entry from "./Entry";
import { store } from "../state";

export default function Mouvements() {

  function rows() {
    return store.rows;
  }

  let headerFooter = () => (
    <tr>
      <th>
        <abbr title="Date">Date</abbr>
      </th>
      <th>Valeur</th>
      <th>Libellé</th>
      <th>Catégorie</th>
      <th>Sous-catégorie</th>
    </tr>
  );

  return (
    <table class="table mx-auto">
      <thead>{headerFooter()}</thead>
      <tfoot>{headerFooter()}</tfoot>
      <tbody>
        <For each={rows()} fallback={<></>}>
          {(row) => <Entry row={row} />}
        </For>
      </tbody>
    </table>
  );
}
