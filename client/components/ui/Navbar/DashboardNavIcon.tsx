import { memo } from 'react';
import { LayoutDashboard } from './icons';

const DashboardNavIcon = () => (
  <span className="nav-glow-icon h-5 w-5">
    <svg className="nav-glow-icon__orbit" viewBox="0 0 24 24" aria-hidden>
      <circle className="nav-glow-icon__path" cx="12" cy="12" r="10" />
    </svg>
    <LayoutDashboard className="relative z-10 h-[14px] w-[14px]" />
  </span>
);

export default memo(DashboardNavIcon);
