import { Component, inject } from '@angular/core';
import { State } from '../../../shared/services/state';
import {
  depenses,
  DepensesKeys,
  Operation,
  ressources,
  RessourcesKeys,
} from '../../../shared/types/form-sections';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-verify',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './verify.html',
  styleUrl: './verify.css',
})
export class Verify {
  state = inject(State);

  operations = this.state.operations;

  protected mainOptions(op: Operation) {
    return op.type === 'credit' ? Object.keys(ressources) : Object.keys(depenses);
  }

  protected changeMainCategory($event: Event, op: Operation) {
    const htmlSelectElement = $event.target as HTMLSelectElement;
    const newMainCat = htmlSelectElement.options.item(htmlSelectElement.selectedIndex);
    if (newMainCat) {
      const newMainCatLabel = newMainCat.label as RessourcesKeys | DepensesKeys;
      const operationIdx = this.state.operations.findIndex((operation) => op === operation);
      const modifiedOperation = this.state.operations.at(operationIdx);
      if (modifiedOperation) {
        modifiedOperation.category.main.set(newMainCatLabel);
        modifiedOperation.edited.set(true);
        const storageLabel = this.state.getStorageLabel(modifiedOperation);
        this.state.saveToLocalStorage(
          storageLabel,
          newMainCatLabel,
          modifiedOperation.category.sub(),
          modifiedOperation.comment(),
        );
      }
    }
  }

  protected subOptions(op: Operation) {
    if (op.type === 'credit') {
      // @ts-ignore
      return ressources[op.category.main()];
    } else {
      // @ts-ignore
      return depenses[op.category.main()];
    }
  }

  protected changeSubCategory($event: Event, op: Operation) {
    const htmlSelectElement = $event.target as HTMLSelectElement;
    const newSubCat = htmlSelectElement.options.item(htmlSelectElement.selectedIndex);
    if (newSubCat) {
      const newSubCatLabel = newSubCat.label;
      const operationIdx = this.state.operations.findIndex((operation) => op === operation);
      const modifiedOperation = this.state.operations.at(operationIdx);
      if (modifiedOperation) {
        modifiedOperation.category.sub.set(newSubCatLabel);
        modifiedOperation.edited.set(true);
        const storageLabel = this.state.getStorageLabel(modifiedOperation);
        this.state.saveToLocalStorage(
          storageLabel,
          modifiedOperation.category.main(),
          newSubCatLabel,
          modifiedOperation.comment(),
        );
      }
    }
  }
}
