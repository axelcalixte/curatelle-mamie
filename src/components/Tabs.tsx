import { onMount } from "solid-js";
import { setTab } from "../state";
import { Step } from "../types";

export default function Tabs() {
  let categorize!: HTMLLIElement;
  let check!: HTMLLIElement;
  let save!: HTMLLIElement;

  onMount(() => toggleTab(categorize));

  function toggleTab(ref: HTMLLIElement) {
    const refs = [categorize, check, save];
    for (const r of refs) {
      if (r === ref) r.classList.add("is-active");
      if (r !== ref) r.classList.remove("is-active");
    }
  }

  function changeContentsTo(ref: HTMLLIElement, step: number) {
    toggleTab(ref);
    setTab(() => step);
  }

  return (
    <section class="section">
      <div class="tabs is-fullwidth">
        <ul>
          <li
            ref={categorize}
            onClick={() => changeContentsTo(categorize, Step.Categorize)}
          >
            <a>
              <span>{Step.Categorize + 1}. Catégoriser</span>
            </a>
          </li>
          <li ref={check} onClick={() => changeContentsTo(check, Step.Check)}>
            <a>
              <span>{Step.Check + 1}. Vérifier</span>
            </a>
          </li>
          <li ref={save} onClick={() => changeContentsTo(save, Step.Save)}>
            <a>
              <span>{Step.Save + 1}. Exporter</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
