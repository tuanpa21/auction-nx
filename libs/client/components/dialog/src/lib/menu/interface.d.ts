import { ForwardRefExoticComponent, SVGProps } from 'react';

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
