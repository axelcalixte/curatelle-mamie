import { Component, inject } from '@angular/core';
import { State } from '../../../shared/services/state';
import {
  depenses,
  DepensesKeys,
  Entity,
  ressources,
  RessourcesKeys,
} from '../../../shared/types/form-sections';

@Component({
  selector: 'app-categorize',
  imports: [],
  templateUrl: './categorize.html',
  styleUrl: './categorize.css',
})
export class Categorize {
  state = inject(State);
  categories = this.state.categories;

  protected mainOptions(ent: Entity) {
    return ent.type === 'credit' ? Object.keys(ressources) : Object.keys(depenses);
  }

  protected changeMainCategory($event: Event, ent: Entity) {
    const htmlSelectElement = $event.target as HTMLSelectElement;
    const newMainCat = htmlSelectElement.options.item(htmlSelectElement.selectedIndex);
    if (newMainCat) {
      const newMainCatLabel = newMainCat.label as RessourcesKeys | DepensesKeys;
      this.state.operations.forEach((x) => {
        if (x.label_ === ent.label) {
          x.category.main.set(newMainCatLabel);
          x.edited.set(true);
          this.state.saveToLocalStorage(x.label_, newMainCatLabel, x.category.sub());
        }
      });
    }
  }

  protected subOptions(ent: Entity) {
    if (ent.type === 'credit') {
      // @ts-ignore
      return ressources[ent.category.main()];
    } else {
      // @ts-ignore
      return depenses[ent.category.main()];
    }
  }

  protected changeSubCategory($event: Event, ent: Entity) {
    const htmlSelectElement = $event.target as HTMLSelectElement;
    const newSubCat = htmlSelectElement.options.item(htmlSelectElement.selectedIndex);
    if (newSubCat) {
      for (const x of this.state.operations) {
        if (x.label_ === ent.label) {
          x.category.sub.set(newSubCat.label);
          x.edited.set(true);
          this.state.saveToLocalStorage(x.label_, x.category.main(), newSubCat.label);
        }
      }
    }
  }
}
