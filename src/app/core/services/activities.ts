import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export type JoinedUser = {
  id: string;
  name: string;
  avatarUrl?: string; // optional -> if missing we show initials
};

export type Activity = {
  id: string;
  title: string;
  start: string; // ISO string for simplicity
  locationName: string;
  locationCity?: string;
  joined: JoinedUser[];
  capacity: number;
  priceTag?: string;        // e.g. "Free" / "€€"
  categoryTag?: string;     // e.g. "Music"
  coverUrl?: string;        // optional card cover
};

@Injectable({ providedIn: 'root' })
export class ActivitiesService {
  getActivities(): Observable<Activity[]> {
    const data: Activity[] = [
      {
        id: 'a1',
        title: 'WOB rockt! - Das Kneipenfestival',
        start: '2026-02-28T21:00:00',
        locationName: 'Das Alt Berlin',
        locationCity: 'Wolfsburg',
        joined: [
          { id: 'u1', name: 'Max Mustermann', avatarUrl: 'assets/avatars/u1.jpg' },
          { id: 'u2', name: 'Anna Schmidt', avatarUrl: 'assets/avatars/u2.jpg' },
          { id: 'u3', name: 'Lena Fischer', avatarUrl: 'assets/avatars/u3.jpg' },
        ],
        capacity: 10,
        categoryTag: 'Music',
        priceTag: '€€',
      },
      {
        id: 'a2',
        title: 'Brunch & Walk',
        start: '2026-03-01T10:30:00',
        locationName: 'City Park Entrance',
        locationCity: 'Magdeburg',
        joined: [
          { id: 'u4', name: 'Chris Weber' },
          { id: 'u5', name: 'Sophie Klein' },
          { id: 'u6', name: 'Tim Berger' },
          { id: 'u7', name: 'Mia Wagner' },
          { id: 'u8', name: 'Jonas Koch' },
        ],
        capacity: 12,
        categoryTag: 'Outdoor',
        priceTag: 'Free',
      },
      {
        id: 'a3',
        title: 'Boardgames Night',
        start: '2026-03-02T19:00:00',
        locationName: 'Café Nord',
        locationCity: 'Magdeburg',
        joined: [{ id: 'u9', name: 'Paul Neumann', avatarUrl: 'assets/avatars/u4.jpg' }],
        capacity: 8,
        categoryTag: 'Games',
        priceTag: '€',
      },
    ];

    return of(data);
  }
}