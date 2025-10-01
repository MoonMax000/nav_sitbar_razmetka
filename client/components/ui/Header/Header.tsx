import { FC, Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import RightBarButton from '../RightBar/RightBarButton';

interface HeaderProps {
  rightMenuOpen?: boolean;
  setRightMenuOpen?: Dispatch<SetStateAction<boolean>>;
}

export const Header: FC<HeaderProps> = ({ rightMenuOpen = false, setRightMenuOpen }) => {
  return (
    <header className='pb-1 pt-3 w-full pl-[30px] pr-[24px] flex justify-between bg-background items-center gap-2 mb-6'>
      {/* Brand */}
      <div className='min-w-[230px]'>
        <Link to='/' className='flex gap-[10px] items-center'>
          <div className='w-[35px] h-[40px] rounded-[6px] bg-primary flex items-center justify-center font-extrabold text-white'>T</div>
          <span className='text-2xl font-bold text-white'>Tyrian Trade</span>
        </Link>
      </div>

      {/* Center: Search + Assistant (desktop) */}
      <div className='hidden md:flex items-center gap-4 w-full max-w-[800px]'>
        <div className='relative w-full max-w-[540px]'>
          <input
            className='h-11 w-full rounded-[12px] border border-[#181B22] bg-[#0C101480] px-4 text-white placeholder:text-webGray outline-none'
            placeholder='Search'
          />
        </div>
        <a
          href={'https://aihelp.tyriantrade.com/'}
          target='_blank'
          rel='noreferrer'
          className='flex gap-[6px] items-center'
          aria-label='Open AI Assistant'
        >
          <div className='p-[0.5px] rounded-[4px] bg-gradient-to-r from-[#A06AFF] via-[#A06AFF] to-transparent size-[32px] flex items-center justify-center'>
            <div className='p-[2px] bg-black rounded-[4px] size-[29px]'>
              <div className='size-[26px] rounded-[4px] bg-background p-[5px] text-white flex items-center justify-center'>
                AI
              </div>
            </div>
          </div>
          <span className='font-medium text-[15px] text-white'>Assistant</span>
        </a>
      </div>

      {/* Right actions */}
      <div className='flex items-center justify-end max-w-[350px] gap-4'>
        <Link to='/profile' aria-label='Profile' className='size-10 rounded-full bg-moonlessNight' />
      </div>
    </header>
  );
};
