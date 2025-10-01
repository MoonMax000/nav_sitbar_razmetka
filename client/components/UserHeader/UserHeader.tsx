import { FC } from 'react';
import { cn } from '@/lib/utils';
import { LayoutVariant } from '../ui/AppBackground/AppBackground';

interface Props {
  isOwn?: boolean;
  className?: string;
  variant?: LayoutVariant;
}

const UserHeader: FC<Props> = ({ isOwn = true, className, variant = 'primal' }) => {
  return (
    <div className={cn('container-card p-6', className)}>
      <div className="flex items-start gap-6">
        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-indigo shadow-avatar-shadow"></div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">User Profile</h1>
          <p className="mt-1 text-webGray">@username</p>
          <div className="mt-4 flex gap-4">
            <div>
              <div className="text-sm text-webGray">Followers</div>
              <div className="text-lg font-semibold text-white">1,234</div>
            </div>
            <div>
              <div className="text-sm text-webGray">Following</div>
              <div className="text-lg font-semibold text-white">567</div>
            </div>
          </div>
        </div>
        {isOwn && (
          <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default UserHeader;
