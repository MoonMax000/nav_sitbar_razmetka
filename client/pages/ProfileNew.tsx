import { FC, useState } from 'react';
import UserHeader from '@/components/UserHeader/UserHeader';
import { cn } from '@/lib/utils';

type Tab = 'dashboard' | 'profile' | 'marketplace' | 'streaming' | 'social' | 'portfolios';

const tabs = [
  {
    id: 'dashboard' as Tab,
    label: 'Dashboard',
    icon: (
      <svg width="20" height="20" viewBox="0 0 21 20" fill="none">
        <path d="M10.5 15V12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M2.45884 11.0116C2.16466 9.09716 2.01757 8.14002 2.37949 7.29148C2.74141 6.44293 3.54437 5.86235 5.1503 4.70121L6.35017 3.83366C8.34792 2.38922 9.34678 1.66699 10.4994 1.66699C11.6519 1.66699 12.6508 2.38922 14.6485 3.83366L15.8484 4.70121C17.4544 5.86235 18.2573 6.44293 18.6192 7.29148C18.9811 8.14002 18.834 9.09716 18.5399 11.0116L18.289 12.644C17.8719 15.3577 17.6634 16.7147 16.6902 17.5242C15.7169 18.3337 14.294 18.3337 11.4484 18.3337H9.55037C6.70463 18.3337 5.28177 18.3337 4.30852 17.5242C3.33526 16.7147 3.12674 15.3577 2.70971 12.644L2.45884 11.0116Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'profile' as Tab,
    label: 'Profile',
    icon: (
      <svg width="20" height="20" viewBox="0 0 21 20" fill="none">
        <path d="M5.98131 12.9017C4.80234 13.6037 1.71114 15.0371 3.59389 16.8308C4.51359 17.707 5.53791 18.3337 6.82573 18.3337H14.1743C15.4621 18.3337 16.4864 17.707 17.4061 16.8308C19.2888 15.0371 16.1977 13.6037 15.0187 12.9017C12.254 11.2554 8.74599 11.2554 5.98131 12.9017Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14.25 5.41699C14.25 7.48806 12.5711 9.16699 10.5 9.16699C8.42893 9.16699 6.75 7.48806 6.75 5.41699C6.75 3.34593 8.42893 1.66699 10.5 1.66699C12.5711 1.66699 14.25 3.34593 14.25 5.41699Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'marketplace' as Tab,
    label: 'Marketplace',
    icon: (
      <svg width="20" height="20" viewBox="0 0 21 20" fill="none">
        <path d="M3 9.15625V12.9108C3 15.2706 3 16.4506 3.73223 17.1837C4.46447 17.9168 5.64297 17.9168 8 17.9168H13C15.357 17.9168 16.5355 17.9168 17.2677 17.1837C18 16.4506 18 15.2706 18 12.9108V9.15625" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 14.1475C12.4299 14.6535 11.5223 14.9808 10.5 14.9808C9.47764 14.9808 8.57008 14.6535 8 14.1475" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M15.3305 2.08623L5.62567 2.11046C4.17719 2.03585 3.80581 3.1526 3.80581 3.69851C3.80581 4.18677 3.74294 4.89856 2.85518 6.23636C1.96742 7.57416 2.03413 7.97158 2.53474 8.8977C2.95021 9.66636 4.00699 9.96661 4.558 10.0171C6.30817 10.0569 7.15969 8.54353 7.15969 7.4798C8.0279 10.1525 10.4971 10.1525 11.5973 9.84686C12.6996 9.5407 13.6439 8.4447 13.8667 7.4798C13.9966 8.67895 14.391 9.37861 15.556 9.85945C16.7629 10.3574 17.8007 9.59628 18.3215 9.10828C18.8422 8.62036 19.1764 7.53712 18.2481 6.34653C17.608 5.52545 17.3411 4.75195 17.2535 3.95025C17.2027 3.48573 17.1581 2.98658 16.8318 2.66894C16.3548 2.20474 15.6705 2.06389 15.3305 2.08623Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'streaming' as Tab,
    label: 'Live Streaming',
    icon: (
      <svg width="20" height="20" viewBox="0 0 21 20" fill="none">
        <path d="M2.16602 9.16634C2.16602 6.41648 2.16602 5.04155 3.02029 4.18728C3.87456 3.33301 5.24949 3.33301 7.99935 3.33301H8.83268C11.5825 3.33301 12.9574 3.33301 13.8118 4.18728C14.666 5.04155 14.666 6.41648 14.666 9.16634V10.833C14.666 13.5828 14.666 14.9578 13.8118 15.8121C12.9574 16.6663 11.5825 16.6663 8.83268 16.6663H7.99935C5.24949 16.6663 3.87456 16.6663 3.02029 15.8121C2.16602 14.9578 2.16602 13.5828 2.16602 10.833V9.16634Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14.666 7.42187L14.7709 7.33529C16.5341 5.88052 17.4157 5.15313 18.1242 5.50434C18.8327 5.85556 18.8327 7.01995 18.8327 9.34874V10.6519C18.8327 12.9807 18.8327 14.1451 18.1242 14.4963C17.4157 14.8475 16.5341 14.1202 14.7709 12.6653L14.666 12.5787" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10.084 9.16699C10.7743 9.16699 11.334 8.60735 11.334 7.91699C11.334 7.22664 10.7743 6.66699 10.084 6.66699C9.39363 6.66699 8.83398 7.22664 8.83398 7.91699C8.83398 8.60735 9.39363 9.16699 10.084 9.16699Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'social' as Tab,
    label: 'Social Network',
    icon: (
      <svg width="20" height="20" viewBox="0 0 21 20" fill="none">
        <path d="M17.166 7.50033C16.5033 4.17912 13.4267 1.66699 9.7321 1.66699C5.55392 1.66699 2.16602 4.87967 2.16602 8.84199C2.16602 10.7458 2.94784 12.4757 4.22314 13.7593C4.50392 14.042 4.69139 14.4282 4.61573 14.8256C4.49087 15.4754 4.2079 16.0816 3.79356 16.5867C4.88371 16.7877 6.01724 16.6067 6.98936 16.0942C7.33301 15.9132 7.50482 15.8226 7.62607 15.8042C7.71095 15.7913 7.82151 15.8033 7.99935 15.8338" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.66602 13.5517C9.66602 15.9732 11.7183 17.9365 14.2493 17.9365C14.5469 17.9368 14.8437 17.9093 15.136 17.8545C15.3464 17.8149 15.4517 17.7952 15.5251 17.8064C15.5985 17.8176 15.7027 17.873 15.9108 17.9837C16.4997 18.2968 17.1863 18.4074 17.8468 18.2846C17.5958 17.9759 17.4243 17.6055 17.3487 17.2083C17.3028 16.9655 17.4164 16.7295 17.5865 16.5567C18.3591 15.7722 18.8327 14.7152 18.8327 13.5517C18.8327 11.1303 16.7803 9.16699 14.2493 9.16699C11.7183 9.16699 9.66602 11.1303 9.66602 13.5517Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'portfolios' as Tab,
    label: 'Portfolios',
    icon: (
      <svg width="20" height="20" viewBox="0 0 21 20" fill="none">
        <path d="M8.83398 11.1111C8.83398 10.8527 8.83398 10.7236 8.8624 10.6177C8.9394 10.3301 9.16407 10.1054 9.45165 10.0284C9.55757 10 9.68673 10 9.94507 10H11.0562C11.3146 10 11.4437 10 11.5497 10.0284C11.8372 10.1054 12.0619 10.3301 12.1389 10.6177C12.1673 10.7236 12.1673 10.8527 12.1673 11.1111V11.6667C12.1673 12.5872 11.4212 13.3333 10.5007 13.3333C9.58015 13.3333 8.83398 12.5872 8.83398 11.6667V11.1111Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12.084 11.2503H13.0695C14.1396 11.2503 14.6747 11.2503 15.1303 11.1538C16.449 10.8745 17.5248 10.0176 17.9956 8.87158C18.1582 8.47566 18.2246 7.99659 18.3573 7.03841C18.4071 6.6787 18.4321 6.49885 18.4081 6.35173C18.3383 5.92328 17.995 5.57231 17.5324 5.45669C17.3736 5.41699 17.1727 5.41699 16.771 5.41699H4.23033C3.82857 5.41699 3.62769 5.41699 3.46887 5.45669C3.00633 5.57231 2.66296 5.92328 2.59318 6.35173C2.56922 6.49885 2.59414 6.6787 2.64397 7.03841C2.77672 7.99659 2.84308 8.47566 3.00572 8.87158C3.47648 10.0176 4.5523 10.8745 5.87095 11.1538C6.32652 11.2503 6.86163 11.2503 7.93184 11.2503H8.91732" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3.41602 9.58301V11.2497C3.41602 14.3923 3.41602 15.9638 4.33809 16.94C5.26016 17.9163 6.74421 17.9163 9.71235 17.9163H11.2863C14.2545 17.9163 15.7385 17.9163 16.6606 16.94C17.5827 15.9638 17.5827 14.3923 17.5827 11.2497V9.58301" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.4173 5.41634L13.3529 5.122C13.0321 3.65528 12.8717 2.92193 12.4897 2.50247C12.1078 2.08301 11.6006 2.08301 10.5859 2.08301H10.4154C9.40073 2.08301 8.89348 2.08301 8.51156 2.50247C8.12963 2.92193 7.96922 3.65528 7.64838 5.122L7.58398 5.41634" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

const ProfileNew: FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  return (
    <div className="flex flex-col gap-6">
      {/* User Header */}
      <UserHeader isOwn={true} />

      {/* Navigation Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-3 p-1 rounded-[36px] border border-[#181B22] bg-[rgba(12,16,20,0.5)] backdrop-blur-[50px]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 rounded-[32px] text-sm font-bold transition-all',
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
      </div>

      {/* Tab content */}
      <div className="mt-4">
        {activeTab === 'dashboard' && (
          <div className="flex flex-col gap-6">
            <div className="container-card p-6">
              <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
              <p className="mt-2 text-sm text-webGray">
                Your dashboard statistics and analytics will be displayed here.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="flex flex-col gap-6">
            <div className="container-card p-6">
              <div className="flex flex-col gap-3">
                <h1 className="text-2xl font-bold text-white">Profile Overview</h1>
                <p className="text-sm text-webGray">
                  Manage your personal information, contact details, and account preferences in one place.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-2xl bg-[#0C101480] border border-[#181B22] p-4">
                    <p className="text-webGray text-xs uppercase tracking-wide">Status</p>
                    <p className="mt-2 text-white text-lg font-semibold">Active</p>
                    <p className="mt-1 text-xs text-webGray">Member since January 2024</p>
                  </div>
                  <div className="rounded-2xl bg-[#0C101480] border border-[#181B22] p-4">
                    <p className="text-webGray text-xs uppercase tracking-wide">Plan</p>
                    <p className="mt-2 text-white text-lg font-semibold">Platinum</p>
                    <p className="mt-1 text-xs text-webGray">Next renewal: 14 Jul 2024</p>
                  </div>
                  <div className="rounded-2xl bg-[#0C101480] border border-[#181B22] p-4">
                    <p className="text-webGray text-xs uppercase tracking-wide">Security</p>
                    <p className="mt-2 text-white text-lg font-semibold">Two-factor enabled</p>
                    <p className="mt-1 text-xs text-webGray">Last login: 2 hours ago</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="container-card p-6">
                <h2 className="text-xl font-semibold text-white">Personal Details</h2>
                <div className="mt-4 flex flex-col gap-4 text-sm text-white/80">
                  <div className="flex flex-col">
                    <span className="text-xs uppercase text-webGray">Full Name</span>
                    <span className="mt-1 font-medium">Devid Stone</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase text-webGray">Email</span>
                    <span className="mt-1 font-medium">devid.stone@example.com</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase text-webGray">Location</span>
                    <span className="mt-1 font-medium">Warsaw, Poland</span>
                  </div>
                </div>
              </div>

              <div className="container-card p-6">
                <h2 className="text-xl font-semibold text-white">Preferences</h2>
                <div className="mt-4 flex flex-col gap-4 text-sm text-white/80">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-xs text-webGray mt-1">Receive weekly summaries and announcements.</p>
                    </div>
                    <span className="rounded-full bg-primary/20 text-primary px-3 py-1 text-xs font-semibold">Enabled</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">AI Recommendations</p>
                      <p className="text-xs text-webGray mt-1">Personalized suggestions for market opportunities.</p>
                    </div>
                    <span className="rounded-full bg-primary/20 text-primary px-3 py-1 text-xs font-semibold">Enabled</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">Two-Factor Auth</p>
                      <p className="text-xs text-webGray mt-1">Secure your account with an extra verification step.</p>
                    </div>
                    <span className="rounded-full bg-green/10 text-green px-3 py-1 text-xs font-semibold">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'marketplace' && (
          <div className="container-card p-6">
            <h2 className="text-2xl font-bold text-white">Marketplace</h2>
            <p className="mt-2 text-sm text-webGray">Browse and purchase trading tools, indicators, and strategies.</p>
          </div>
        )}

        {activeTab === 'streaming' && (
          <div className="container-card p-6">
            <h2 className="text-2xl font-bold text-white">Live Streaming</h2>
            <p className="mt-2 text-sm text-webGray">Watch live trading sessions and market analysis.</p>
          </div>
        )}

        {activeTab === 'social' && (
          <div className="container-card p-6">
            <h2 className="text-2xl font-bold text-white">Social Network</h2>
            <p className="mt-2 text-sm text-webGray">Connect with other traders and share insights.</p>
          </div>
        )}

        {activeTab === 'portfolios' && (
          <div className="container-card p-6">
            <h2 className="text-2xl font-bold text-white">Portfolios</h2>
            <p className="mt-2 text-sm text-webGray">Manage and track your investment portfolios.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileNew;
