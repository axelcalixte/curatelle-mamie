import { Component } from '@angular/core';
import { Tabs } from './shared/components/tabs/tabs';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Tabs, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  tabs = [
    { name: '1. Importer', route: '/import' },
    { name: '2. Catégoriser', route: '/categorize' },
    { name: '3. Vérifier', route: '/check' },
    { name: '4. Exporter', route: '/export' },
  ];
}
