import { FC, useState } from 'react';
import { cn } from '@/lib/utils';

type StreamingTab = 'profile' | 'streams' | 'donations' | 'notifications' | 'subscriptions';

const streamingTabs = [
  {
    id: 'profile' as StreamingTab,
    label: 'Profile',
    icon: (
      <svg width="20" height="20" viewBox="0 0 21 20" fill="none">
        <path d="M5.98131 12.9014C4.80234 13.6034 1.71114 15.0369 3.59389 16.8306C4.51359 17.7068 5.53791 18.3334 6.82573 18.3334H14.1743C15.4621 18.3334 16.4864 17.7068 17.4061 16.8306C19.2888 15.0369 16.1977 13.6034 15.0187 12.9014C12.254 11.2552 8.74599 11.2552 5.98131 12.9014Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.25 5.41675C14.25 7.48781 12.5711 9.16675 10.5 9.16675C8.42893 9.16675 6.75 7.48781 6.75 5.41675C6.75 3.34568 8.42893 1.66675 10.5 1.66675C12.5711 1.66675 14.25 3.34568 14.25 5.41675Z" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: 'streams' as StreamingTab,
    label: 'Streams',
    icon: (
      <svg width="20" height="20" viewBox="0 0 21 20" fill="none">
        <path d="M2.16797 9.16659C2.16797 6.41673 2.16797 5.04179 3.02224 4.18753C3.87651 3.33325 5.25144 3.33325 8.0013 3.33325H8.83464C11.5845 3.33325 12.9594 3.33325 13.8137 4.18753C14.668 5.04179 14.668 6.41673 14.668 9.16659V10.8333C14.668 13.5831 14.668 14.958 13.8137 15.8123C12.9594 16.6666 11.5845 16.6666 8.83464 16.6666H8.0013C5.25144 16.6666 3.87651 16.6666 3.02224 15.8123C2.16797 14.958 2.16797 13.5831 2.16797 10.8333V9.16659Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14.668 7.42163L14.7729 7.33505C16.5361 5.88028 17.4176 5.15288 18.1261 5.5041C18.8346 5.85532 18.8346 7.01971 18.8346 9.3485V10.6517C18.8346 12.9805 18.8346 14.1448 18.1261 14.4961C17.4176 14.8473 16.5361 14.1199 14.7729 12.6651L14.668 12.5785" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10.082 9.16675C10.7724 9.16675 11.332 8.6071 11.332 7.91675C11.332 7.22639 10.7724 6.66675 10.082 6.66675C9.39168 6.66675 8.83203 7.22639 8.83203 7.91675C8.83203 8.6071 9.39168 9.16675 10.082 9.16675Z" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: 'donations' as StreamingTab,
    label: 'Donations',
    icon: (
      <svg width="20" height="20" viewBox="0 0 21 20" fill="none">
        <path d="M3.83203 9.16675V12.5001C3.83203 15.2499 3.83203 16.6248 4.68631 17.4792C5.54057 18.3334 6.91551 18.3334 9.66536 18.3334H11.332C14.0819 18.3334 15.4568 18.3334 16.3111 17.4792C17.1654 16.6248 17.1654 15.2499 17.1654 12.5001V9.16675" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 7.49992C3 6.87684 3 6.5653 3.16747 6.33325C3.27717 6.18124 3.43497 6.05499 3.625 5.96723C3.91507 5.83325 4.30448 5.83325 5.08333 5.83325H15.9167C16.6955 5.83325 17.0849 5.83325 17.375 5.96723C17.565 6.05499 17.7228 6.18124 17.8325 6.33325C18 6.5653 18 6.87684 18 7.49992C18 8.12299 18 8.4345 17.8325 8.66658C17.7228 8.81858 17.565 8.94484 17.375 9.03259C17.0849 9.16659 16.6955 9.16659 15.9167 9.16659H5.08333C4.30448 9.16659 3.91507 9.16659 3.625 9.03259C3.43497 8.94484 3.27717 8.81858 3.16747 8.66658C3 8.4345 3 8.12299 3 7.49992Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M5.5 3.15484C5.5 2.33299 6.16624 1.66675 6.98809 1.66675H7.28572C9.06092 1.66675 10.5 3.10583 10.5 4.88103V5.83341H8.17857C6.69923 5.83341 5.5 4.63417 5.5 3.15484Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M15.5 3.15484C15.5 2.33299 14.8338 1.66675 14.0119 1.66675H13.7142C11.9391 1.66675 10.5 3.10583 10.5 4.88103V5.83341H12.8214C14.3007 5.83341 15.5 4.63417 15.5 3.15484Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M10.5 9.16675V18.3334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'notifications' as StreamingTab,
    label: 'Notifications',
    icon: (
      <svg width="20" height="20" viewBox="0 0 21 20" fill="none">
        <path d="M2.60697 12.3081C2.42976 13.4697 3.22203 14.2761 4.19207 14.6779C7.91104 16.2186 13.0864 16.2186 16.8053 14.6779C17.7754 14.2761 18.5676 13.4697 18.3904 12.3081C18.2815 11.5942 17.743 10.9997 17.344 10.4192C16.8214 9.6495 16.7695 8.80992 16.7694 7.91675C16.7694 4.46496 13.9619 1.66675 10.4987 1.66675C7.03547 1.66675 4.22797 4.46496 4.22797 7.91675C4.22789 8.80992 4.17597 9.6495 3.65337 10.4192C3.2544 10.9997 2.71587 11.5942 2.60697 12.3081Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.16797 15.8333C7.55004 17.2709 8.89755 18.3333 10.5013 18.3333C12.1051 18.3333 13.4526 17.2709 13.8346 15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'subscriptions' as StreamingTab,
    label: 'Subscriptions',
    icon: (
      <svg width="20" height="20" viewBox="0 0 21 20" fill="none">
        <path d="M13.4154 9.16667C13.4154 7.55583 12.1095 6.25 10.4987 6.25C8.88786 6.25 7.58203 7.55583 7.58203 9.16667C7.58203 10.7775 8.88786 12.0833 10.4987 12.0833C12.1095 12.0833 13.4154 10.7775 13.4154 9.16667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13.4022 9.45825C13.6705 9.53958 13.9551 9.58333 14.2499 9.58333C15.8607 9.58333 17.1666 8.2775 17.1666 6.66667C17.1666 5.05583 15.8607 3.75 14.2499 3.75C12.7375 3.75 11.4939 4.90117 11.3477 6.37511" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.65095 6.37511C9.5047 4.90117 8.26113 3.75 6.7487 3.75C5.13786 3.75 3.83203 5.05583 3.83203 6.66667C3.83203 8.2775 5.13786 9.58333 6.7487 9.58333C7.04354 9.58333 7.32816 9.53958 7.59642 9.45825" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.8333 13.7499C18.8333 11.4488 16.7813 9.58325 14.25 9.58325" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.0846 16.2499C15.0846 13.9488 13.0326 12.0833 10.5013 12.0833C7.96999 12.0833 5.91797 13.9488 5.91797 16.2499" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.7513 9.58325C4.21999 9.58325 2.16797 11.4488 2.16797 13.7499" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const donationsData = [
  {
    id: 1,
    userName: 'Maxim Class',
    userAvatar: 'https://api.builder.io/api/v1/image/assets/TEMP/andrew-milko-LspK43UdFo4-unsplash',
    date: '06.06.25',
    amount: '$1,200.00',
    status: 'Completed',
  },
  {
    id: 2,
    userName: 'Maxim Class',
    userAvatar: 'https://api.builder.io/api/v1/image/assets/TEMP/andrew-milko-LspK43UdFo4-unsplash',
    date: '05.06.25',
    amount: '$1,200.00',
    status: 'Completed',
  },
  {
    id: 3,
    userName: 'Maxim Class',
    userAvatar: 'https://api.builder.io/api/v1/image/assets/TEMP/andrew-milko-LspK43UdFo4-unsplash',
    date: '04.06.25',
    amount: '$1,200.00',
    status: 'Completed',
  },
  {
    id: 4,
    userName: 'Maxim Class',
    userAvatar: 'https://api.builder.io/api/v1/image/assets/TEMP/andrew-milko-LspK43UdFo4-unsplash',
    date: '03.06.25',
    amount: '$1,200.00',
    status: 'Completed',
  },
  {
    id: 5,
    userName: 'Maxim Class',
    userAvatar: 'https://api.builder.io/api/v1/image/assets/TEMP/andrew-milko-LspK43UdFo4-unsplash',
    date: '02.06.25',
    amount: '$1,200.00',
    status: 'Completed',
  },
  {
    id: 6,
    userName: 'Maxim Class',
    userAvatar: 'https://api.builder.io/api/v1/image/assets/TEMP/andrew-milko-LspK43UdFo4-unsplash',
    date: '01.06.25',
    amount: '$1,200.00',
    status: 'Completed',
  },
  {
    id: 7,
    userName: 'Maxim Class',
    userAvatar: 'https://api.builder.io/api/v1/image/assets/TEMP/andrew-milko-LspK43UdFo4-unsplash',
    date: '31.05.25',
    amount: '$1,200.00',
    status: 'Completed',
  },
  {
    id: 8,
    userName: 'Maxim Class',
    userAvatar: 'https://api.builder.io/api/v1/image/assets/TEMP/andrew-milko-LspK43UdFo4-unsplash',
    date: '30.05.25',
    amount: '$1,200.00',
    status: 'Completed',
  },
  {
    id: 9,
    userName: 'Maxim Class',
    userAvatar: 'https://api.builder.io/api/v1/image/assets/TEMP/andrew-milko-LspK43UdFo4-unsplash',
    date: '29.05.25',
    amount: '$1,200.00',
    status: 'Completed',
  },
  {
    id: 10,
    userName: 'Maxim Class',
    userAvatar: 'https://api.builder.io/api/v1/image/assets/TEMP/andrew-milko-LspK43UdFo4-unsplash',
    date: '28.05.25',
    amount: '$1,200.00',
    status: 'Completed',
  },
];

const streamsData = [
  {
    id: 1,
    thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/d72b093da332f125a28778d14b07c600636c17c4?width=720',
    duration: '2:01:02',
    views: '17K views',
    timeAgo: '15 minutes ago',
    title: 'Bitcoin & Ethereum Market Analysis',
    recorded: true,
    startedAt: '12:00 25.10.25',
    endedAt: '14:01 25.10.25',
    category: 'News&Reports',
  },
  {
    id: 2,
    thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/7523dc968a9f3dbb73f84f00ce4f281649b34a67?width=720',
    duration: '4:23:45',
    views: '88K views',
    timeAgo: '1 Week ago',
    title: 'Bitcoin & Ethereum Market Analysis',
    recorded: true,
    startedAt: '16:00 17.10.25',
    endedAt: '20:23 17.10.25',
    category: 'Technical Analysis',
  },
  {
    id: 3,
    thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/d72b093da332f125a28778d14b07c600636c17c4?width=720',
    duration: '2:01:02',
    views: '17K views',
    timeAgo: '15 minutes ago',
    title: 'Bitcoin & Ethereum Market Analysis',
    recorded: true,
    startedAt: '12:00 25.10.25',
    endedAt: '14:01 25.10.25',
    category: 'News&Reports',
  },
  {
    id: 4,
    thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/7523dc968a9f3dbb73f84f00ce4f281649b34a67?width=720',
    duration: '4:23:45',
    views: '88K views',
    timeAgo: '1 Week ago',
    title: 'Bitcoin & Ethereum Market Analysis',
    recorded: true,
    startedAt: '16:00 17.10.25',
    endedAt: '20:23 17.10.25',
    category: 'Technical Analysis',
  },
  {
    id: 5,
    thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/d72b093da332f125a28778d14b07c600636c17c4?width=720',
    duration: '2:01:02',
    views: '17K views',
    timeAgo: '15 minutes ago',
    title: 'Bitcoin & Ethereum Market Analysis',
    recorded: true,
    startedAt: '12:00 25.10.25',
    endedAt: '14:01 25.10.25',
    category: 'News&Reports',
  },
  {
    id: 6,
    thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/7523dc968a9f3dbb73f84f00ce4f281649b34a67?width=720',
    duration: '4:23:45',
    views: '88K views',
    timeAgo: '1 Week ago',
    title: 'Bitcoin & Ethereum Market Analysis',
    recorded: true,
    startedAt: '16:00 17.10.25',
    endedAt: '20:23 17.10.25',
    category: 'Technical Analysis',
  },
  {
    id: 7,
    thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/d72b093da332f125a28778d14b07c600636c17c4?width=720',
    duration: '2:01:02',
    views: '17K views',
    timeAgo: '15 minutes ago',
    title: 'Bitcoin & Ethereum Market Analysis',
    recorded: true,
    startedAt: '12:00 25.10.25',
    endedAt: '14:01 25.10.25',
    category: 'News&Reports',
  },
  {
    id: 8,
    thumbnail: 'https://api.builder.io/api/v1/image/assets/TEMP/7523dc968a9f3dbb73f84f00ce4f281649b34a67?width=720',
    duration: '4:23:45',
    views: '88K views',
    timeAgo: '1 Week ago',
    title: 'Bitcoin & Ethereum Market Analysis',
    recorded: true,
    startedAt: '16:00 17.10.25',
    endedAt: '20:23 17.10.25',
    category: 'Technical Analysis',
  },
];

const LiveStreamingSettings: FC = () => {
  const [activeTab, setActiveTab] = useState<StreamingTab>('profile');
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationSettings, setNotificationSettings] = useState({
    streamGoingLive: true,
    replayOfPastStreams: true,
    mentionsInChat: true,
    newFollower: true,
    recommendedStreams: true,
    subscriptions: true,
  });

  const toggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Profile Settings Card */}
      <div className="flex flex-col gap-6 p-4 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px]">
        <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
        <p className="text-sm text-webGray">Configure your streaming profile settings here.</p>
      </div>

      {/* Tabs */}
      <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1 rounded-[36px] border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px]">
        {streamingTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-3 md:px-4 py-2.5 md:py-3 rounded-[32px] text-xs md:text-[15px] font-bold transition-all whitespace-nowrap',
              activeTab === tab.id
                ? 'bg-gradient-to-r from-primary to-[#482090] text-white backdrop-blur-[58.33px]'
                : 'border border-[#181B22] bg-[rgba(12,16,20,0.5)] text-webGray hover:text-white backdrop-blur-[58.33px]'
            )}
          >
            <span className={activeTab === tab.id ? 'text-white' : 'text-webGray'}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'profile' && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px]">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg sm:text-2xl font-bold text-white">Streamer's Permission</h3>
              <p className="text-sm sm:text-[15px] font-normal text-webGray">You haven't submitted a permission request yet.</p>
            </div>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 h-[46px] px-4 rounded-lg bg-gradient-to-r from-primary to-[#482090] backdrop-blur-[50px] text-white text-[15px] font-bold hover:opacity-90 transition-opacity">
              Submit Request
            </button>
          </div>
        )}

        {activeTab === 'streams' && (
          <div className="flex flex-col gap-6 p-4 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px]">
            <div className="flex items-baseline justify-between pb-2">
              <h2 className="text-2xl font-bold text-white">My Streams</h2>
            </div>

            {/* Streams List */}
            <div className="flex flex-col gap-4">
              {streamsData.map((stream) => (
                <div key={stream.id} className="flex flex-col lg:flex-row gap-4 pt-4 border-t border-[#181B22]">
                  {/* Thumbnail with badges */}
                  <div className="relative w-full lg:w-[360px] h-[202px] flex-shrink-0">
                    <img
                      src={stream.thumbnail}
                      alt={stream.title}
                      className="w-full h-full rounded-sm object-cover"
                    />
                    {/* Views badge */}
                    <div className="absolute left-3 bottom-3 flex items-center gap-2 px-2 py-1 rounded bg-[rgba(12,16,20,0.64)] border border-[#181B22] backdrop-blur-[50px]">
                      <span className="text-xs font-bold uppercase text-white">{stream.views}</span>
                    </div>
                    {/* Time ago badge */}
                    <div className="absolute right-3 bottom-3 flex items-center gap-2 px-2 py-1 rounded bg-[rgba(12,16,20,0.64)] border border-[#181B22] backdrop-blur-[50px]">
                      <span className="text-xs font-bold uppercase text-white">{stream.timeAgo}</span>
                    </div>
                    {/* Duration badge */}
                    <div className="absolute left-3 top-3 flex items-center gap-2 px-2 py-1 rounded bg-[rgba(12,16,20,0.64)] border border-[#181B22] backdrop-blur-[50px]">
                      <span className="text-xs font-bold uppercase text-white">{stream.duration}</span>
                    </div>
                  </div>

                  {/* Stream Details */}
                  <div className="flex flex-col gap-4 flex-1">
                    <h3 className="text-lg sm:text-[19px] font-bold text-white">{stream.title}</h3>

                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-bold text-webGray">Record:</span>
                      <div className="flex items-center px-1 py-0.5 rounded bg-[#1C3430]">
                        <span className="text-xs font-bold text-green">Yes</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-bold text-webGray">Started:</span>
                      <span className="text-[15px] font-bold text-white">{stream.startedAt}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-bold text-webGray">Ended:</span>
                      <span className="text-[15px] font-bold text-white">{stream.endedAt}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-bold text-webGray">Category:</span>
                      <span className="text-[15px] font-bold text-white">{stream.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-1 mt-4">
              {/* First */}
              <button className="flex items-center justify-center w-11 h-11 rounded-lg border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px] hover:bg-[rgba(12,16,20,0.7)] transition-all">
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <path d="M15.157 15L16.332 13.825L12.5154 10L16.332 6.175L15.157 5L10.157 10L15.157 15Z" fill="#B0B0B0"/>
                  <path d="M9.66484 15L10.8398 13.825L7.02318 10L10.8398 6.175L9.66484 5L4.66484 10L9.66484 15Z" fill="#B0B0B0"/>
                </svg>
              </button>

              {/* Prev */}
              <button className="flex items-center justify-center w-11 h-11 rounded-lg border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px] hover:bg-[rgba(12,16,20,0.7)] transition-all">
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <path d="M13.075 15L14.25 13.825L10.4333 10L14.25 6.175L13.075 5L8.075 10L13.075 15Z" fill="#B0B0B0"/>
                </svg>
              </button>

              {/* Page Numbers */}
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    'flex items-center justify-center w-11 h-11 rounded text-[15px] font-bold transition-all',
                    currentPage === page
                      ? 'bg-gradient-to-r from-primary to-[#482090] text-white'
                      : 'border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px] text-webGray hover:text-white'
                  )}
                >
                  {page}
                </button>
              ))}

              {/* Next */}
              <button className="flex items-center justify-center w-11 h-11 rounded-lg border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px] hover:bg-[rgba(12,16,20,0.7)] transition-all">
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <path d="M9.175 5L8 6.175L11.8167 10L8 13.825L9.175 15L14.175 10L9.175 5Z" fill="#B0B0B0"/>
                </svg>
              </button>

              {/* Last */}
              <button className="flex items-center justify-center w-11 h-11 rounded-lg border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px] hover:bg-[rgba(12,16,20,0.7)] transition-all">
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <path d="M5.84297 5L4.66797 6.175L8.48464 10L4.66797 13.825L5.84297 15L10.843 10L5.84297 5Z" fill="#B0B0B0"/>
                  <path d="M11.3352 5L10.1602 6.175L13.9768 10L10.1602 13.825L11.3352 15L16.3352 10L11.3352 5Z" fill="#B0B0B0"/>
                </svg>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'donations' && (
          <div className="flex flex-col gap-6 p-4 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px]">
            {/* Header */}
            <div className="flex items-baseline justify-between pb-2">
              <h2 className="flex-1 text-2xl font-bold text-white">My Donations</h2>
              <a href="#" className="text-[15px] font-bold text-primary underline hover:no-underline">
                View All
              </a>
            </div>

            {/* Table Headers - Hidden on mobile */}
            <div className="hidden sm:flex items-center justify-between">
              <div className="flex items-start w-[196px]">
                <span className="text-xs font-bold uppercase text-webGray">User</span>
              </div>
              <div className="flex items-center w-[196px]">
                <span className="text-xs font-bold uppercase text-webGray">Date</span>
              </div>
              <div className="flex items-center w-[196px]">
                <span className="text-xs font-bold uppercase text-webGray">Amount</span>
              </div>
              <div className="flex items-center justify-end w-20">
                <span className="text-xs font-bold uppercase text-webGray">Status</span>
              </div>
            </div>

            {/* Donations List */}
            <div className="flex flex-col">
              {donationsData.map((donation) => (
                <div
                  key={donation.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 pt-4 border-t border-[#181B22]"
                >
                  {/* User */}
                  <div className="flex items-center gap-2 w-full sm:w-[196px]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-[#482090] flex-shrink-0" />
                    <span className="text-[15px] font-bold text-white">{donation.userName}</span>
                  </div>

                  {/* Date - with label on mobile */}
                  <div className="flex items-center gap-2 w-full sm:w-[196px]">
                    <span className="text-xs font-bold uppercase text-webGray sm:hidden">Date:</span>
                    <span className="text-[15px] font-normal text-white">{donation.date}</span>
                  </div>

                  {/* Amount - with label on mobile */}
                  <div className="flex items-center gap-2 w-full sm:w-[196px]">
                    <span className="text-xs font-bold uppercase text-webGray sm:hidden">Amount:</span>
                    <span className="text-[15px] font-bold text-white">{donation.amount}</span>
                  </div>

                  {/* Status - with label on mobile */}
                  <div className="flex items-center gap-2 w-full sm:w-20 sm:justify-end">
                    <span className="text-xs font-bold uppercase text-webGray sm:hidden">Status:</span>
                    <div className="flex items-center px-1 py-0.5 rounded bg-[#1C3430]">
                      <span className="text-xs font-bold text-green">{donation.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-1 mt-4">
              {/* First */}
              <button className="flex items-center justify-center w-11 h-11 rounded-lg border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px] hover:bg-[rgba(12,16,20,0.7)] transition-all">
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <path d="M15.157 15L16.332 13.825L12.5154 10L16.332 6.175L15.157 5L10.157 10L15.157 15Z" fill="#B0B0B0"/>
                  <path d="M9.66484 15L10.8398 13.825L7.02318 10L10.8398 6.175L9.66484 5L4.66484 10L9.66484 15Z" fill="#B0B0B0"/>
                </svg>
              </button>

              {/* Prev */}
              <button className="flex items-center justify-center w-11 h-11 rounded-lg border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px] hover:bg-[rgba(12,16,20,0.7)] transition-all">
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <path d="M13.075 15L14.25 13.825L10.4333 10L14.25 6.175L13.075 5L8.075 10L13.075 15Z" fill="#B0B0B0"/>
                </svg>
              </button>

              {/* Page Numbers */}
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    'flex items-center justify-center w-11 h-11 rounded text-[15px] font-bold transition-all',
                    currentPage === page
                      ? 'bg-gradient-to-r from-primary to-[#482090] text-white'
                      : 'border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px] text-webGray hover:text-white'
                  )}
                >
                  {page}
                </button>
              ))}

              {/* Next */}
              <button className="flex items-center justify-center w-11 h-11 rounded-lg border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px] hover:bg-[rgba(12,16,20,0.7)] transition-all">
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <path d="M9.175 5L8 6.175L11.8167 10L8 13.825L9.175 15L14.175 10L9.175 5Z" fill="#B0B0B0"/>
                </svg>
              </button>

              {/* Last */}
              <button className="flex items-center justify-center w-11 h-11 rounded-lg border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px] hover:bg-[rgba(12,16,20,0.7)] transition-all">
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <path d="M5.84297 5L4.66797 6.175L8.48464 10L4.66797 13.825L5.84297 15L10.843 10L5.84297 5Z" fill="#B0B0B0"/>
                  <path d="M11.3352 5L10.1602 6.175L13.9768 10L10.1602 13.825L11.3352 15L16.3352 10L11.3352 5Z" fill="#B0B0B0"/>
                </svg>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="flex flex-col gap-6 p-4 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px]">
            <h2 className="text-2xl font-bold text-white">Notifications</h2>
            <p className="text-sm text-webGray">Configure your streaming notification preferences.</p>
          </div>
        )}

        {activeTab === 'subscriptions' && (
          <div className="flex flex-col gap-6 p-4 rounded-3xl border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px]">
            <h2 className="text-2xl font-bold text-white">Subscriptions</h2>
            <p className="text-sm text-webGray">Manage your streaming subscriptions and subscribers.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveStreamingSettings;
