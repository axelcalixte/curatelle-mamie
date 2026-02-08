import { linkedSignal, signal, WritableSignal } from '@angular/core';
import { depenses, DepensesKeys, ressources, RessourcesKeys } from '../types/form-sections';

export class Category {
  main: WritableSignal<RessourcesKeys | DepensesKeys>;
  sub: WritableSignal<string>;

  constructor(
    private type: 'debit' | 'credit',
    main: RessourcesKeys | DepensesKeys,
    sub?: string,
  ) {
    this.type = type;
    this.main = signal(main);
    this.sub = linkedSignal(() =>
      this.type === 'credit'
        ? ressources[this.main() as RessourcesKeys][0]
        : depenses[this.main() as DepensesKeys][0],
    );
    if (sub) this.sub.set(sub);
  }
}
