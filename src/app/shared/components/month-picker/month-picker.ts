import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs';
import 'cally';
import { outputFromObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-month-picker',
  imports: [],
  templateUrl: './month-picker.html',
  styleUrl: './month-picker.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MonthPicker {
  private readonly dateRangeSubject = new Subject<[Date, Date]>();
  dateRange = outputFromObservable(this.dateRangeSubject.asObservable());

  protected nextSubject($event: any) {
    this.dateRangeSubject.next($event.target.value.split('/').map((el: string) => new Date(el)));
  }
}
