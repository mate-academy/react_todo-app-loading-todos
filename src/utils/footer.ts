import { FooterLink } from '../types/footer';

export const footerLinks: Array<FooterLink> = [
  {
    label: 'All',
    dataCy: 'FilterLinkAll',
    href: '#/',
    key: 'all',
  },
  {
    label: 'Active',
    dataCy: 'FilterLinkActive',
    href: '#/active',
    key: 'active',
  },
  {
    label: 'Completed',
    dataCy: 'FilterLinkCompleted',
    href: '#/completed',
    key: 'completed',
  },
];
