import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutVariant } from '../AppBackground/AppBackground';
import { cn } from '@/lib/utils';
import { navElements, NavElementProps } from './constants';
import { ChevronDown, DoubleArrow, QuillPen } from './icons';
import CreatePostModal from '@/components/CreatePostBox/CreatePostModal';
import CreateTweetDialog from '@/components/socialComposer/CreateTweetDialog';

interface Props {
  variant?: LayoutVariant;
}

const NewNavBar: FC<Props> = ({ variant = 'primal' }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [isPostComposerOpen, setIsPostComposerOpen] = useState(false);
  const [isTweetDialogOpen, setIsTweetDialogOpen] = useState(false);

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
              className={cn('group flex items-center gap-2 pl-2 hover:text-white hover:border-l-[2px] hover:border-purple overflow-hidden', {
                'text-white border-l-[2px] border-purple': isOpen,
                'text-[#B0B0B0]': !isOpen,
                'ml-[5px]': isCollapsed,
              })}
              data-active={isOpen ? 'true' : undefined}
            >
              <div className='flex h-5 w-5 flex-shrink-0 items-center justify-center'>{el.icon}</div>
              <span
                className={cn('text-[15px] font-semibold whitespace-nowrap transition-all duration-300', {
                  'opacity-0 w-0': isCollapsed,
                  'opacity-100 w-auto': !isCollapsed,
                })}
              >
                {el.title}
              </span>
            </div>
            {!isCollapsed && <ChevronDown className={cn('h-4 w-4 transition-transform flex-shrink-0', isOpen && 'rotate-180')} />}
          </button>
          {isOpen && !isCollapsed && (
            <div id={`${el.title}-submenu`} className='ml-6 flex flex-col gap-1'>
              {el.children.map((child) => (
                <NavLink key={child.title} to={child.route ?? '#'} className={cn('px-3')}>
                  {({ isActive }) => (
                    <div
                      className={cn('group flex items-center gap-2 pl-2 py-2 hover:custom-bg-blur hover:text-white hover:border-l-[2px] hover:border-purple overflow-hidden', isActive ? 'text-white' : 'text-[#B0B0B0]')}
                      data-active={isActive ? 'true' : undefined}
                    >
                      <div className='flex h-5 w-5 flex-shrink-0 items-center justify-center'>{child.icon}</div>
                      <span
                        className={cn('text-[15px] font-semibold whitespace-nowrap transition-all duration-300', {
                          'opacity-0 w-0': isCollapsed,
                          'opacity-100 w-auto': !isCollapsed,
                        })}
                      >
                        {child.title}
                      </span>
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
            <div
              className={cn('group flex items-center gap-2 pl-2 transition hover:text-white hover:border-l-[2px] hover:border-purple overflow-hidden', isActive ? 'text-white' : 'text-[#B0B0B0]')}
              data-active={isActive ? 'true' : undefined}
            >
              <div className='flex h-5 w-5 flex-shrink-0 items-center justify-center'>{el.icon}</div>
              <span
                className={cn('text-[15px] font-semibold whitespace-nowrap transition-all duration-300', {
                  'opacity-0 w-0': isCollapsed,
                  'opacity-100 w-auto': !isCollapsed,
                })}
              >
                {el.title}
              </span>
            </div>
          )}
        </NavLink>
      );
    }

    return (
      <div key={el.title} className={cn('px-3 py-[14px]', { 'ml-[5px]': isCollapsed })}>
        <div className='group flex items-center gap-2 pl-2 text-[#B0B0B0] hover:text-white hover:border-l-[2px] hover:border-purple overflow-hidden'>
          <div className='flex h-5 w-5 flex-shrink-0 items-center justify-center'>{el.icon}</div>
          <span
            className={cn('text-[15px] font-semibold whitespace-nowrap transition-all duration-300', {
              'opacity-0 w-0': isCollapsed,
              'opacity-100 w-auto': !isCollapsed,
            })}
          >
            {el.title}
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className='relative mt-8 ml-8 hidden lg:block'>
        <div
          className={cn(
            'bg-transparent relative h-fit rounded-[12px] p-[1px] w-fit',
            `bg-[linear-gradient(170.22deg,#523A83_0.01%,rgba(82,58,131,0)_8.28%),linear-gradient(350.89deg,#523A83_0%,rgba(82,58,131,0)_8.04%)]`
          )}
        >
          <div className={cn('flex h-[calc(100vh-96px)] flex-col py-4 transition-all duration-300 custom-bg-blur rounded-[12px]', isCollapsed ? 'w-[72px]' : 'w-[222px]')}>
            <div className='absolute right-[-12px] top-[14px]'>
              <button
                className='w-[26px] h-[26px] rounded-[12px] border border-[#181B22] custom-bg-blur hover:bg-[#1E1E1E] flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md z-20'
                onClick={() => setIsCollapsed(!isCollapsed)}
                aria-label='Toggle compact menu'
                aria-pressed={isCollapsed}
              >
                <DoubleArrow className={cn('h-4 w-4 transition-transform duration-300', isCollapsed ? '' : 'rotate-180')} />
              </button>
            </div>

            <div className={cn('flex-1 overflow-y-auto px-3 transition-all duration-300', { 'px-2': isCollapsed })}>
              <div className='flex flex-col gap-1 pb-4'>
                {navElements.slice(0, 1).map((el) => renderElement(el))}
                <div
                  className={cn('my-[14px] bg-[linear-gradient(90deg,rgba(82,58,131,0)_0%,#523A83_50%,rgba(82,58,131,0)_100%)] mx-auto h-[2px] transition-all duration-300', {
                    'w-[190px]': !isCollapsed,
                    'w-[40px]': isCollapsed,
                  })}
                />
                {navElements.slice(1).map((el) => renderElement(el))}
              </div>
            </div>

            <div className={cn('sticky bottom-4 mt-auto space-y-3 px-3 pb-2 pt-4 transition-all duration-300', { 'px-2': isCollapsed })}>
              {/* Tweet button - opens CreateTweetDialog from GitHub */}
              <button
                type='button'
                onClick={() => setIsTweetDialogOpen(true)}
                className={cn(
                  'group relative flex items-center justify-center overflow-hidden rounded-full p-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A06AFF]/60 focus-visible:ring-offset-0',
                  isCollapsed ? 'h-12 w-12' : 'h-12 w-full'
                )}
                title="Open simple Tweet dialog"
              >
                <span
                  className='pointer-events-none absolute inset-0 animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,#A06AFF,rgba(160,106,255,0)_60%,rgba(160,106,255,0))] opacity-70'
                  style={{ mask: "radial-gradient(closest-side, transparent calc(100% - 2px), black calc(100% - 0.5px))", WebkitMask: "radial-gradient(closest-side, transparent calc(100% - 2px), black calc(100% - 0.5px))" }}
                />
                <span className='pointer-events-none absolute inset-[2px] rounded-full bg-[rgba(12,16,20,0.9)] transition group-hover:bg-[rgba(12,16,20,0.75)]' />
                <span className={cn('relative flex items-center gap-3 text-sm font-semibold text-white', isCollapsed ? 'justify-center' : 'px-4 justify-center')}>
                  <span className='flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-[#A06AFF] to-[#482090] text-white shadow-[0_12px_30px_-18px_rgba(160,106,255,0.9)]'>
                    <QuillPen className='h-4 w-4' />
                  </span>
                  {!isCollapsed && <span>Tweet</span>}
                </span>
              </button>

              {/* Advanced Post button - opens CreatePostModal (old composer) */}
              <button
                type='button'
                onClick={() => setIsPostComposerOpen(true)}
                className={cn(
                  'group relative flex items-center justify-center overflow-hidden rounded-full p-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9BF0]/60 focus-visible:ring-offset-0',
                  isCollapsed ? 'h-12 w-12' : 'h-12 w-full'
                )}
                title="Open advanced Post composer"
              >
                <span
                  className='pointer-events-none absolute inset-0 animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,#1D9BF0,rgba(29,155,240,0)_60%,rgba(29,155,240,0))] opacity-70'
                  style={{ mask: "radial-gradient(closest-side, transparent calc(100% - 2px), black calc(100% - 0.5px))", WebkitMask: "radial-gradient(closest-side, transparent calc(100% - 2px), black calc(100% - 0.5px))" }}
                />
                <span className='pointer-events-none absolute inset-[2px] rounded-full bg-[rgba(12,16,20,0.9)] transition group-hover:bg-[rgba(12,16,20,0.75)]' />
                <span className={cn('relative flex items-center gap-3 text-sm font-semibold text-white', isCollapsed ? 'justify-center' : 'px-4 justify-center')}>
                  <span className='flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-[#1D9BF0] to-[#0E4E78] text-white shadow-[0_12px_30px_-18px_rgba(29,155,240,0.9)]'>
                    <QuillPen className='h-4 w-4' />
                  </span>
                  {!isCollapsed && <span>Новый пост</span>}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <CreatePostModal isOpen={isPostComposerOpen} onClose={() => setIsPostComposerOpen(false)} />
      <CreateTweetDialog
        isOpen={isTweetDialogOpen}
        onClose={() => setIsTweetDialogOpen(false)}
        userAvatar="https://i.pravatar.cc/120?img=12"
        userName="Current User"
      />
    </>
  );
};

export default NewNavBar;
