import { For, onMount, createSignal, onCleanup } from "solid-js";
import { setStore } from "../state";
import { depenses, ressources, type Row } from "../types";
import { prefersDark } from "../shared/services/theme";

export default function Entry(props: { row: Row }) {
  const row = () => props.row;

  function getRessourcesOrDepenses() {
    return row().value > 0 ? ressources : depenses;
  }
  function mainCategoriesKeys() {
    return Object.keys(getRessourcesOrDepenses());
  }

  const [mainCategory, setMainCategory] = createSignal<string>(
    row().mainCategory ?? mainCategoriesKeys()[0],
  );
  const subCategories = () => getRessourcesOrDepenses()[mainCategory()];

  let mainCategorySelect!: HTMLSelectElement;

  let subCategorySelect!: HTMLSelectElement;

  function recoverOptionIdx(rowAttribute: "mainCategory" | "subCategory") {
    let optionIdx = -1;
    let option = row()[rowAttribute];
    if (option) {
      if (rowAttribute === "mainCategory")
        optionIdx = mainCategoriesKeys().indexOf(option);
      if (rowAttribute === "subCategory")
        optionIdx = getRessourcesOrDepenses()[mainCategory()].indexOf(option);
    }
    return optionIdx;
  }

  // manually setting the selectedIndex of both <select> element from the store values
  onMount(() => {
    const mainCategoryIdx = recoverOptionIdx("mainCategory");
    mainCategorySelect.selectedIndex =
      mainCategoryIdx === -1 ? 0 : mainCategoryIdx;

    const subCategoryIdx = recoverOptionIdx("subCategory");
    subCategorySelect.selectedIndex =
      subCategoryIdx === -1 ? 0 : subCategoryIdx;
  });

  function colors() {
    let prefers = "light";
    if (prefersDark()) {
      prefers = "dark";
    }
    switch (row().value < 0) {
      case true:
        return ["has-background-danger-" + prefers, "is-danger"];
      case false:
        return ["has-background-success-" + prefers, "is-success"];
      default:
        throw new Error("unreachable");
    }
  }
  return (
    <tr class={colors()[0]}>
      <th>{row().date.toLocaleDateString()}</th>
      <td>{row().value}</td>
      <td>{row().label}</td>
      <td>
        <div class={"select is-rounded " + colors()[1]}>
          <select
            ref={mainCategorySelect}
            onChange={(e) => {
              setStore(
                "rows",
                (r) => r.label === row().label,
                "mainCategory",
                e.target.value,
              );
              setMainCategory(() => e.target.value);
              // NOTE: syncing subCat idx with select tag selectedIdx
              setStore(
                "rows",
                (r) => r.label === row().label,
                "subCategory",
                getRessourcesOrDepenses()[e.target.value][0],
              );
              subCategorySelect.selectedIndex = 0;
            }}
          >
            <For each={mainCategoriesKeys()}>
              {(label) => <option>{label}</option>}
            </For>
          </select>
        </div>
      </td>

      <td>
        <div class={"select is-rounded " + colors()[1]}>
          <select
            ref={subCategorySelect}
            onChange={(e) => {
              setStore(
                "rows",
                (r) => r.label === row().label,
                "subCategory",
                e.target.value,
              );
              // implicitely updating selectedIdx here
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
