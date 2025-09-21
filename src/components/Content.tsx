import { Match, Switch } from "solid-js";
import { tab } from "../state";
import Categorize from "./Categorize";
import Mouvements from "./Mouvements";
import Files from "./Files";
import Summary from "./Summary";

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
          <Mouvements />
        </Match>
        <Match when={tab() === 3}>
          <Summary />
        </Match>
      </Switch>
    </section>
  );
}
