import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BehaviorSubject, combineLatest, map, Observable, startWith } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivityCard } from '../../components/activity-card/activity-card';
import { ActivitiesService, Activity } from '../../../../core/services/activities';
import { MatDialog } from '@angular/material/dialog';
import { ActivityFilters, CategoryFilter } from '../../models/activity-filter.model';
import { FilterDialog, FilterDialogData } from '../../components/filter-dialog/filter-dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { FormControl, FormGroup } from '@angular/forms';
import { SortDialog } from '../../components/sort-dialog/sort-dialog';


type AreaOption = {
  id: string;
  label: string;
};

@Component({
  selector: 'app-activities-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, ActivityCard,MatFormFieldModule, MatInputModule,
    MatSelectModule, MatSliderModule
  ],
  templateUrl: './activities-page.html',
  styleUrls: ['./activities-page.scss']
})




export class ActivitiesPage {
  private searchSubject = new BehaviorSubject<string>('');
  search$ = this.searchSubject.asObservable();

  // form = new FormGroup({
  //   query: new FormControl<string>('')
  // });
  
  activities$!: Observable<Activity[]>;
  filteredActivities$!: Observable<Activity[]>;
  
  constructor(private activitiesService: ActivitiesService) {

    this.activities$ = this.activitiesService.getActivities();

    this.filteredActivities$ = combineLatest([
      this.activities$,
      this.search$
    ]).pipe(
      map(([activities, search]) => {
        if (!search) return activities;

        const lowerSearch = search.toLowerCase().trim();

        return activities.filter(activity => {
          const weekday = new Date(activity.start)
            .toLocaleDateString('en-US', { weekday: 'long' })
            .toLowerCase();

          return (
            activity.title.toLowerCase().includes(lowerSearch) ||
            activity.locationName.toLowerCase().includes(lowerSearch) ||
            activity.locationCity.toLowerCase().includes(lowerSearch) ||
            weekday.includes(lowerSearch)
          );
        });
      })
    );
  }

  onSearch(value: string) {
    this.searchSubject.next(value);
  }

  

  private dialog = inject(MatDialog);

private readonly categoryOptions: CategoryFilter[] = [
  { id: 'outdoors', title: 'Outdoors', subtitle: 'Hiking, cycling, picnicking', icon: 'park', premium: true },
  { id: 'food', title: 'Food & Drink', subtitle: 'Coffee, wine tasting, restaurant, bar', icon: 'restaurant', premium: true },
  { id: 'arts', title: 'Arts & Culture', subtitle: 'Book club, cinema, crafting, comedy', icon: 'theater_comedy', premium: true },
  { id: 'music', title: 'Music & Dance', subtitle: 'Live music, concert, karaoke, dance', icon: 'music_note', premium: true },
  { id: 'markets', title: 'Markets & Festivals', subtitle: 'Flea market, community festival, farm', icon: 'store', premium: true },
  { id: 'sports', title: 'Sports & Fitness', subtitle: 'Tennis, skiing, wellness', icon: 'fitness_center', premium: true },
  { id: 'games', title: 'Fun & Games', subtitle: 'Bowling, laser tag, pool, board games', icon: 'sports_esports', premium: true },
  { id: 'travel', title: 'Travel & Trips', subtitle: 'Camping, day trip, cruise', icon: 'luggage', premium: true },
  { id: 'video', title: 'Video call', subtitle: 'Activities over Zoom', icon: 'videocam', premium: true },
  { id: 'other', title: 'Other', subtitle: 'Everything else', icon: 'folder', premium: true },
];
filters: ActivityFilters = {
  categories: [],
  ageMin: 18,
  ageMax: 80,
  type: 'all',
  hideFull: false,
  hideXXL: false,
  hideGlobal: false,
  dateRangeEnabled: false,
};

openFilters() {
  const data: FilterDialogData = {
    initial: this.filters,
    categories: this.categoryOptions,
  };

  const isMobile = window.innerWidth < 600;
  const ref = this.dialog.open(FilterDialog, {
    data,
    panelClass: 'meet5-filter-dialog',
    autoFocus: false,
    restoreFocus: false,
    width: isMobile ? '100vw' : '500px',
    height: isMobile ? '100vh' : 'auto',
    maxWidth: '100vw'
  });

  ref.afterClosed().subscribe(result => {
    if (!result) return; // cancelled
    this.filters = result;

  });
}

openSort() {
  const dialogRef = this.dialog.open(SortDialog, {
    panelClass: 'meet5-filter-dialog',
    maxWidth: '100vw'
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Sort applied:', result);
    }
  });
}
 
// get filteredActivities() {
//   const search = this.query.value?.toLowerCase().trim();
//   if (!search) return this.activities;

//   return this.activities.filter(activity => {
//     const weekday = activity.date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

//     return (
//       activity.title.toLowerCase().includes(search) ||
//       activity.place.toLowerCase().includes(search) ||
//       activity.address.toLowerCase().includes(search) ||
//       weekday.includes(search)
//     );
//   });
// }

clearSearch() {
  this.searchSubject.next('');
}

  trackById(_: number, item: Activity) {
    return item.id;
  }
}