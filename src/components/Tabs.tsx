import { onMount } from "solid-js";
import { setTab } from "../state";
import { Step } from "../types";

export default function Tabs() {

  let categorize!: HTMLLIElement;
  let check!: HTMLLIElement;
  let save!: HTMLLIElement;

  onMount(() => toggleTab(categorize));

  function toggleTab(ref: HTMLLIElement) {
    if (ref === categorize) {
      if (!ref.classList.contains("is-active")) {
        ref.classList.add("is-active");
      }
      check.classList.remove("is-active");
      save.classList.remove("is-active");
    } else if (ref === check) {
      if (!ref.classList.contains("is-active")) {
        ref.classList.add("is-active");
      }
      categorize.classList.remove("is-active");
      save.classList.remove("is-active");
    } else if (ref === save) {
      if (!ref.classList.contains("is-active")) {
        ref.classList.add("is-active");
      }
      categorize.classList.remove("is-active");
      check.classList.remove("is-active");
    }
  }

  return (
    <section class="section">
      <div class="tabs is-fullwidth">
        <ul>
          <li ref={categorize} onClick={() => {
            toggleTab(categorize);
            setTab(() => Step.Categorize);
          }}>
            <a>
              <span>1. Catégoriser</span>
            </a>
          </li>
          <li ref={check} onClick={() => {
            toggleTab(check);
            setTab(() => Step.Check);
          }}>
            <a>
              <span>2. Vérifier</span>
            </a>
          </li>
          <li ref={save} onClick={() => {
            toggleTab(save);
            setTab(() => Step.Save);
          }}>
            <a>
              <span>3. Exporter</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
