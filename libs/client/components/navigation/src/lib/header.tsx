// import { useBid } from '@auction-nx/client/components/dialog';
import { MenuPopUp } from '@auction-nx/client/components/dialog';
import { profile } from '@auction-nx/client/components/dialog';
import { useNavigationData } from './data';

export default function Header() {
  const { data, isSuccess } = useNavigationData();

  return (
    <>
      <div className="h-14 w-screen bg-black">
        <div className="flex  items-center justify-end pt-2">
          {/* Balance */}
          {isSuccess && (
            <div className="flex items-center justify-center">
              <p className="px-2 font-medium  text-white">
                {data?.data.email} {`[${data?.data.role}]`}
              </p>
              <p className="px-2 font-medium  text-white">|</p>
              <p className="px-2 font-medium  text-white">Balance</p>
              <p className="px-2 text-white font-semibold text-lg">
                ${data?.data.wallet.amount}
              </p>
            </div>
          )}
          {/* DropDown */}
          <MenuPopUp items={profile} />
        </div>
      </div>{' '}
    </>
  );
}
