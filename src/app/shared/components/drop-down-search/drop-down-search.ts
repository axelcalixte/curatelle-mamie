import { Component, computed, effect, input, linkedSignal, model, signal } from '@angular/core';
import { Observable } from 'rxjs';

type Element = {label: string, value: string, checked?: boolean};

@Component({
  selector: 'app-drop-down-search',
  imports: [],
  templateUrl: './drop-down-search.html',
  styleUrl: './drop-down-search.css',
})
export class DropDownSearch {
  name = input.required<string>();
  elements = model<Set<Element>>();
  selected = model<Set<Element>>();
  // selected: Observable<Set<T>>;
  reset = input<Observable<void> | undefined>();

  constructor() {
    console.log("dds constructor");
    effect((cleanup) => {
      const sub = this.reset()?.subscribe(() => {
        console.log("reset has been called");
        // this.toggleAllChecked()
        this.onChange(null);
      });

      console.log("isMatching", this.isMatching());
      console.log("isChecked", this.isChecked());
      console.log("isNotChecked", this.isNotChecked());
      cleanup(() => sub?.unsubscribe());
    });
  }

  searchInputTxt = signal<string>('');

  private isMatching = computed(() =>
      this.elements()?.values()
      ?.filter((el) => el.label.search(`${this.searchInputTxt()}`) !== -1)
      ?.reduce((x, y) => x.add(y), new Set<Element>())
  );

  isChecked = computed(() =>
      this.isMatching()?.values()
        ?.filter(el => el?.checked)
        ?.reduce((x, y) => x.add(y), new Set<Element>())
        // ?.sort((x, b) => x.label.localeCompare(b.label)) ?? [],
  );

  isNotChecked = computed(() =>
      this.isMatching()?.values()
        ?.filter((el) => el?.checked === undefined || el?.checked === false)
        ?.reduce((x, y) => x.add(y), new Set<Element>())
        // .sort((x, b) => x.label.localeCompare(b.label)) ?? [],
  );

  anyChecked = computed(() => this.isChecked()?.size ?? 0 > 0);

  onChange($event: Event | null) {
    if ($event?.target) {
      const target = $event.target as HTMLInputElement;
      this.searchInputTxt.set(target.value);
      console.log(target.value);
    } else {
      this.searchInputTxt.set("");
      console.log("search text input has been reset");
      console.log(this.name());
    }
  }

  toggleChecked(value: string) {
  //   this.elements.update((elements) => {
  //     if (elements === undefined) return undefined;
  //     const updated = [];
  //     for (const el of elements) {
  //       if (el.value === value) {
  //         updated.push({ value: el.value, label: el.label, checked: !el.checked });
  //       } else {
  //         updated.push({ value: el.value, label: el.label, checked: el.checked });
  //       }
  //     }
  //     return updated;
  //   });
  }

  toggleAllChecked() {
  //   this.elements.update((elements) => {
  //     if (elements === undefined) return undefined;
  //     return elements.map((el) => ({ value: el.value, label: el.label, checked: false }));
  //   });
  }
}
