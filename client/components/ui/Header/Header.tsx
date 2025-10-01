import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Header: FC = () => {
  return (
    <header className='relative z-[1000] border-b-[2px] border-[#523A83] bg-[#0C101480] backdrop-blur-[100px]'>
      <div className='flex items-center w-full max-w-[1920px] justify-between mx-auto py-5 pl-[30px] pr-[30px] transition-all duration-300'>
        {/* Brand */}
        <div className='flex gap-[10px] min-w-[230px] items-center'>
          <Link to='/'>
            <div className='w-[35px] h-[40px] rounded-[6px] bg-primary flex items-center justify-center font-extrabold text-white'>T</div>
          </Link>
          <span className='text-[31px] font-bold text-white'>Tyrian Trade</span>
        </div>
        {/* Center actions (simplified) */}
        <div className='hidden md:flex gap-[10px] items-center'>
          <div className='hidden md:block'>
            <input
              className='h-11 w-[540px] rounded-[12px] border border-[#181B22] bg-[#0C101480] px-4 text-white placeholder:text-webGray outline-none'
              placeholder='Search'
            />
          </div>
          <div className='flex gap-[10px] min-w-[150px] items-center'>
            <button className='h-11 w-11 rounded-[12px] bg-primary text-white grid place-items-center'>
              AI
            </button>
            <span className='font-medium text-[15px] text-white'>AI Assistant</span>
          </div>
        </div>
        {/* Right actions */}
        <div className='flex items-center justify-end max-w-[350px] gap-4'>
          <Link to='/profile' aria-label='Profile' className='size-11 min-w-11 min-h-11 rounded-full bg-moonlessNight' />
        </div>
      </div>
    </header>
  );
};
