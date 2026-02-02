import { inject, Injectable, signal } from '@angular/core';
import { CaisseEpargne } from '../types/bank-formats';
import {
  depenses,
  DepensesKeys,
  Operation,
  ressources,
  RessourcesKeys,
} from '../types/form-sections';
import { Category } from '../models/models';
import { State } from './state';

@Injectable({
  providedIn: 'root',
})
export class BankAdapters {
  state = inject(State);

  mapCaisseEpargneToOperation(caisseEpargne: CaisseEpargne): Operation {
    const type = caisseEpargne.Credit.length > 0 ? 'credit' : 'debit';
    const simplifiedLabel = caisseEpargne['Libelle simplifie'];
    const fullLabel = caisseEpargne['Libelle operation'];

    // For CHEQUE/RETRAIT operations, use full label for localStorage like categories do
    const isChequeOrRetrait = ['CHEQUE', 'RETRAIT'].some((x) => simplifiedLabel.startsWith(x));
    const storageLabel = isChequeOrRetrait ? fullLabel : simplifiedLabel;

    const mainCategory = this.retrieveMainCategory(type, simplifiedLabel);
    const subCategory = this.retrieveSubCategory(type, simplifiedLabel);

    return {
      type: type, // TODO: I probably don't need to keep it there, it is kept in Category
      id: crypto.randomUUID(),
      edited: signal(false),
      date: caisseEpargne['Date operation'],
      value: type === 'credit' ? parseFloat(caisseEpargne.Credit) : parseFloat(caisseEpargne.Debit),
      label_: simplifiedLabel,
      label: fullLabel,
      category: new Category(type, mainCategory, subCategory),
      comment: signal(this.retrieveComment(storageLabel)),
    };
  }

  private retrieveMainCategory(type: 'debit' | 'credit', label: string) {
    if (this.state.save()?.has(label) && type === 'debit') {
      return this.state.save()?.get(label)?.at(0) as DepensesKeys;
    }
    if (this.state.save()?.has(label) && type === 'credit') {
      return this.state.save()?.get(label)?.at(0) as RessourcesKeys;
    }

    const item = localStorage.getItem(label);
    if (item && type === 'debit') {
      return JSON.parse(item).at(0) as DepensesKeys;
    }
    if (item && type === 'credit') {
      return JSON.parse(item).at(0) as RessourcesKeys;
    }

    return type === 'debit'
      ? (Object.keys(depenses)[0] as DepensesKeys)
      : (Object.keys(ressources)[0] as RessourcesKeys);
  }

  private retrieveSubCategory(type: 'debit' | 'credit', label: string) {
    if (this.state.save()?.has(label)) {
      return this.state.save()?.get(label)?.at(1);
    }

    const item = localStorage.getItem(label);
    if (item) {
      return JSON.parse(item).at(1) as string | undefined;
    }

    return type === 'debit'
      ? (depenses['Dépenses de la vie courante'][0] as string)
      : (ressources.Revenus[0] as string);
  }

  private retrieveComment(label: string): string {
    if (this.state.save()?.has(label)) {
      return this.state.save()?.get(label)?.at(2) || '';
    }

    const item = localStorage.getItem(label);
    if (item) {
      const parsed = JSON.parse(item);
      return parsed.length > 2 ? parsed[2] : '';
    }

    return '';
  }
}
