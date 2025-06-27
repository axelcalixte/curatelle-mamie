import {
  createSignal,
  For,
  onCleanup,
  type Accessor,
  createEffect,
} from "solid-js";
import { store, setStore } from "../state";
import { depenses, ressources } from "../types";

export default function Entry(props: { idx: Accessor<number> }) {
  // const [subCategories, setSubCategories] = createSignal<string[]>([]);

  const [mainCategory, setMainCategory] = createSignal<string>();

  const mainCategories = () => {
    const mainCategories =
      store.rows[props.idx()].value < 0
        ? Object.keys(depenses)
        : Object.keys(ressources);
    setStore("rows", props.idx(), "mainCategory", (current) =>
      current ? current : mainCategories[0],
    );
    return mainCategories;
  };

  const subCategories = () => {
    setStore("rows", props.idx(), "subCategory", (current) =>
      current
        ? current
        : store.rows[props.idx()].value > 0
          ? ressources.Allocations[0]
          : depenses["Dépenses de la vie courante"][0],
    );
    console.log(
      " --- running subCategories function",
      store.rows[props.idx()].subCategory,
    );
    return (
      depenses[mainCategory()] ??
      ressources[mainCategory()] ??
      (store.rows[props.idx()].value > 0
        ? ressources.Allocations
        : depenses["Dépenses de la vie courante"])
    );
  };

  onCleanup(() => {
    console.log(
      store.rows[props.idx()].mainCategory,
      store.rows[props.idx()].subCategory,
    );
  });

  createEffect(() => {
    // set selected select option
  });

  return (
    <tr>
      <th>{store.rows[props.idx()].date.toLocaleDateString()}</th>
      <td>{store.rows[props.idx()].value}</td>
      <td>{store.rows[props.idx()].label}</td>
      <td>
        <div class="select is-rounded">
          <select
            onChange={(e) => {
              // console.log("mainCategory changed:", e.target.value);
              setMainCategory(() => e.target.value);
              setStore("rows", props.idx(), "mainCategory", e.target.value);
            }}
          >
            <For each={mainCategories()}>
              {(label) => <option>{label}</option>}
            </For>
          </select>
        </div>
      </td>

      <td>
        <div class="select is-rounded">
          <select
            id="sub"
            onChange={(e) => {
              setStore("rows", props.idx(), "subCategory", e.target.value);
            }}
          >
            <For each={subCategories()}>
              {(label) => <option>{label}</option>}
            </For>
          </select>
        </div>
      </td>
    </tr>
  );
}
