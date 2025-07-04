import {
  createSignal,
  For,
  onCleanup,
  type Accessor,
  createEffect,
  onMount,
} from "solid-js";
import { store, setStore } from "../state";
import { depenses, ressources } from "../types";

// TODO: properly have ids corresponding to the different entries per cat and subCat
// NOTE: I don't need to deal with the selected html attribute by myself.
export default function Entry(props: { idx: Accessor<number> }) {
  // const [subCategories, setSubCategories] = createSignal<string[]>([]);
  // const [mainCategory, setMainCategory] = createSignal<string>();

  // initialize mainCategories array for the mainCat selection and sets the store with the first Category
  const mainCategories = () => {
    // sets the mainCat options from the keys of depenses or ressources objects
    const mainCategories =
      store.rows[props.idx()].value < 0
        ? Object.keys(depenses)
        : Object.keys(ressources);

    // this needs to move sooner after parsing the csv and save files
    setStore("rows", props.idx(), "mainCategory", (current) =>
      current ? current : mainCategories[0],
    );

    return mainCategories;
  };

  // using the mainCategory of the store, gets the first subCategories to display
  const subCategories = () => {
    // this needs to move sooner, only sets the subCategory if it doesn't exist yet in the store
    setStore("rows", props.idx(), "subCategory", (current) =>
      current
        ? current
        : store.rows[props.idx()].value > 0
          ? ressources.Allocations[0]
          : depenses["Dépenses de la vie courante"][0],
    );

    // this will be useless when the subCategory in store is set sooner (at the parsing step)
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

  onMount(() => {
    // TODO: restore previously set selected option for cat and subcat on reload
    const catSelect = document.getElementById(
      "cat-" + props.idx(),
    ) as HTMLSelectElement;

    if (store.rows[props.idx()].value < 0) {
      const retrievedIdx = Object.keys(depenses).findIndex(
        (name) => name === store.rows[props.idx()].mainCategory,
      );
      catSelect.selectedIndex = retrievedIdx === -1 ? 0 : retrievedIdx;
    } else {
      const retrievedIdx = Object.keys(ressources).findIndex(
        (name) => name === store.rows[props.idx()].mainCategory,
      );
      catSelect.selectedIndex = retrievedIdx === -1 ? 0 : retrievedIdx;
    }
  });

  onMount(() => {
    // on reload/start,
    const subcatSelect = document.getElementById(
      "subcat-" + props.idx(),
    ) as HTMLSelectElement;

    if (store.rows[props.idx()].value < 0) {
      const retrievedIdx = Object.values(
        depenses[store.rows[props.idx()].mainCategory ?? depenses.Logement],
      ).findIndex((name) => name === store.rows[props.idx()].subCategory);
      subcatSelect.selectedIndex = retrievedIdx === -1 ? 0 : retrievedIdx;
    } else {
      const retrievedIdx = Object.values(
        ressources[store.rows[props.idx()].mainCategory ?? ressources.Revenus],
      ).findIndex((name) => name === store.rows[props.idx()].subCategory);
      subcatSelect.selectedIndex = retrievedIdx === -1 ? 0 : retrievedIdx;
    }
  });

  return (
    <tr>
      <th>{store.rows[props.idx()].date.toLocaleDateString()}</th>
      <td>{store.rows[props.idx()].value}</td>
      <td>{store.rows[props.idx()].label}</td>
      <td>
        <div class="select is-rounded">
          <select
            id={"cat-" + props.idx()}
            onChange={(e) => {
              setMainCategory(() => e.target.value);
              setStore("rows", props.idx(), "mainCategory", e.target.value);

              if (store.rows[props.idx()].value < 0) {
                setStore(
                  "rows",
                  props.idx(),
                  "subCategory",
                  depenses[e.target.value][0],
                );
                subCategories;
              } else {
                setStore(
                  "rows",
                  props.idx(),
                  "subCategory",
                  ressources[e.target.value][0],
                );
              }
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
            id={"subcat-" + props.idx()}
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
