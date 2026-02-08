import { Component, inject } from '@angular/core';
import { State } from '../../../shared/services/state';
import { ressources } from '../../../shared/types/form-sections';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-export',
  imports: [CurrencyPipe],
  templateUrl: './export.html',
  styleUrl: './export.css',
})
export class Export {
  state = inject(State);

  depensesSums = this.state.depensesSummary();
  ressourcesSums = this.state.ressourcesSummary();
  protected readonly ressources = ressources;

  protected async exportSave() {
    const handle = await window.showSaveFilePicker({
      startIn: 'documents',
      suggestedName: 'comptes_de_mamie_sauvegarde.json',
      types: [
        {
          description: 'JaveScript Object Notation file',
          accept: { 'application/json': ['.json'] },
        },
      ],
    });
    const writer = await handle.createWritable();
    await writer.write(JSON.stringify(this.state.operationsToSave()));
    await writer.close();
  }
}
