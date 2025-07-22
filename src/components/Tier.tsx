import { createSignal, For, onMount } from "solid-js";
import { DebitOrCredit, depenses, ressources, type TierT } from "../types";
import { setStore } from "../state";

export default function Tier(props: { tier: TierT }) {
  const tier = () => props.tier;

  let mainCategorySelect!: HTMLSelectElement;
  let subCategorySelect!: HTMLSelectElement;

  function getRessourcesOrDepenses() {
    switch (tier().type) {
      case DebitOrCredit.Debit:
        return depenses;
      case DebitOrCredit.Credit:
        return ressources;
      default:
        throw new Error(
          "Tier.getRessourcesOrDepenses, unreachable, type is either 0 or 1",
        );
    }
  }

  function recoverOptionIdx(rowAttribute: "mainCategory" | "subCategory") {
    let optionIdx = -1;
    let option = tier()[rowAttribute];
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

  function mainCategoriesKeys() {
    return Object.keys(getRessourcesOrDepenses());
  }

  const [mainCategory, setMainCategory] = createSignal(
    tier().mainCategory ?? mainCategoriesKeys()[0],
  );
  const subCategories = () =>
    getRessourcesOrDepenses()[mainCategory() ?? mainCategoriesKeys()[0]];

  return (
    <tr>
      <td>{tier().edited ? "YES" : "NO"}</td>
      <td>{tier().label}</td>
      <td>
        <div class="select is-rounded">
          <select
            ref={mainCategorySelect}
            onChange={(e) => {
              setStore(
                "tiers",
                (t) => t.label === tier().label,
                "mainCategory",
                e.target.value,
              );
              setMainCategory(() => e.target.value);
              // NOTE: syncing subCat idx with select tag selectedIdx
              setStore(
                "tiers",
                (t) => t.label === tier().label,
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
        <div class="select is-rounded">
          <select
            ref={subCategorySelect}
            onChange={(e) => {
              setStore(
                "tiers",
                (t) => t.label === tier().label,
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
