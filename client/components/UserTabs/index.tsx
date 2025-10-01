import { FC, useState } from 'react';

interface Props {
  isOwn?: boolean;
}

const UserTabs: FC<Props> = ({ isOwn = true }) => {
  const [activeTab, setActiveTab] = useState('posts');
  const tabs = ['Posts', 'Media', 'Likes'];

  return (
    <div className="container-card">
      <div className="flex border-b border-onyxGrey">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`flex-1 px-4 py-3 text-sm font-medium transition ${
              activeTab === tab.toLowerCase()
                ? 'border-b-2 border-primary text-white'
                : 'text-webGray hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg bg-moonlessNight p-4">
              <p className="text-white">Post content {i}</p>
              <p className="mt-2 text-sm text-webGray">2 hours ago</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserTabs;
