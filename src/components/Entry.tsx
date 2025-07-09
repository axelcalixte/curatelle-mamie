import {
  For,
  type Accessor,
  onMount,
  createSignal,
} from "solid-js";
import { store, setStore } from "../state";
import { depenses, ressources } from "../types";

export default function Entry(props: { idx: Accessor<number> }) {

  function idx(){ return props.idx() }
  function row(){ return store.rows[idx()] }

  function getRessourcesOrDepenses() {
    return store.rows[idx()].value > 0 ? ressources : depenses;
  }
  function mainCategoriesKeys() {
    return Object.keys(getRessourcesOrDepenses());
  }

  const [mainCategory, setMainCategory] = createSignal(row().mainCategory ?? mainCategoriesKeys()[0]);
  const subCategories = () => getRessourcesOrDepenses()[mainCategory() ?? mainCategoriesKeys()[0]];

  let mainCategorySelect!: HTMLSelectElement;
  let subCategorySelect!: HTMLSelectElement;

  function recoverOptionIdx(rowAttribute: "mainCategory" | "subCategory") {
    let optionIdx = -1;
    let option = row()[rowAttribute];
    if (option) {
      optionIdx = mainCategoriesKeys().indexOf(option);
    }
    return optionIdx;
  }

  // manually setting the selectedIndex of both <select> element from the store values
  onMount(() => {
    const mainCategoryIdx = recoverOptionIdx("mainCategory");
    mainCategorySelect.selectedIndex = mainCategoryIdx === -1 ? 0 : mainCategoryIdx;

    const subCategoryIdx = recoverOptionIdx("mainCategory");
    subCategorySelect.selectedIndex = subCategoryIdx === -1 ? 0 : subCategoryIdx;
  })

  return (
    <tr>
      <th>{row().date.toLocaleDateString()}</th>
      <td>{row().value}</td>
      <td>{row().label}</td>
      <td>
        <div class="select is-rounded">
          <select
            ref={mainCategorySelect}
            onChange={(e) => {
              setStore("rows", idx(), "mainCategory", e.target.value);
              setMainCategory(() => e.target.value);
            }}
          >
            <For each={mainCategoriesKeys()}>
              {(label) => <option>{label}</option>}
            </For>
          </select>
        </div>
      </td>

      <td>
        <div class="select is-rounded">
          <select
            ref={subCategorySelect}
            id={"subcat-" + idx()}
            onChange={(e) => {
              setStore("rows", idx(), "subCategory", e.target.value);
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
