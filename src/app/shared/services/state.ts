import { Injectable, linkedSignal, resource, signal } from '@angular/core';
import { Operation } from '../../features/accounts/import/import';
import { DepensesKeys, RessourcesKeys } from '../types/form-sections';

@Injectable({
  providedIn: 'root',
})
export class State {
  private operations_ = signal([] as Operation[]);
  set setOperations(operations: Operation[]) {
    this.operations_.set(operations);
  }
  get operations() {
    return this.operations_();
  }

  private file_ = signal<File | null>(null);
  set file(file: File) {
    this.file_.set(file);
  }

  // return new Map<string, string[]>(save_());
  private save_ = resource({
    params: () => ({ file: this.file_() }),
    loader: async ({ params }) => {
      if (params?.file) {
        return new Map<string, string[]>(JSON.parse(await params.file!.text()));
      } else {
        return undefined;
      }
    },
  });

  /**
   * linkedSignal to be able to update the save while categorizing
   */
  save = linkedSignal(() => {
    if (this.save_.hasValue()) {
      return this.save_.value();
    }
    return new Map<string, [DepensesKeys | RessourcesKeys, string]>();
  });

  /**
   * operations to save format label => {mainCat, subCat}
   * @private
   */
  private operationsToSave() {
    this.operations.map((operation: Operation) => {
      return [
        ['CHEQUE', 'RETRAIT'].some((x) => operation.label_.startsWith(x))
          ? operation.label
          : operation.label_,
        [operation.category.main(), operation.category.sub()],
      ];
    });
  }
}
