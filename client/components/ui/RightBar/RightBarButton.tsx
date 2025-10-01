import { FC, Dispatch, SetStateAction } from 'react';

interface Props {
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
}

const QRIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="qr-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A06AFF" />
        <stop offset="100%" stopColor="#6AA5FF" />
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="7" height="7" rx="1" stroke="url(#qr-gradient)" strokeWidth="2" fill="none" />
    <rect x="14" y="3" width="7" height="7" rx="1" stroke="url(#qr-gradient)" strokeWidth="2" fill="none" />
    <rect x="3" y="14" width="7" height="7" rx="1" stroke="url(#qr-gradient)" strokeWidth="2" fill="none" />
    <rect x="14" y="14" width="7" height="7" rx="1" stroke="url(#qr-gradient)" strokeWidth="2" fill="none" />
  </svg>
);

const CrossIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6l12 12" stroke="#A06AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RightBarButton: FC<Props> = ({ isCollapsed, setIsCollapsed }) => {
  const toggleOpen = () => setIsCollapsed((prev) => !prev);

  return (
    <button
      onClick={toggleOpen}
      className='cursor-pointer w-fit p-2 hover:bg-[#181B20] rounded-lg transition-colors'
      aria-label={isCollapsed ? 'Close right menu' : 'Open right menu'}
      aria-pressed={isCollapsed}
    >
      {isCollapsed ? <CrossIcon /> : <QRIcon />}
    </button>
  );
};

export default RightBarButton;
