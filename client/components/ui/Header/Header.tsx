import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Header: FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#181B22] bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-white font-bold">
            T
          </div>
          <span className="text-lg font-semibold text-white">TTT</span>
        </Link>
        <div className="flex items-center gap-4">
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">
            Profile
          </button>
        </div>
      </div>
    </header>
  );
};
