import { createEffect, Match, Switch } from "solid-js";
import { tab } from "../state";
import Categorize from "./Categorize";

export default function Content() {

  createEffect(() =>
    console.log("from App, current-tab: ", tab())
  );

  return (
    <section class="section">
      <Switch>
        <Match when={tab() === 0}>
          <Categorize />
        </Match>
        <Match when={tab() === 1}>
          <p>Check</p>
        </Match>
        <Match when={tab() === 2}>
          <p>Save</p>
        </Match>
      </Switch>
    </section>
  );
}
