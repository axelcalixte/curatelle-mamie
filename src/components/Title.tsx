import { onCleanup, onMount } from "solid-js";
import {
  prefersDarkListener,
  prefersDarkQuery,
} from "../shared/services/theme";

export default function Title() {
  onMount(() =>
    prefersDarkQuery.addEventListener("change", prefersDarkListener),
  );
  onCleanup(() =>
    prefersDarkQuery.removeEventListener("change", prefersDarkListener),
  );

  return (
    <section class="section has-text-centered">
      <h1 class="title is-1">Comptes de mamie</h1>
    </section>
  );
}
