import { Routes } from '@angular/router';
import { Categorize } from './features/accounts/categorize/categorize';
import { Verify } from './features/accounts/verify/verify';
import { Export } from './features/accounts/export/export';
import { Import } from './features/accounts/import/import';

export const routes: Routes = [
  { path: '', redirectTo: '/import', pathMatch: 'full' },
  { path: 'import', component: Import },
  { path: 'categorize', component: Categorize },
  { path: 'check', component: Verify },
  { path: 'export', component: Export },
];
