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
  expandedOperations = new Set<string>();

  private readonly creditMainOptions = Object.keys(ressources);
  private readonly debitMainOptions = Object.keys(depenses);

  protected mainOptions(op: Operation) {
    return op.type === 'credit' ? this.creditMainOptions : this.debitMainOptions;
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

  protected toggleExpanded(op: Operation) {
    if (this.expandedOperations.has(op.id)) {
      this.expandedOperations.delete(op.id);
    } else {
      this.expandedOperations.add(op.id);
    }
  }

  protected isExpanded(op: Operation): boolean {
    return this.expandedOperations.has(op.id);
  }

  protected changeComment($event: Event, op: Operation) {
    const htmlTextAreaElement = $event.target as HTMLTextAreaElement;
    const newComment = htmlTextAreaElement.value;
    const operationIdx = this.state.operations.findIndex((operation) => op === operation);
    const modifiedOperation = this.state.operations.at(operationIdx);
    if (modifiedOperation) {
      modifiedOperation.comment.set(newComment);
      modifiedOperation.edited.set(true);
      const storageLabel = this.state.getStorageLabel(modifiedOperation);
      this.state.saveToLocalStorage(
        storageLabel,
        modifiedOperation.category.main(),
        modifiedOperation.category.sub(),
        newComment,
      );
    }
  }
}
