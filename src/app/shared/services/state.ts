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
  public operationsToSave() {
    return this.operations
      .map((operation: Operation) => {
        const isChequeOrRetrait = ['CHEQUE', 'RETRAIT'].some((x) => operation.label_.startsWith(x));
        return {
          type: operation.type,
          edited: operation.edited,
          label: isChequeOrRetrait ? operation.label : operation.label_,
          category: operation.category,
        } as Entity;
      })
      .filter(this.distinct)
      .map((entity) => {
        // Find the original operation to get the comment
        const operation = this.operations.find((op) => {
          const isChequeOrRetrait = ['CHEQUE', 'RETRAIT'].some((x) => op.label_.startsWith(x));
          return isChequeOrRetrait ? op.label === entity.label : op.label_ === entity.label;
        });
        return [
          entity.label,
          [entity.category.main(), entity.category.sub(), operation?.comment?.() || ''],
        ];
      });
  }

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

  /**
   * Save categorization to localStorage
   */
  saveToLocalStorage(label: string, mainCat: string, subCat: string, comment: string = '') {
    try {
      localStorage.setItem(label, JSON.stringify([mainCat, subCat, comment]));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }

  /**
   * Get the appropriate label for localStorage key
   */
  getStorageLabel(operation: Operation): string {
    const isChequeOrRetrait = ['CHEQUE', 'RETRAIT'].some((x) => operation.label_.startsWith(x));
    return isChequeOrRetrait ? operation.label : operation.label_;
  }

  /**
   * signal holding the sums per subcategory
   */
  private summary = computed(() => {
    const res = new Map<string, number>();
    for (const op of this.operations_()) {
      const key = op.category.sub();
      const value = res.get(key);
      if (value) {
        res.set(key, value + op.value);
      } else {
        res.set(key, op.value);
      }
    }
    return res;
  });

  ressourcesSummary = computed(() => {
    const res = new Map();
    this.summary().forEach((v, k) => {
      if (v > 0) {
        res.set(k, v);
      }
    });
    return res;
  });

  depensesSummary = computed(() => {
    const res = new Map();
    this.summary().forEach((v, k) => {
      if (v < 0) {
        res.set(k, v);
      }
    });
    return res;
  });
}
