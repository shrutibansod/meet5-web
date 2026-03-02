export type ActivityTypeFilter = 'all' | 'womenOnly' | 'weeklyMonthly';

export type CategoryFilter = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;       // material icon name
  premium?: boolean;  // show crown
};

export type ActivityFilters = {
  categories: string[];      // selected category IDs
  ageMin: number;
  ageMax: number;
  type: ActivityTypeFilter;

  hideFull: boolean;
  hideXXL: boolean;
  hideGlobal: boolean;

  dateRangeEnabled: boolean;
};