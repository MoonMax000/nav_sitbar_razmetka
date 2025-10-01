import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutVariant } from '../AppBackground/AppBackground';
import { cn } from '@/lib/utils';

interface Props {
  variant?: LayoutVariant;
}

const NewNavBar: FC<Props> = ({ variant = 'primal' }) => {
  const [navbarOpen, setNavbarOpen] = useState(true);
  const navItems = [
    { to: '/', label: 'Profile' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/settings', label: 'Settings' },
    { to: '/security', label: 'Security' },
    { to: '/billing', label: 'Billing' },
    { to: '/api', label: 'API' },
  ];

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
        <svg className={cn('h-5 w-5 transition-transform duration-[800ms]', !navbarOpen && 'rotate-180')} viewBox='0 0 24 24' fill='none' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 19l-7-7 7-7'/></svg>
      </button>

      <div
        className={cn(
          'container-card border-none flex flex-col h-fit gap-[28px] px-4 py-[24px] relative rounded-[12px] transition-all duration-[800ms]',
          navbarOpen ? 'translate-x-0 opacity-100 pointer-events-auto' : '-translate-x-[222px] opacity-0 pointer-events-none'
        )}
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
          <span className='mr-2 h-4 w-4 rounded-sm bg-indigo block' />
          <span className='font-bold text-[15px] text-lighterAluminum uppercase'>Home</span>
        </div>

        <div
          className='w-full h-[2px] rounded-full'
          style={{
            background: 'linear-gradient(90deg, rgba(82,58,131,0) 0%, #523A83 50%, rgba(82,58,131,0) 100%)',
          }}
        />

        <ul className='flex flex-col gap-[28px]'>
          {navItems.map((item) => (
            <li key={item.to}>
              <div className='flex items-center'>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'flex-1 flex items-center text-left px-4 rounded hover:bg-gray-700 transition font-bold text-[15px]',
                      isActive ? 'text-white' : 'text-lighterAluminum'
                    )
                  }
                >
                  <span className='mr-2 h-3 w-3 rounded-full bg-primary/70' />
                  {item.label}
                </NavLink>
                <button type='button' className='mr-4 flex items-center opacity-50'>
                  <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 9l6 6 6-6'/></svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewNavBar;
