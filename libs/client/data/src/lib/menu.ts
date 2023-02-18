import {
  ArrowLeftIcon,
  ArrowLeftOnRectangleIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import { MenuItem } from '@auction-nx/client/components/popup';

export const profile: MenuItem[] = [
  {
    id: 'create',
    name: 'Create',
    icon: PlusCircleIcon,
    href: '/create',
  },
  {
    id: 'deposit',
    name: 'Deposit',
    icon: ArrowLeftIcon,
    href: '/deposit',
  },
  {
    id: 'logout',
    name: 'Logout',
    icon: ArrowLeftOnRectangleIcon,
    href: '/logout',
  },
];
