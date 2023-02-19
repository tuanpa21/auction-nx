// import { useBid } from '@auction-nx/client/components/dialog';
import { MenuPopUp } from '@auction-nx/client/components/dialog';
import { profile } from '@auction-nx/client/components/dialog';

export default function Header() {
  //   const { data } = useBid();

  return (
    <>
      <div className="h-14 w-screen bg-black">
        <div className="flex  items-center justify-end pt-2">
          {/* Balance */}
          <div className="flex items-center justify-center">
            <p className="px-2 font-medium  text-white">Balance</p>
            <p className="px-2 text-xs  text-white">$1000</p>
          </div>
          {/* DropDown */}
          <MenuPopUp items={profile} />
        </div>
      </div>{' '}
    </>
  );
}
