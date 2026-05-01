import { Component, CUSTOM_ELEMENTS_SCHEMA, model } from '@angular/core';
import 'cally';

@Component({
  selector: 'app-month-picker',
  imports: [],
  templateUrl: './month-picker.html',
  styleUrl: './month-picker.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MonthPicker {
  readonly dateRange = model();

  protected nextSubject($event: any) {
    this.dateRange.set(
      $event.target.value.split('/').map((date: string) => {
        const el = date.split('-').map((e) => parseInt(e));
        return new Date(el[0], el[1] - 1, el[2]);
      }),
    );
  }
}
