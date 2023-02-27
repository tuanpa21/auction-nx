import { useMenuData } from './data';
import { MenuProps } from './interface';
import MenuPopUpView from './view';

export default function MenuPopup({ items }: MenuProps) {
  const { onLogout, isLoading } = useMenuData();
  return (
    <MenuPopUpView items={items} onLogout={onLogout} isLoading={isLoading} />
  );
}
