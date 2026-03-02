import { Routes } from '@angular/router';
import { ActivitiesPage } from './features/activities/pages/activities-page/activities-page';

const Placeholder = () =>
  import('@angular/common').then(m => {
    // Tiny inline component via a standalone route component-like pattern
    // (keeps project small; replace with real pages later)
    return class PlaceholderComponent {
      static ɵcmp = (null as any); // not used; we’ll do proper placeholders below
    };
  });

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'activities' },

  { path: 'activities', component: ActivitiesPage },

  // Placeholder routes (empty pages)
  {
    path: 'for-me',
    loadComponent: async () => (await import('./features/placeholder/placeholder')).Placeholder,
    data: { title: 'For me' }
  },
  {
    path: 'discover',
    loadComponent: async () => (await import('./features/placeholder/placeholder')).Placeholder,
    data: { title: 'Discover' }
  },
  {
    path: 'chats',
    loadComponent: async () => (await import('./features/placeholder/placeholder')).Placeholder,
    data: { title: 'Chats' }
  },
  {
    path: 'profile',
    loadComponent: async () => (await import('./features/placeholder/placeholder')).Placeholder,
    data: { title: 'Profile' }
  },

  { path: '**', redirectTo: 'activities' }
];