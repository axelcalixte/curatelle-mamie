import { Match, Switch } from "solid-js";
import { tab, store } from "../state";
import Categorize from "./Categorize";
import Mouvements from "./Mouvements";
import Files from "./Files";

export default function Content() {
  return (
    <section class="section">
      <Switch>
        <Match when={tab() === 0}>
          <Files />
        </Match>
        <Match when={tab() === 1}>
          <Categorize />
        </Match>
        <Match when={tab() === 2}>
          <Mouvements mouvements={store.rows} />
        </Match>
        <Match when={tab() === 3}>
          <p>Save</p>
        </Match>
      </Switch>
    </section>
  );
}
