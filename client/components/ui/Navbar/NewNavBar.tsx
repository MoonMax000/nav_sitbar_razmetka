import { FC, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutVariant } from '../AppBackground/AppBackground';
import { cn } from '@/lib/utils';
import {
  Home as HomeIcon,
  LayoutDashboard,
  Settings as SettingsIcon,
  Shield,
  CreditCard,
  Api as ApiIcon,
  Bell,
  UsersRound,
  UserCog,
  BadgeCheck,
  ChevronDown,
  ChevronLeft,
  Dot,
} from './icons';

interface NavChildItem {
  id: string;
  to: string;
  label: string;
  icon?: FC<{ className?: string }>;
}

interface NavItem {
  id: string;
  label: string;
  to?: string;
  icon?: FC<{ className?: string }>;
  children?: NavChildItem[];
}

interface Props {
  variant?: LayoutVariant;
}

const NewNavBar: FC<Props> = ({ variant = 'primal' }) => {
  const [navbarOpen, setNavbarOpen] = useState(true);

  const navItems: NavItem[] = useMemo(
    () => [
      {
        id: 'home',
        label: 'Dashboard',
        to: '/',
        icon: LayoutDashboard,
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: SettingsIcon,
        children: [
          { id: 'security', to: '/security', label: 'Security', icon: Shield },
          { id: 'billing', to: '/billing', label: 'Billing', icon: CreditCard },
          { id: 'api', to: '/api', label: 'API', icon: ApiIcon },
          { id: 'notifications', to: '/notifications', label: 'Notifications', icon: Bell },
          { id: 'kyc', to: '/kyc', label: 'KYC', icon: BadgeCheck },
          { id: 'referrals', to: '/referrals', label: 'Referrals', icon: UsersRound },
          { id: 'profile_settings', to: '/profile_settings', label: 'Profile settings', icon: UserCog },
        ],
      },
    ],
    []
  );

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ settings: true });
  const toggleOpen = (id: string) =>
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className='relative mt-8 ml-8 hidden lg:block'>
      <button
        className={cn(
          'absolute top-[21px] right-[-16px] z-50 p-2 container-card rounded-[8px] flex items-center justify-center text-[#B0B0B0] transition-all duration-[800ms] hover:bg-[#181B20]',
          !navbarOpen && 'transform -translate-x-[222px]'
        )}
        onClick={() => setNavbarOpen((prev) => !prev)}
        style={{ boxShadow: '0 0 8px rgba(82,58,131,0.1)' }}
        aria-label='Toggle menu'
        aria-expanded={navbarOpen}
      >
        <ChevronLeft className={cn('h-5 w-5 transition-transform duration-[800ms]', !navbarOpen && 'rotate-180')} />
      </button>

      <nav
        className={cn(
          'container-card border-none flex flex-col h-fit gap-[28px] px-4 py-[24px] relative rounded-[12px] transition-all duration-[800ms]',
          navbarOpen ? 'translate-x-0 opacity-100 pointer-events-auto' : '-translate-x-[222px] opacity-0 pointer-events-none'
        )}
        aria-label='Primary'
      >
        <div
          className='absolute inset-0 rounded-[12px] pointer-events-none w-[100.2%] h-[100.2%]'
          style={{
            padding: '1px',
            background: 'linear-gradient(75deg, rgba(82,58,131,0) 0%, #523A83 50%, rgba(82,58,131,0) 100%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor' as any,
            maskComposite: 'exclude' as any,
          }}
        />

        <div className='flex items-center px-4 py-2'>
          <span className='mr-2 grid place-items-center rounded-sm bg-indigo px-[6px] py-[4px] text-white'>
            <HomeIcon className='h-4 w-4' />
          </span>
          <span className='font-bold text-[15px] text-lighterAluminum uppercase'>Dashboard</span>
        </div>

        <div
          className='w-full h-[2px] rounded-full'
          style={{
            background: 'linear-gradient(90deg, rgba(82,58,131,0) 0%, #523A83 50%, rgba(82,58,131,0) 100%)',
          }}
        />

        <ul className='flex flex-col gap-[12px]'>
          {navItems.map((item) => {
            const isSection = !!item.children?.length;
            const isOpen = !!openSections[item.id];
            const Icon = item.icon;

            return (
              <li key={item.id}>
                <div className='flex items-center'>
                  {item.to ? (
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        cn(
                          'flex-1 flex items-center text-left px-4 py-2 rounded hover:bg-[#181B20] transition font-bold text-[15px] focus:outline-none focus:ring-2 focus:ring-[#523A83]/40',
                          isActive ? 'text-white' : 'text-lighterAluminum'
                        )
                      }
                    >
                      {Icon ? <Icon className='mr-2 h-[18px] w-[18px] opacity-90' /> : <Dot className='mr-2 h-4 w-4 opacity-60' />}
                      {item.label}
                    </NavLink>
                  ) : (
                    <button
                      type='button'
                      className={cn(
                        'flex-1 flex items-center text-left px-4 py-2 rounded hover:bg-[#181B20] transition font-bold text-[15px] text-lighterAluminum focus:outline-none focus:ring-2 focus:ring-[#523A83]/40'
                      )}
                      onClick={() => isSection && toggleOpen(item.id)}
                      aria-expanded={isSection ? isOpen : undefined}
                      aria-controls={isSection ? `${item.id}-submenu` : undefined}
                    >
                      {Icon ? <Icon className='mr-2 h-[18px] w-[18px] opacity-90' /> : <Dot className='mr-2 h-4 w-4 opacity-60' />}
                      {item.label}
                    </button>
                  )}

                  {isSection && (
                    <button
                      type='button'
                      className='ml-2 mr-2 flex items-center text-lighterAluminum/70 hover:text-white transition'
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleOpen(item.id);
                      }}
                      aria-label='Toggle submenu'
                      aria-expanded={isOpen}
                      aria-controls={`${item.id}-submenu`}
                    >
                      <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
                    </button>
                  )}
                </div>

                {isSection && (
                  <ul
                    id={`${item.id}-submenu`}
                    className={cn(
                      'ml-8 mt-2 flex flex-col gap-2 overflow-hidden transition-all duration-300',
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    )}
                    role='group'
                    aria-label={`${item.label} submenu`}
                  >
                    {item.children!.map((child) => {
                      const ChildIcon = child.icon;
                      return (
                        <li key={child.id}>
                          <NavLink
                            to={child.to}
                            className={({ isActive }) =>
                              cn(
                                'flex items-center rounded px-4 py-[6px] text-[14px] hover:bg-[#181B20] transition focus:outline-none focus:ring-2 focus:ring-[#523A83]/40',
                                isActive ? 'text-white' : 'text-lighterAluminum'
                              )
                            }
                          >
                            {ChildIcon ? (
                              <ChildIcon className='mr-2 h-[16px] w-[16px] opacity-80' />
                            ) : (
                              <Dot className='mr-2 h-4 w-4 opacity-60' />
                            )}
                            {child.label}
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default NewNavBar;
