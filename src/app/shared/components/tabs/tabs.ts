import { Component, ElementRef, input, output, viewChildren } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export type Tab = {
  name: string;
  route: string;
};

@Component({
  selector: 'app-tabs',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './tabs.html',
  styleUrl: './tabs.css',
})
export class Tabs {
  tabs = input<Tab[]>([]);
  anchors = viewChildren<ElementRef<HTMLAnchorElement>>('link');
  selectedTab = output<Tab | undefined>();

  protected change($event: PointerEvent) {
    this.anchors().forEach((tab) => {
      if (tab.nativeElement !== $event.target) {
        tab.nativeElement.classList.remove('tab-active');
      } else {
        tab.nativeElement.classList.add('tab-active');
        this.selectedTab.emit(this.tabs().find((t) => t.name === tab.nativeElement.text));
      }
    });
  }
}
