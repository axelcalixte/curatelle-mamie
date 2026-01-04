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
          return value.slice(1, value.length).replace(",", ".");
        } else {
          return value.replace(",", ".");
        }
      },
      complete: (results) => {
        this.state.setOperations = results.data.map((caisseEpargne) =>
          this.adapters.mapCaisseEpargneToOperation(caisseEpargne),
        );
      },
    });
  }

  protected parseSave($event: File) {
    this.state.file = $event;
  }
}
