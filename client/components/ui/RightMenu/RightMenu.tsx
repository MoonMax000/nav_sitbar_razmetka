import { FC } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  isCollapsed: boolean;
}

const WidgetCard: FC<{ title: string; children?: React.ReactNode }> = ({ title, children }) => (
  <div className='container-card p-4 rounded-[16px]'>
    <h3 className='text-white font-semibold text-[15px] mb-3'>{title}</h3>
    {children || (
      <div className='text-webGray text-sm'>
        Widget content coming soon...
      </div>
    )}
  </div>
);

export const RightMenu: FC<Props> = ({ isCollapsed }) => {
  return (
    <section
      className={cn(
        'flex flex-col gap-6 min-h-full overflow-hidden transition-all duration-500 ease-in-out',
        {
          'h-0 w-0 p-0 opacity-0': !isCollapsed,
          'min-w-[312px] pr-6 opacity-100': isCollapsed,
        }
      )}
    >
      <WidgetCard title='Quick Search'>
        <input
          className='w-full h-9 rounded-lg border border-[#181B22] bg-[#0C101480] px-3 text-white text-sm placeholder:text-webGray outline-none'
          placeholder='Search markets...'
        />
      </WidgetCard>

      <WidgetCard title='Trading Psychology'>
        <div className='flex items-center justify-between'>
          <span className='text-webGray text-sm'>Fear & Greed Index</span>
          <span className='text-green text-lg font-bold'>72</span>
        </div>
        <div className='mt-2 h-2 bg-[#181B22] rounded-full overflow-hidden'>
          <div className='h-full bg-green w-[72%] transition-all' />
        </div>
      </WidgetCard>

      <WidgetCard title='Sector Movers'>
        <div className='flex flex-col gap-2'>
          {['Technology', 'Healthcare', 'Finance'].map((sector) => (
            <div key={sector} className='flex items-center justify-between text-sm'>
              <span className='text-white'>{sector}</span>
              <span className='text-green'>+2.4%</span>
            </div>
          ))}
        </div>
      </WidgetCard>

      <WidgetCard title='Portfolio' />
      <WidgetCard title='Watch List' />
      <WidgetCard title='Latest News' />
      <WidgetCard title='Calendar' />
    </section>
  );
};
