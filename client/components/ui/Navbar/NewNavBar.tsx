import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutVariant } from '../AppBackground/AppBackground';

interface Props {
  variant?: LayoutVariant;
}

const NewNavBar: FC<Props> = ({ variant = 'primal' }) => {
  const navItems = [
    { to: '/', label: 'Profile' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/settings', label: 'Settings' },
    { to: '/security', label: 'Security' },
    { to: '/billing', label: 'Billing' },
    { to: '/api', label: 'API' },
  ];

  return (
    <nav className="sticky top-20 hidden h-fit w-64 flex-col gap-2 p-4 lg:flex">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `rounded-lg px-4 py-3 text-sm font-medium transition ${
              isActive
                ? 'bg-primary text-white'
                : 'text-webGray hover:bg-moonlessNight hover:text-white'
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default NewNavBar;
