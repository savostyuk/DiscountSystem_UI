import { ITab } from "./tab.interface";

export const HEADER_TABS: ITab[] = [
  {
    name: 'Discounts',
    path: 'discounts',
    localizationKey: 'header.discounts'
  },
  {
    name: 'Favorites',
    path: 'favorites',
    localizationKey: 'header.favorites'
  },
  {
    name: 'Moderator',
    path: 'moderator',
    localizationKey: 'header.moderator'
  },
  {
    name: 'Admin',
    path: 'admin',
    localizationKey: 'header.admin'
  },
];

export const MODERATOR_TABS: ITab[] = [
  {
    name: 'Vendors',
    path: '/moderator/vendors',
    localizationKey: 'moderator.vendors'
  },
  {
    name: 'Categories',
    path: '/moderator/categories_tags',
    localizationKey: 'moderator.categories'
  },
];

export const ADMIN_TABS: ITab[] = [
  {
    name: 'Users',
    path: '/admin/users',
    localizationKey: 'admin.users'
  },
  {
    name: 'Event History',
    path: '/admin/event-history',
    localizationKey: 'admin.event'
  }
];
