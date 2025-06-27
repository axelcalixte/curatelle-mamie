import { For } from "solid-js";
import Entry from "./Entry";
import type { Row } from "../types";

export default function Mouvements(props: { mouvements: Row[] }) {
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
        <For each={props.mouvements} fallback={<></>}>
          {(_, index) => <Entry idx={index} />}
        </For>
      </tbody>
    </table>
  );
}
