import { Component, inject } from '@angular/core';
import { FileInput } from './components/file-input/file-input';
import Papa from 'papaparse';
import { CaisseEpargne } from '../../../shared/types/bank-formats';
import { State } from '../../../shared/services/state';
import { BankAdapters } from '../../../shared/services/bank-adapters';

@Component({
  selector: 'app-import',
  imports: [FileInput],
  templateUrl: './import.html',
  styleUrl: './import.css',
})
export class Import {
  state = inject(State);
  adapters = inject(BankAdapters);

  protected parseFile($event: File) {
    Papa.parse<CaisseEpargne>($event, {
      header: true,
      skipEmptyLines: true, // https://github.com/mholt/PapaParse/issues/447
      transform: (value, field) => {
        if (field === 'Credit' && value.startsWith('+')) {
          return value.slice(1).replace(',', '.');
        } else if (field === 'Debit' && value.startsWith('-')) {
          return value.replace(',', '.');
        } else if (typeof field === 'string' && field.startsWith('Date')) {
          const dateElements = value.split('/').map((el) => parseInt(el));
          return new Date(dateElements[0], dateElements[1] - 1, dateElements[2]);
        } else {
          return value;
        }
      },
      complete: (results) => {
        this.state.setOperations = results.data
          .map((caisseEpargne) => this.adapters.mapCaisseEpargneToOperation(caisseEpargne))
          .sort((a, b) => a.date.getTime() - b.date.getTime());

        // Initialize shared comment signals from loaded save file
        this.state.initializeCommentSignalsFromSave();
      },
    });
  }

  protected parseSave($event: File) {
    this.state.file = $event;
  }
}
