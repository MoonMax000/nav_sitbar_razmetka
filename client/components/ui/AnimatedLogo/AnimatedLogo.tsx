import { FC } from 'react';
import { Link } from 'react-router-dom';

export const AnimatedLogo: FC = () => {
  return (
    <Link to='/' className='flex gap-[10px] items-center group'>
      <div className='relative w-[35px] h-[40px] rounded-[6px] overflow-hidden'>
        {/* Animated gradient background */}
        <div className='absolute inset-0 bg-gradient-to-br from-primary via-[#6AA5FF] to-[#482090] animate-gradient-xy' />

        {/* Moving shine sweep */}
        <div className='absolute inset-y-0 -left-1 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine' />

        {/* Pulsing glow effect */}
        <div className='absolute inset-0 bg-gradient-to-br from-primary/40 to-transparent animate-pulse' />

        {/* Logo letter */}
        <div className='relative w-full h-full flex items-center justify-center'>
          <span className='text-white font-extrabold text-xl z-10 group-hover:scale-110 transition-transform duration-300'>
            T
          </span>
        </div>

        {/* Animated border */}
        <div className='absolute inset-0 border-2 border-white/20 rounded-[6px] group-hover:border-white/40 transition-colors' />
      </div>

      <span className='text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300'>
        Tyrian Trade
      </span>
    </Link>
  );
};
