import { ForwardRefExoticComponent, SVGProps } from 'react';
import {
  ArrowLeftIcon,
  ArrowLeftOnRectangleIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';

export interface MenuItem {
  id: string;
  name: string;
  icon: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
  href: string;
  bgColorClass?: string;
}

interface MenuProps {
  items: MenuItem[];
}


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
