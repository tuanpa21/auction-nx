import { ReactNode } from 'react';
import { Header } from '@auction-nx/client/components/navigation';
interface Props {
  children: ReactNode;
  title?: string;
}

export default function BaseLayout({ children }: Props) {
  return (
    <div className="h-screen w-screen">
      <Header />
      <main>{children}</main>
    </div>
  );
}
