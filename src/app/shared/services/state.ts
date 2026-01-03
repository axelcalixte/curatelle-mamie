import { computed, Injectable, linkedSignal, resource, signal } from '@angular/core';
import { DepensesKeys, Entity, Operation, RessourcesKeys } from '../types/form-sections';

@Injectable({
  providedIn: 'root',
})
export class State {
  /**
   * every line in a vsc export from the bank is an operation to be categorized
   */
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
  /*
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
*/

  /**
   * filtered operations to batch categorize operations of same label_
   */
  categories = computed(() =>
    this.operations
      .filter((x) => {
        return !['CHEQUE', 'RETRAIT'].some((y) => x.label_.startsWith(y));
      })
      .map((x) => {
        return {
          type: x.type,
          edited: x.edited,
          label: x.label_,
          category: x.category,
        } as Entity;
      })
      .filter(this.distinct),
  );

  private distinct(element: Entity, index: number, array: Array<Entity>) {
    return array.findIndex((x) => x.label === element.label) === index;
  }
}
