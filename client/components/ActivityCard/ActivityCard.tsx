import { FC } from 'react';

const ActivityCard: FC = () => {
  return (
    <div className="container-card p-6">
      <h3 className="text-lg font-semibold text-white">Activity</h3>
      <div className="mt-4 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg bg-moonlessNight p-3">
            <div className="h-10 w-10 rounded-full bg-primary/20"></div>
            <div className="flex-1">
              <p className="text-sm text-white">Activity item {i}</p>
              <p className="text-xs text-webGray">2 hours ago</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityCard;
