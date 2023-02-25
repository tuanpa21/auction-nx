import { useMenuData } from './data';
import { MenuProps } from './interface';
import MenuPopUp from './view';

export default function MenuView({ items }: MenuProps) {
  const { onLogout, isLoading } = useMenuData();
  return <MenuPopUp items={items} onLogout={onLogout} isLoading={isLoading} />;
}
