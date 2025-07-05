import { createSignal } from "solid-js";

export default function FileInput(props: { label: string, defaultName: string, onChangeCallback: Function }) {

  const [file, setFile] = createSignal<string>();

  return (
    <div class="file is-info is-centered has-name">
      <label class="file-label">
        <input
          class="file-input"
          id="export"
          type="file"
          accept="text/csv"
          onChange={(e) => props.onChangeCallback(e, setFile)}
        />
        <span class="file-cta">
          <span class="file-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
            </svg>
          </span>
          <span class="file-label">{props.label}</span>
        </span>
        <span class="file-name">{file() ?? props.defaultName}</span>
      </label>
    </div>
  );
}
