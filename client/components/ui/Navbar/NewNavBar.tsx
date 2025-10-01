import { FC, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LayoutVariant } from '../AppBackground/AppBackground';
import { cn } from '@/lib/utils';
import { navElements, NavElementProps } from './constants';
import { ChevronDown, DoubleArrow, ChevronLeft } from './icons';

interface Props {
  variant?: LayoutVariant;
}

const NewNavBar: FC<Props> = ({ variant = 'primal' }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDocked, setIsDocked] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const toggleGroup = (title: string) => setOpenGroup(openGroup === title ? null : title);

  const renderElement = (el: NavElementProps) => {
    if (el.children && el.children.length > 0) {
      const isOpen = openGroup === el.title;
      return (
        <div key={el.title}>
          <button
            onClick={() => toggleGroup(el.title)}
            className={cn('flex items-center justify-between w-full px-3 py-[14px] rounded-lg transition')}
            aria-expanded={isOpen}
            aria-controls={`${el.title}-submenu`}
          >
            <div
              className={cn('flex items-center gap-2 pl-2 hover:text-white hover:border-l-[2px] hover:border-purple', {
                'text-white border-l-[2px] border-purple': isOpen,
                'text-[#B0B0B0]': !isOpen,
                'ml-[5px]': isCollapsed,
              })}
            >
              <div className='size-5'>{el.icon}</div>
              {!isCollapsed && <span className='text-[15px] font-semibold'>{el.title}</span>}
            </div>
            {!isCollapsed && <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />}
          </button>
          {isOpen && !isCollapsed && (
            <div id={`${el.title}-submenu`} className='ml-6 flex flex-col gap-1'>
              {el.children.map((child) => (
                <NavLink key={child.title} to={child.route ?? '#'} className={cn('px-3')}>
                  {({ isActive }) => (
                    <div className={cn('flex items-center gap-2 pl-2 py-2 hover:custom-bg-blur hover:text-white hover:border-l-[2px] hover:border-purple', isActive ? 'text-white' : 'text-[#B0B0B0]')}>
                      <div className='size-5'>{child.icon}</div>
                      {!isCollapsed && <span className='text-[15px] font-semibold'>{child.title}</span>}
                    </div>
                  )}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (el.route) {
      return (
        <NavLink key={el.title} to={el.route} className={cn('px-3 py-[14px]', { 'ml-[5px]': isCollapsed })}>
          {({ isActive }) => (
            <div className={cn('flex items-center gap-2 pl-2 transition hover:text-white hover:border-l-[2px] hover:border-purple', isActive ? 'text-white' : 'text-[#B0B0B0]')}>
              <div className='size-5'>{el.icon}</div>
              {!isCollapsed && <span className='text-[15px] font-semibold'>{el.title}</span>}
            </div>
          )}
        </NavLink>
      );
    }

    return (
      <div key={el.title} className={cn('px-3 py-[14px]', { 'ml-[5px]': isCollapsed })}>
        <div className='flex items-center gap-2 pl-2 text-[#B0B0B0] hover:text-white hover:border-l-[2px] hover:border-purple'>
          <div className='size-5'>{el.icon}</div>
          {!isCollapsed && <span className='text-[15px] font-semibold'>{el.title}</span>}
        </div>
      </div>
    );
  };

  return (
    <div className='relative mt-8 ml-8 hidden lg:block'>
      <div
        className='relative transition-transform duration-300'
        style={{ transform: isDocked ? `translateX(-${isCollapsed ? 56 : 206}px)` : 'translateX(0)' }}
      >
        <button
          className={cn(
            'absolute top-[21px] z-50 p-2 container-card rounded-[8px] flex items-center justify-center text-[#B0B0B0] transition-all duration-300 hover:bg-[#181B20]',
            isDocked ? 'right-[-48px]' : 'right-[-16px]'
          )}
          onClick={() => setIsDocked((v) => !v)}
          style={{ boxShadow: '0 0 8px rgba(82,58,131,0.1)' }}
          aria-label='Toggle dock'
          aria-pressed={isDocked}
        >
          <ChevronLeft className={cn('h-5 w-5 transition-transform duration-300', isDocked && 'rotate-180')} />
        </button>

        <div
          className={cn(
            'bg-transparent relative h-fit rounded-[12px] p-[1px] w-fit',
            `bg-[linear-gradient(170.22deg,#523A83_0.01%,rgba(82,58,131,0)_8.28%),linear-gradient(350.89deg,#523A83_0%,rgba(82,58,131,0)_8.04%)]`
          )}
        >
          <div className={cn('flex flex-col py-4 transition-all duration-300 custom-bg-blur rounded-[12px]', isCollapsed ? 'w-[72px]' : 'w-[222px]')}>
            <div className='absolute right-[-12px] top-[14px]'>
              <button
                className='w-[26px] h-[26px] rounded-lg border border-[#181B22] custom-bg-blur hover:bg-[#1E1E1E] flex items-center justify-center'
                onClick={() => setIsCollapsed(!isCollapsed)}
                aria-label='Collapse menu'
                aria-pressed={isCollapsed}
              >
                <DoubleArrow className={cn('h-4 w-4 transition-transform', isCollapsed ? '' : 'rotate-180')} />
              </button>
            </div>

            <div className='flex flex-col gap-1'>
              {navElements.slice(0, 1).map((el) => renderElement(el))}
              <div
                className={cn('my-[14px] bg-[linear-gradient(90deg,rgba(82,58,131,0)_0%,#523A83_50%,rgba(82,58,131,0)_100%)] mx-auto h-[2px]', {
                  'w-[190px]': !isCollapsed,
                  'w-[40px]': isCollapsed,
                })}
              />
              {navElements.slice(1).map((el) => renderElement(el))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewNavBar;
