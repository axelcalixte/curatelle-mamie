import { createSignal } from "solid-js";

const prefersDarkQuery = window.matchMedia("(prefers-color-scheme: dark)");
const [prefersDark, setPrefersDark] = createSignal(prefersDarkQuery?.matches);

function prefersDarkListener(ev: MediaQueryListEvent) {
  setPrefersDark(() => ev.matches);
}

export { prefersDarkQuery, prefersDarkListener, prefersDark };
