import DashboardView from './view';
import { useDashboardData } from './data';

export default function Dashboard() {
  const { tabs, open, setOpen, bidCheck } = useDashboardData();

  return (
    <DashboardView
      tabs={tabs}
      open={open}
      setOpen={setOpen}
      bidCheck={bidCheck}
    />
  );
}
