import { Component, inject } from '@angular/core';
import { State } from '../../../shared/services/state';
import { ressources } from '../../../shared/types/form-sections';

@Component({
  selector: 'app-export',
  imports: [],
  templateUrl: './export.html',
  styleUrl: './export.css',
})
export class Export {
  state = inject(State);

  depensesSums = this.state.depensesSummary();
  ressourcesSums = this.state.ressourcesSummary();
  protected readonly ressources = ressources;
}
