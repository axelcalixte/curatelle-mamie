import { Match, Switch } from "solid-js";
import { tab, store } from "../state";
import Categorize from "./Categorize";
import Mouvements from "./Mouvements";

export default function Content() {
  return (
    <section class="section">
      <Switch>
        <Match when={tab() === 0}>
          <Categorize />
        </Match>
        <Match when={tab() === 1}>
          <Mouvements mouvements={store.rows} />
        </Match>
        <Match when={tab() === 2}>
          <p>Save</p>
        </Match>
      </Switch>
    </section>
  );
}
